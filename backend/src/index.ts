import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import AddressRoutes from "./routes/AddressRoutes";
import BandRoutes from "./routes/BandRoutes";
import BookingRoutes from "./routes/BookingRoutes";
import EstablishmentRoutes from "./routes/EstablishmentRoutes";
import BandApplicationRoutes from "./routes/BandApplicationRoutes";
import AuthEstablishmentRoutes from "./routes/AuthEstablishmentRoutes";

import sequelize from "./config/database";
import BookingModel from "./models/BookingModel";
import BandModel from "./models/BandModel";
import EstablishmentModel from "./models/EstablishmentModel";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/enderecos", AddressRoutes);
app.use("/bandas", BandRoutes);
app.use("/estabelecimentos", EstablishmentRoutes);
app.use("/agendamentos", BookingRoutes);
app.use("/aplicacoes_banda_evento", BandApplicationRoutes);
app.use("/auth", AuthEstablishmentRoutes);

BookingModel.belongsTo(BandModel, {
  foreignKey: "banda_id",
  as: "banda",
});

BandModel.hasMany(BookingModel, {
  foreignKey: "banda_id",
  as: "agendamentos",
});

BookingModel.belongsTo(EstablishmentModel, {
  foreignKey: "estabelecimento_id",
  as: "estabelecimento",
});

EstablishmentModel.hasMany(BookingModel, {
  foreignKey: "estabelecimento_id",
  as: "agendamentos",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
    // Para criar as tabelas automaticamente
    sequelize.sync();
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
