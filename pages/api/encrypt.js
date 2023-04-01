const { encryptString } = require("../../encryption/encrypt");

export default async function encrypt(req, res) {
  // If method is not POST, return 404 error with message "Unkn"
  if (req.method !== "POST") {
    res.status(404).json({ error: "Unknown endpoint" });
  }
  // If method is POST, return 200 status code with encrypted text
  else {
    const { text, privateKey } = req.body;
    if (!text || !privateKey) {
      res.status(400).json({ error: "Missing required parameters" });
    } else {
      console.log("text", text);
      const encryptedText = await encryptString(text, privateKey);
      res.status(200).json({ message: encryptedText });
    }
  }
}
