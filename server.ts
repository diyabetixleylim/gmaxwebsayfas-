import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const WAITLIST_FILE = path.join(__dirname, "waitlist.json");

// Ensure waitlist file exists
if (!fs.existsSync(WAITLIST_FILE)) {
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify([]));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/waitlist", async (req, res) => {
    const { email } = req.body;
    console.log("Waitlist request received for:", email);

    if (!email) {
      console.error("Email is missing in request body");
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      // 1. Record email to local list
      const waitlist = JSON.parse(fs.readFileSync(WAITLIST_FILE, "utf-8"));
      const isNew = !waitlist.some((entry: any) => entry.email === email);
      if (isNew) {
        waitlist.push({ email, timestamp: new Date().toISOString() });
        fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));
      }

      // Initialize Resend inside the handler to pick up latest env vars
      const currentResendKey = process.env.RESEND_API_KEY;
      
      if (!currentResendKey) {
        console.warn("RESEND_API_KEY is not set. Skipping real email sending.");
        return res.json({ 
          success: true, 
          mode: "demo",
          message: "E-posta listeye kaydedildi (Demo Modu: API anahtarı eksik)." 
        });
      }

      const resendClient = new Resend(currentResendKey);

      // 2. Send notification to info@gmax.tr
      try {
        await resendClient.emails.send({
          from: "GmaX System <info@gmax.tr>", 
          to: "info@gmax.tr",
          subject: "🚀 Yeni Bekleme Listesi Kaydı!",
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #0891b2;">Yeni Kayıt Bildirimi</h2>
              <p>Sisteme yeni bir kullanıcı dahil oldu:</p>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; font-weight: bold; font-size: 18px;">
                ${email}
              </div>
              <p style="color: #666; font-size: 12px; margin-top: 20px;">
                Kayıt Zamanı: ${new Date().toLocaleString('tr-TR')}
              </p>
            </div>
          `,
        });
      } catch (e) {
        console.error("Notification email failed:", e);
      }

      // 3. Send confirmation to the user
      const { data, error } = await resendClient.emails.send({
        from: "GmaX Ekibi <info@gmax.tr>",
        to: email,
        subject: "GmaX Dünyasına Hoş Geldin! 💙",
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
            <div style="background: #0f172a; padding: 40px; text-align: center; border-radius: 20px 20px 0 0;">
              <h1 style="color: #22d3ee; margin: 0; font-size: 32px; font-style: italic; font-weight: 900;">GmaX</h1>
            </div>
            <div style="padding: 40px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 0 0 20px 20px;">
              <p style="font-size: 18px; font-weight: bold;">Merhaba Dostum,</p>
              
              <p>GmaX dünyasına ilk adımı attığın için çok mutluyuz. 💙<br>
              Artık sen de öncelikli erişim listemizin bir parçasısın.</p>

              <p>Şu anda GmaX üzerinde yoğun bir şekilde çalışıyoruz ve çok yakında seni gerçekten fark yaratacak bir deneyimle buluşturacağız.</p>

              <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 25px 0;">
                <p style="margin: 0; font-weight: bold; color: #0369a1;">Bu süreçte seni neler bekliyor?</p>
                <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                  <li>✨ Erken erişim fırsatı</li>
                  <li>✨ Özel güncellemeler ve gelişmeler</li>
                  <li>✨ Sadece listeye özel sürprizler</li>
                </ul>
              </div>

              <p>Aklına takılan herhangi bir şey olursa, istediğin zaman bizimle iletişime geçebilirsin. Merak ettiğin tüm soruları sormaktan çekinme, buradayız. 🤝</p>

              <p>Senin gibi erken katılan kullanıcılar, GmaX’in şekillenmesinde büyük rol oynayacak. Bu yüzden burada olman bizim için gerçekten çok değerli.</p>

              <p style="font-size: 20px; font-weight: bold; color: #0891b2; text-align: center; margin-top: 30px;">Çok yakında tekrar görüşeceğiz.<br>Hazır ol 😉</p>

              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px;">
                <p style="margin: 5px 0;">Sevgilerle,<br><strong>GmaX Ekibi</strong></p>
                <p style="margin: 20px 0 0 0;">
                  <a href="https://www.instagram.com/_g.max/" style="color: #0ea5e9; text-decoration: none;">Instagram'da bizi takip et</a>
                </p>
              </div>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("Resend API Error:", error);
        return res.status(400).json({ error: error.message });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Error in waitlist API:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  // Admin route to view waitlist (for testing)
  app.get("/api/admin/waitlist", (req, res) => {
    const waitlist = JSON.parse(fs.readFileSync(WAITLIST_FILE, "utf-8"));
    res.json(waitlist);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
