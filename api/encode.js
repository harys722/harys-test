const express = require('express');
const app = express();
const port = 3000; 

app.get('/encode', (req, res) => {
  const htmlToEncode = req.query.html;
  if (!htmlToEncode) {
    return res.status(400).send('Missing html parameter');
  }

  try {
    const encodedHtml = Buffer.from(htmlToEncode).toString('base64');
    res.send(encodedHtml);
  } catch (error) {
    res.status(500).send('Error encoding HTML');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
