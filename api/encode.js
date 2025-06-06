export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { content } = req.body;
  if (!content) {
    res.status(400).send('Missing "content" in request body');
    return;
  }

  try {
    const encodedContent = Buffer.from(content).toString('base64');
    res.send({ encodedContent: encodedContent });
  } catch (error) {
    res.status(500).send('Error encoding content');
  }
}
