import { prisma } from "./prisma";

export const CandidatosRepo = {
  findAll() {
    return prisma.candidato.findMany({
      orderBy: { id: "asc" },
      include: { subtipos: { include: { subtipo: true } } },
    });
  },

  findById(id: number) {
    return prisma.candidato.findUnique({
      where: { id },
      include: {
        subtipos: {
          include: {
            subtipo: true,
            barreiras: { include: { barreira: true } },
          },
        },
      },
    });
  },

  findByEmail(email: string) {
    return prisma.candidato.findUnique({ where: { email } });
  },

  create(data: { nome: string; email: string; telefone?: string; escolaridade: string; senha?: string }) {
    return prisma.candidato.create({ data });
  },
};