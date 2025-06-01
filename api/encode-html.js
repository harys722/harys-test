export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { html } = req.body;

  if (!html) {
    res.status(400).json({ error: 'Missing html in request body' });
    return;
  }

  try {
    const buffer = Buffer.from(html, 'utf-8');
    const base64 = buffer.toString('base64');

    res.status(200).json({ encoded: base64 });
  } catch (error) {
    res.status(500).json({ error: 'Encoding failed', details: error.message });
  }
}
