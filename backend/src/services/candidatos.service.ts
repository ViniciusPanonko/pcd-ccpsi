import { CandidatosRepo } from "../repositories/candidatos.repo";

export const CandidatosService = {
  async listar() {
    return CandidatosRepo.findAll();
  },

  async buscarPorId(id: number) {
    const candidato = await CandidatosRepo.findById(id);
    if (!candidato) throw new Error("Candidato não encontrado");
    return candidato;
  },

  async criar(data: { nome: string; email: string; telefone?: string, escolaridade: string, senha?: string }) {
    if (!data.nome?.trim()) throw new Error("O campo 'nome' é obrigatório");
    if (!data.email?.trim()) throw new Error("O campo 'email' é obrigatório");

    const existe = await CandidatosRepo.findByEmail(data.email);
    if (existe) throw new Error("Email já cadastrado");

    return CandidatosRepo.create({
      nome: data.nome.trim(),
      email: data.email.trim(),
      telefone: data.telefone?.trim(),
      escolaridade: data.escolaridade.trim(),
      senha: data.senha
    });
  },

  async login(email: string, senha?: string) {
    const candidato = await CandidatosRepo.findByEmail(email);
    if (!candidato) throw new Error("Email ou senha inválidos");

    if (candidato.senha !== senha) throw new Error("Email ou senha inválidos");

    return candidato;
  },
};