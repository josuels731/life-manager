import express from 'express';
import path from 'path';

const port = process.env['PORT'] ?? 80;
const server = express();

server.use(express.static("public"));

server.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, './..', '/public/index.html'));
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});