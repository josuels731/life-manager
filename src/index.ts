import express from 'express';

const PORT = process.env['PORT'] ?? 8080;
const app = express();

app.get('/', (_req, res) => {
  res.send('🎉 Hello TypeScript! 🎉');
});

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default server;