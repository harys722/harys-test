export default function handler(request, response) {
  const htmlToEncode = request.query.html;
  if (!htmlToEncode) {
    response.status(400).send('Missing html parameter');
    return;
  }

  try {
    const encodedHtml = Buffer.from(htmlToEncode).toString('base64');
    response.send(encodedHtml);
  } catch (error) {
    response.status(500).send('Error encoding HTML');
  }
}
