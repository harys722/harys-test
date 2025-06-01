export default function handler(req, res) {
  const html = req.query.html;
  if (!html) {
    res.status(400).json({ error: 'Missing html parameter' });
    return;
  }

  try {
    const decodedHtml = decodeURIComponent(html);
    const base64 = Buffer.from(decodedHtml, 'utf-8').toString('base64');
    res.status(200).json({ encoded: base64 });
  } catch (e) {
    res.status(500).json({ error: 'Encoding failed' });
  }
}
