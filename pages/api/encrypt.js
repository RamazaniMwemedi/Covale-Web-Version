const { encryptString } = require("../../encryption/encrypt");

export default async function encrypt(req, res) {
  // If method is not POST, return 404 error with message "Unkn"
  if (req.method !== "POST") {
    res.status(404).json({ error: "Unknown endpoint" });
  }
  // If method is POST, return 200 status code with encrypted text
  else {
    const { text, publicKey } = req.body;
    if (!text || !publicKey) {
      res.status(400).json({ error: "Missing required parameters" });
    } else {
      const encryptedText = await encryptString(text, publicKey);
      res.status(200).json({ encryptedText });
    }
  }
}
