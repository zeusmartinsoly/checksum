import { createHash } from 'crypto';

export default function handler(req, res) {
  try {
    const { AppSecret, Nonce, CurTime } = req.body;

    if (!AppSecret || !Nonce || !CurTime) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const hash = createHash('sha256')
      .update(AppSecret + Nonce + CurTime)
      .digest('hex');

    return res.status(200).json({ CheckSum: hash });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
