// src/server.ts
import 'dotenv/config'; // Carrega as variáveis de ambiente do .env
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'API GigFinder no ar!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});