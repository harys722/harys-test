export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { html } = req.body;
  if (!html) {
    res.status(400).send('Missing html in request body');
    return;
  }

  try {
    const encodedHtml = Buffer.from(html).toString('base64');
    res.send(encodedHtml);
  } catch (error) {
    res.status(500).send('Error encoding HTML');
  }
}
