const express = require('express');
const fs = require('fs').promises;  
const app = express();

app.use(express.json());

app.get('/files', async (req, res) => {
  try {
    const files = await fs.readdir('./files');
    res.status(200).json({ files });
  } 
  catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/file/:filename', async (req, res) => {
  const { filename } = req.params;
  const filePath = `./files/${filename}`;

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    res.status(200).send(fileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).send('File not found');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
