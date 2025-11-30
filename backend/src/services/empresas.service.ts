import { EmpresasRepo } from "../repositories/empresas.repo";

export const EmpresasService = {
  async criarEmpresa(nome: string, cnpj: string, email: string, senha?: string) {
    if (!nome?.trim()) throw new Error("Nome é obrigatório");
    if (!cnpj?.trim()) throw new Error("CNPJ é obrigatório");
    if (!email?.trim()) throw new Error("Email é obrigatório");

    const existeCnpj = await EmpresasRepo.findByCnpj(cnpj);
    if (existeCnpj) throw new Error("CNPJ já cadastrado");

    const existeEmail = await EmpresasRepo.findByEmail(email);
    if (existeEmail) throw new Error("Email já cadastrado");

    return EmpresasRepo.create(nome.trim(), cnpj.trim(), email.trim(), senha);
  },

  async login(email: string, senha?: string) {
    const empresa = await EmpresasRepo.findByEmail(email);
    if (!empresa) throw new Error("Email ou senha inválidos");

    // Em produção, usar bcrypt. Aqui comparamos texto puro por simplicidade.
    if (empresa.senha !== senha) throw new Error("Email ou senha inválidos");

    return empresa;
  },
};
