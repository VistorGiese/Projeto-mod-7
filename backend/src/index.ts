import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import UserRoutes from "./routes/UserRoutes";
import AddressRoutes from "./routes/AddressRoutes";
import BandAvailabilityRoutes from "./routes/BandAvailabilityRoutes";
import BandMemberRoutes from "./routes/BandMemberRoutes";
import BandRoutes from "./routes/BandRoutes";
import EstablishmentBlockRoutes from "./routes/EstablishmentBlockRoutes";
import BookingRoutes from "./routes/BookingRoutes";
import CommentRoutes from "./routes/CommentRoutes";
import ContractRoutes from "./routes/ContractRoutes";
import EstablishmentRoutes from "./routes/EstablishmentRoutes";
import EstablishmentScheduleRoutes from "./routes/EstablishmentScheduleRoutes";
import FavoriteRoutes from "./routes/FavoriteRoutes";
import GenreRoutes from "./routes/GenreRoutes";
import InstrumentRoutes from "./routes/InstrumentRoutes";
import PaymentRoutes from "./routes/PaymentRoutes";
import RatingRoutes from "./routes/RatingRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/enderecos", AddressRoutes);
app.use("/bandas_disponibilidade", BandAvailabilityRoutes);
app.use("/membros_banda", BandMemberRoutes);
app.use("/bandas", BandRoutes);
app.use("/estabelecimentos_bloqueio", EstablishmentBlockRoutes);
app.use("/estabelecimentos", EstablishmentRoutes);
app.use("/estabelecimentos/horarios", EstablishmentScheduleRoutes);
app.use("/agendamentos", BookingRoutes);
app.use("/comentarios", CommentRoutes);
app.use("/contratos", ContractRoutes);
app.use("/favoritos", FavoriteRoutes);
app.use("/generos", GenreRoutes);
app.use("/instrumentos", InstrumentRoutes);
app.use("/pagamentos", PaymentRoutes);
app.use("/avaliacoes", RatingRoutes);
app.use("/usuarios", UserRoutes);

// Simulating database connection
import sequelize from "./config/database"; 

sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

// Rota básica
app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
