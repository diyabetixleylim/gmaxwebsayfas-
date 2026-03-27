export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email gerekli" });
    }

    console.log("Email geldi:", email);

    return res.status(200).json({
      success: true,
      message: "Başarılı"
    });
  } catch (err) {
    return res.status(500).json({
      success: false
    });
  }
}
