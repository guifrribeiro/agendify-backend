import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRoutes } from "../routes/auth.routes";
import { prisma } from "./prisma";
import { appointmentRoutes } from "../routes/appointment.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados: ", error);
    process.exit(1);
  }
});