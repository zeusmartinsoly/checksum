// Vercel Serverless API route for CheckSum
export default function handler(req, res) {
  const crypto = require('crypto');

  const { AppSecret, Nonce, CurTime } = req.body;

  if (!AppSecret || !Nonce || !CurTime) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const hash = crypto
    .createHash('sha256')
    .update(AppSecret + Nonce + CurTime)
    .digest('hex');

  return res.status(200).json({ CheckSum: hash });
}
