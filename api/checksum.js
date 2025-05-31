import { createHash } from 'crypto';

export const config = {
  api: {
    bodyParser: true, // Ensure body gets parsed
  }
};

export default async function handler(req, res) {
  try {
    // Parse JSON body manually if needed
    const { AppSecret, Nonce, CurTime } = req.body || {};

    if (!AppSecret || !Nonce || !CurTime) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const hash = createHash('sha256')
      .update(AppSecret + Nonce + CurTime)
      .digest('hex');

    return res.status(200).json({ CheckSum: hash });
  } catch (err) {
    console.error('Error generating checksum:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
