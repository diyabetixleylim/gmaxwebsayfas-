import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const INSTAGRAM_URL = "https://instagram.com/https://www.instagram.com/gmax.tr?igsh=MTFoeXgzMXN6Z29ybA==";

function adminEmailTemplate(email) {
  return `
  <!DOCTYPE html>
  <html lang="tr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Yeni Bekleme Listesi Kaydı</title>
    </head>
    <body style="margin:0;padding:0;background-color:#0b1220;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
        <div style="background:#09111f;border:1px solid #1f2a44;border-radius:24px;padding:36px 28px;color:#ffffff;">
          <div style="text-align:center;margin-bottom:28px;">
            <div style="font-size:36px;line-height:1;font-weight:800;color:#18b8ff;">🚀 Yeni Bekleme Listesi Kaydı!</div>
          </div>

          <div style="background:#0f172a;border-radius:18px;padding:24px;border:1px solid #1e293b;">
            <h2 style="margin:0 0 18px 0;font-size:20px;color:#18b8ff;">Yeni Kayıt Bildirimi</h2>
            <p style="margin:0 0 20px 0;font-size:16px;line-height:1.7;color:#dbeafe;">
              Sisteme yeni bir kullanıcı dahil oldu:
            </p>

            <div style="background:#1f2430;border-radius:16px;padding:20px;margin-bottom:20px;">
              <div style="font-size:18px;font-weight:700;color:#ffffff;word-break:break-word;">
                ${email}
              </div>
            </div>

            <p style="margin:0;font-size:15px;color:#94a3b8;">
              Kayıt Zamanı: ${new Date().toLocaleString("tr-TR")}
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
}

function userEmailTemplate() {
  return `
  <!DOCTYPE html>
  <html lang="tr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>GmaX Kaydınız Alındı</title>
    </head>
    <body style="margin:0;padding:0;background-color:#08101d;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
        <div style="background:#08101d;border:1px solid #1a2740;border-radius:26px;overflow:hidden;">
          
          <div style="background:#081a3a;padding:34px 24px;text-align:center;">
            <div style="font-size:44px;font-weight:800;letter-spacing:0.5px;color:#18b8ff;font-style:italic;">
              GmaX
            </div>
          </div>

          <div style="padding:36px 28px;color:#ffffff;">
            <h2 style="margin:0 0 20px 0;font-size:34px;line-height:1.2;color:#ffffff;">
              Merhaba Dostum,
            </h2>

            <p style="margin:0 0 18px 0;font-size:19px;line-height:1.8;color:#dbeafe;">
              GmaX dünyasına ilk adımı attığın için çok mutluyuz. 💙<br/>
              Artık sen de öncelikli erişim listemizin bir parçasısın.
            </p>

            <p style="margin:0 0 26px 0;font-size:19px;line-height:1.8;color:#dbeafe;">
              Şu anda GmaX üzerinde yoğun bir şekilde çalışıyoruz ve çok yakında seni gerçekten fark yaratacak bir deneyimle buluşturacağız.
            </p>

            <div style="background:linear-gradient(180deg,#0f1f33 0%,#121a24 100%);border-left:5px solid #18b8ff;border-radius:12px;padding:22px 20px;margin:28px 0;">
              <div style="font-size:22px;font-weight:700;color:#bfeaff;margin-bottom:14px;">
                Bu süreçte seni neler bekliyor?
              </div>

              <div style="font-size:18px;line-height:1.9;color:#e5f4ff;">
                ✨ Erken erişim fırsatı<br/>
                ✨ Özel güncellemeler ve gelişmeler<br/>
                ✨ Sadece listeye özel sürprizler
              </div>
            </div>

            <p style="margin:0 0 24px 0;font-size:18px;line-height:1.9;color:#dbeafe;">
              Aklına takılan herhangi bir şey olursa, istediğin zaman bizimle iletişime geçebilirsin. Merak ettiğin tüm soruları sormaktan çekinme, buradayız. 🤝
            </p>

            <p style="margin:0 0 34px 0;font-size:18px;line-height:1.9;color:#dbeafe;">
              Senin gibi erken katılan kullanıcılar, GmaX’in şekillenmesinde büyük rol oynayacak. Bu yüzden burada olman bizim için gerçekten çok değerli.
            </p>

            <div style="text-align:center;margin:44px 0 34px 0;">
              <div style="font-size:34px;line-height:1.5;font-weight:800;color:#18b8ff;">
                Çok yakında tekrar<br/>görüşeceğiz.<br/>Hazır ol 😉
              </div>
            </div>

            <div style="height:1px;background:#334155;margin:28px 0;"></div>

            <div style="text-align:center;font-size:18px;line-height:1.8;color:#cbd5e1;">
              Sevgilerle,<br/>
              <strong>GmaX Ekibi</strong>
            </div>

            <div style="text-align:center;margin-top:28px;">
              <a href="${INSTAGRAM_URL}" style="color:#18b8ff;font-size:18px;font-weight:600;text-decoration:none;">
                Instagram'da bizi takip et
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Bu yönteme izin verilmiyor" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "E-posta gerekli" });
    }

    await resend.emails.send({
      from: "GmaX Sistem <info@gmax.tr>",
      to: "info@gmax.tr",
      subject: "🚀 Yeni Bekleme Listesi Kaydı!",
      html: adminEmailTemplate(email),
    });

    await resend.emails.send({
      from: "GmaX Ekibi <info@gmax.tr>",
      to: email,
      subject: "GmaX öncelikli erişim kaydın alındı",
      html: userEmailTemplate(),
    });

    return res.status(200).json({
      success: true,
      message: "Kayıt başarılı",
    });
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    return res.status(500).json({
      success: false,
      message: "Bir hata oluştu. Lütfen tekrar deneyin.",
    });
  }
}
