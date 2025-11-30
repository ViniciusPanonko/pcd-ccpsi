
import type { TipoDeficiencia, TipoComSubtipos, SubtipoDeficiencia, Barreira, Acessibilidade, Vaga, Candidato, Empresa } from "../types";
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let msg = text || res.statusText || "Erro na requisição";
    try {
      const j = JSON.parse(text);
      msg = j.error || msg;
    } catch { }
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export const api = {
  listarTipos() {
    return http<TipoDeficiencia[]>("/tipos");
  },
  criarTipo(nome: string) {
    return http<TipoDeficiencia>("/tipos", {
      method: "POST",
      body: JSON.stringify({ nome }),
    });
  },
  // novos:
  // GET /subtipos → seu backend retorna Tipos com seus subtipos
  listarTiposComSubtipos(): Promise<TipoComSubtipos[]> {
    return http("/tipos/com-subtipos");
  },
  // POST /subtipos { nome, tipoId }
  criarSubtipo(nome: string, tipoId: number): Promise<SubtipoDeficiencia> {
    return http("/subtipos", {
      method: "POST",
      body: JSON.stringify({ nome, tipoId }),
    });
  },
  listarBarreiras(): Promise<Barreira[]> {
    return http("/barreiras");
  },
  listarAcessibilidades(): Promise<Acessibilidade[]> {
    return http("/acessibilidades");
  },
  criarBarreira(descricao: string): Promise<Barreira> {
    return http("/barreiras", {
      method: "POST",
      body: JSON.stringify({ descricao }),
    });
  },
  criarAcessibilidade(descricao: string): Promise<Acessibilidade> {
    return http("/acessibilidades", {
      method: "POST",
      body: JSON.stringify({ descricao }),
    });
  },
  listarSubtipos(): Promise<SubtipoDeficiencia[]> {
    return http("/subtipos");
  },
  vincularBarreirasASubtipo(subtipoId: number, barreiraIds: number[]) {
    return http(`/vinculos/subtipos/${subtipoId}/barreiras`, {
      method: "POST",
      body: JSON.stringify({ barreiraIds }),
    });
  },
  vincularAcessibilidadesABarreira(barreiraId: number, acessibilidadeIds: number[]) {
    return http(`/vinculos/barreiras/${barreiraId}/acessibilidades`, {
      method: "POST",
      body: JSON.stringify({ acessibilidadeIds }),
    });
  },
  async buscarEmpresa(id: number) {
    const res = await fetch(`http://localhost:3000/empresas/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar empresa");
    return res.json();
  },
  async listarEmpresas() {
    return http<Empresa[]>("/empresas");
  },
  async listarVagas(empresaId: number) {
    const res = await fetch(`http://localhost:3000/vagas/empresa/${empresaId}`);
    if (!res.ok) throw new Error("Erro ao listar vagas");
    return res.json();
  },
  async listarTodasVagas() {
    return http<Vaga[]>("/vagas");
  },
  async criarVaga(empresaId: number, descricao: string, escolaridade: string) {
    const res = await fetch("http://localhost:3000/vagas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ empresaId, descricao, escolaridade }),
    });
    if (!res.ok) throw new Error("Erro ao criar vaga");
    return res.json();
  },
  vincularSubtiposAVaga(vagaId: number, subtipoIds: number[]) {
    return http(`/vagas/${vagaId}/subtipos`, {
      method: "POST",
      body: JSON.stringify({ subtipoIds }),
    });
  },
  obterVaga(vagaId: number): Promise<Vaga> {
    return http(`/vagas/${vagaId}`);
  },
  listarAcessibilidadesPossiveis(vagaId: number) {
    return http<Acessibilidade[]>(`/vagas/${vagaId}/acessibilidades-disponiveis`);
  },
  vincularAcessibilidadesAVaga(vagaId: number, acessibilidadeIds: number[]) {
    return http(`/vagas/${vagaId}/acessibilidades`, {
      method: "POST",
      body: JSON.stringify({ acessibilidadeIds }),
    });
  },

  obterVagaComSubtipos(vagaId: number) {
    return http<Vaga>(`/vagas/${vagaId}`);
  },
  // Candidatos
  getCandidato(id: number) {
    return http<Candidato>(`/candidatos/${id}`);
  },
  // Subtipos do candidato
  listarSubtiposCandidato(id: number) {
    return http<SubtipoDeficiencia[]>(`/candidatos/${id}/subtipos`);
  },
  // Barreiras de um subtipo
  listarBarreirasPorSubtipo(subtipoId: number) {
    return http<{ barreiras: Barreira[] }>(`/subtipos/${subtipoId}`);
  },
  vincularSubtiposACandidato(candidatoId: number, subtipoIds: number[]) {
    return http(`/candidatos/${candidatoId}/subtipos`, {
      method: "POST",
      body: JSON.stringify({ subtipoIds }),
    });
  },
  vincularBarreirasACandidato(candidatoId: number, subtipoId: number, barreiraIds: number[]) {
    return http(`/candidatos/${candidatoId}/subtipos/${subtipoId}/barreiras`, {
      method: "POST",
      body: JSON.stringify({ barreiraIds }),
    });
  },
  async listarVagasCompativeis(candidatoId: number): Promise<Vaga[]> {
    return http<Vaga[]>(`/match/${candidatoId}`);
  },
  // Auth / Cadastro
  // Auth / Cadastro
  criarEmpresa(nome: string, cnpj: string, email: string, senha?: string) {
    return http<Empresa>("/empresas", {
      method: "POST",
      body: JSON.stringify({ nome, cnpj, email, senha }),
    });
  },
  criarCandidato(nome: string, email: string, telefone: string, escolaridade: string, senha?: string) {
    return http<Candidato>("/candidatos", {
      method: "POST",
      body: JSON.stringify({ nome, email, telefone, escolaridade, senha }),
    });
  },
  login(email: string, senha?: string, tipo: 'empresa' | 'candidato' | 'admin' = 'empresa') {
    return http<any>(`/login/${tipo}`, {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    });
  },
};