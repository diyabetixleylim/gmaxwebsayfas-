import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email gerekli" });
    }

    // 1️⃣ Sana mail
    await resend.emails.send({
      from: "Gmax <info@gmax.tr>",
      to: "info@gmax.tr",
      subject: "Yeni kayıt",
      html: `<p>Yeni kullanıcı: ${email}</p>`,
    });

    // 2️⃣ Kullanıcıya mail
    await resend.emails.send({
      from: "Gmax <info@gmax.tr>",
      to: email,
      subject: "Kaydınız alındı",
      html: `
        <h2>Merhaba</h2>
        <p>Gmax bekleme listesine kaydınız alındı.</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
