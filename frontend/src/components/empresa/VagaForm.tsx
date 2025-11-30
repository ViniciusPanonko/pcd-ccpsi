import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { TipoComSubtipos, Acessibilidade } from "../../types";
import { Briefcase, Check, AlertCircle } from "lucide-react";

type Props = {
  empresaId: number;
  onCreated: () => void;
};

export default function VagaForm({ empresaId, onCreated }: Props) {
  const [descricao, setDescricao] = useState("");
  const [escolaridade, setEscolaridade] = useState("");

  // Data from API
  const [tipos, setTipos] = useState<TipoComSubtipos[]>([]);
  const [acessibilidades, setAcessibilidades] = useState<Acessibilidade[]>([]);

  // Selections
  const [selectedSubtipos, setSelectedSubtipos] = useState<number[]>([]);
  const [selectedAcessibilidades, setSelectedAcessibilidades] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch initial data
    Promise.all([
      api.listarTiposComSubtipos(),
      api.listarAcessibilidades()
    ]).then(([tiposData, acessibilidadesData]) => {
      setTipos(tiposData);
      setAcessibilidades(acessibilidadesData);
    }).catch(err => {
      console.error("Erro ao carregar dados:", err);
      setErro("Erro ao carregar opções de deficiência e acessibilidade.");
    });
  }, []);

  const toggleSubtipo = (id: number) => {
    setSelectedSubtipos(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAcessibilidade = (id: number) => {
    setSelectedAcessibilidades(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSuccess(false);

    if (!descricao.trim() || !escolaridade.trim()) {
      setErro("Por favor, preencha a descrição e a escolaridade.");
      return;
    }

    setLoading(true);
    try {
      // 1. Create Vaga
      const vaga = await api.criarVaga(empresaId, descricao, escolaridade);

      // 2. Link Subtipos (Deficiencies)
      if (selectedSubtipos.length > 0) {
        await api.vincularSubtiposAVaga(vaga.id, selectedSubtipos);
      }

      // 3. Link Acessibilidades
      if (selectedAcessibilidades.length > 0) {
        await api.vincularAcessibilidadesAVaga(vaga.id, selectedAcessibilidades);
      }

      // Reset form
      setDescricao("");
      setEscolaridade("");
      setSelectedSubtipos([]);
      setSelectedAcessibilidades([]);
      setSuccess(true);

      // Notify parent
      onCreated();

      // Clear success message after 3s
      setTimeout(() => setSuccess(false), 3000);

    } catch (err: any) {
      setErro(err.message ?? "Erro ao criar vaga");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <Briefcase size={24} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Nova Vaga</h2>
          <p className="text-sm text-slate-500">Preencha os dados para divulgar uma nova oportunidade.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wider">Informações Básicas</h3>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Escolaridade Mínima</label>
              <select
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                value={escolaridade}
                onChange={(e) => setEscolaridade(e.target.value)}
                disabled={loading}
              >
                <option value="">Selecione a escolaridade...</option>
                <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</option>
                <option value="Ensino Fundamental Completo">Ensino Fundamental Completo</option>
                <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                <option value="Ensino Superior Incompleto">Ensino Superior Incompleto</option>
                <option value="Ensino Superior Completo">Ensino Superior Completo</option>
                <option value="Pós-graduação">Pós-graduação</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Descrição da Vaga</label>
              <textarea
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border min-h-[120px]"
                placeholder="Descreva as responsabilidades, requisitos e benefícios da vaga..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Disabilities (Subtipos) */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wider">Público Alvo (Deficiências)</h3>
          <p className="text-sm text-slate-500">Selecione quais tipos de deficiência esta vaga está apta a receber.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tipos.map(tipo => (
              <div key={tipo.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  {tipo.nome}
                </h4>
                <div className="space-y-2">
                  {tipo.subtipos.map(sub => (
                    <label key={sub.id} className="flex items-start space-x-3 cursor-pointer hover:bg-slate-100 p-1.5 rounded transition-colors">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedSubtipos.includes(sub.id)}
                        onChange={() => toggleSubtipo(sub.id)}
                      />
                      <span className="text-sm text-slate-600 leading-tight">{sub.nome}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accessibilities */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wider">Acessibilidade Oferecida</h3>
          <p className="text-sm text-slate-500">Quais recursos de acessibilidade o local de trabalho ou a vaga oferecem?</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {acessibilidades.map(acc => (
              <label key={acc.id} className={`
                relative flex items-center p-3 rounded-lg border cursor-pointer transition-all
                ${selectedAcessibilidades.includes(acc.id)
                  ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-500'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'}
              `}>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mr-3"
                  checked={selectedAcessibilidades.includes(acc.id)}
                  onChange={() => toggleAcessibilidade(acc.id)}
                />
                <span className={`text-sm ${selectedAcessibilidades.includes(acc.id) ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>
                  {acc.descricao}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Feedback & Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            {erro && (
              <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-md">
                <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                {erro}
              </div>
            )}
            {success && (
              <div className="flex items-center text-green-600 text-sm bg-green-50 p-3 rounded-md">
                <Check size={18} className="mr-2 flex-shrink-0" />
                Vaga criada com sucesso!
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto flex justify-center items-center py-2.5 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </>
            ) : (
              'Publicar Vaga'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
