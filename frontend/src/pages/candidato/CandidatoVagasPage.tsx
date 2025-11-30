// src/pages/candidato/CandidatoVagasPage.tsx
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { api } from "../../lib/api";
import type { Vaga } from "../../types";

export default function CandidatoVagasPage() {
  const { id } = useParams();
  const candidatoId = Number(id);
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      const data = await api.listarVagasCompativeis(candidatoId);
      setVagas(data);
    } catch (err: any) {
      setErro(err.message ?? "Erro ao carregar vagas compatíveis");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [candidatoId]);

  return (
    <div className="container-page space-y-6 py-8">
      <header>
        <nav className="space-x-4 mb-4">
          <NavLink
            to={`/candidato/${candidatoId}`}
            className="text-blue-600 hover:underline"
          >
            Meus Subtipos e Barreiras
          </NavLink>
          <NavLink
            to={`/candidato/${candidatoId}/vagas`}
            className="font-semibold underline"
          >
            Minhas Vagas
          </NavLink>
        </nav>

        <h1 className="text-2xl font-bold">Vagas Compatíveis</h1>
        <p className="text-gray-600">
          Veja as vagas que atendem às suas necessidades de acessibilidade.
        </p>
      </header>

      {loading ? (
        <div className="card">Carregando...</div>
      ) : erro ? (
        <div className="card text-red-600">{erro}</div>
      ) : vagas.length === 0 ? (
        <div className="card text-gray-500">
          Nenhuma vaga compatível encontrada.
        </div>
      ) : (
        <div className="card space-y-3">
          <h3 className="text-lg font-semibold mb-3">Vagas encontradas</h3>
          <ul className="divide-y">
            {vagas.map((v) => (
              <li key={v.id} className="py-2">
                <p className="font-medium">{v.descricao}</p>
                <p className="text-sm text-gray-500">
                  Empresa: {v.empresa?.nome ?? "—"}
                </p>
                <p className="text-sm text-gray-500">
                  Escolaridade: {v.escolaridade}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
