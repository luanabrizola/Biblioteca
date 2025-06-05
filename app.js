import express from 'express';
import cors from 'cors';
import usuarioRoutes from './backend/routes/usuarioRoutes.js';;

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api', usuarioRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
