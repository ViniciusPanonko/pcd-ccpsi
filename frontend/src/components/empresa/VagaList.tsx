import { Link, useParams } from "react-router-dom";
import type { Vaga } from "../../types";
import { Briefcase, Edit, Trash2 } from "lucide-react";

type Props = {
  vagas: Vaga[];
};

export default function VagaList({ vagas }: Props) {
  const { id: empresaId } = useParams();

  if (!vagas?.length) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
        <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
        <h3 className="mt-2 text-sm font-medium text-slate-900">Nenhuma vaga cadastrada</h3>
        <p className="mt-1 text-sm text-slate-500">Comece criando sua primeira vaga acima.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {vagas.map((v) => (
        <div key={v.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{v.descricao}</h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
              <span className="flex items-center">
                <Briefcase size={14} className="mr-1" />
                {v.escolaridade}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                Ativa
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              to={`/empresa/${empresaId}/vagas/${v.id}`}
              className="flex-1 sm:flex-none text-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors flex items-center justify-center"
            >
              <Edit size={16} className="mr-2" />
              Editar
            </Link>
            {/* Placeholder for delete action */}
            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
