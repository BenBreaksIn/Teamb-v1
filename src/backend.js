const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/proxy/:streamer', async (req, res) => {
  const { streamer } = req.params;
  const targetUrl = `https://kick.com/${streamer}`;

  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default(targetUrl);
    const html = await response.text();
    res.send(html);
  } catch (error) {
    console.log(`Error fetching data for ${streamer}: ${error}`);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
