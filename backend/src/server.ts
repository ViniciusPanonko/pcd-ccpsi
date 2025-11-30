// src/server.ts
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

// importa suas rotas
import tiposRoutes from "./routes/tipos.routes";
import subtiposRoutes from "./routes/subtipos.routes";
import barreirasRoutes from "./routes/barreiras.routes";
import acessibilidadesRoutes from "./routes/acessibilidades.routes";
import vinculosRoutes from "./routes/vinculos.routes"
import empresasRoutes from "./routes/empresas.routes";
import vagasRoutes from "./routes/vagas.routes";
import candidatoRoutes from "./routes/candidatos.routes";
import { matchRoutes } from "./routes/match.routes";
import { EmpresasController } from "./controllers/empresas.controller";
import { CandidatosController } from "./controllers/candidatos.controller";

const app = express();
const prisma = new PrismaClient();
app.use(cors({ origin: true })); // antes das rotas
app.use(express.json());

// usa os módulos de rotas
app.use("/tipos", tiposRoutes);
app.use("/subtipos", subtiposRoutes);
app.use("/vinculos", vinculosRoutes)
app.use("/barreiras", barreirasRoutes);
app.use("/acessibilidades", acessibilidadesRoutes);

app.use("/empresas", empresasRoutes);
app.use("/vagas", vagasRoutes);

app.use("/candidatos", candidatoRoutes);

// nova rota de match
app.use("/match", matchRoutes);

// Rotas de login
app.post("/login/empresa", EmpresasController.login);
app.post("/login/candidato", CandidatosController.login);
app.post("/login/admin", (req, res) => {
  const { email, senha } = req.body;
  if (email === "admin@inclui.com" && senha === "admin123") {
    return res.json({
      id: 1,
      nome: "Administrador",
      email: "admin@inclui.com",
      tipo: "admin"
    });
  }
  res.status(401).json({ error: "Credenciais inválidas" });
});

// middleware de erro genérico
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Erro interno" });
});

// sobe o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});