import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { Vaga } from '../types';
import { Briefcase, MapPin, Building2, GraduationCap, ArrowLeft, CheckCircle } from 'lucide-react';

export default function PublicVagaDetalhePage() {
    const { id } = useParams<{ id: string }>();
    const [vaga, setVaga] = useState<Vaga | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            api.obterVaga(Number(id))
                .then(data => setVaga(data))
                .catch(err => {
                    console.error(err);
                    setError("Erro ao carregar detalhes da vaga.");
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-900"></div>
            </div>
        );
    }

    if (error || !vaga) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
                <div className="text-red-600 text-lg mb-4">{error || "Vaga não encontrada"}</div>
                <Link to="/vagas" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    <ArrowLeft size={20} className="mr-2" /> Voltar para Vagas
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/vagas" className="inline-flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Voltar para lista
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-indigo-900 p-8 text-white">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{vaga.descricao}</h1>
                                <div className="flex items-center text-indigo-200">
                                    <Building2 size={20} className="mr-2" />
                                    <span className="text-lg">{vaga.empresa?.nome}</span>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                                <span className="text-sm font-medium">Vaga Inclusiva</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Info Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start p-4 bg-slate-50 rounded-lg">
                                <GraduationCap className="text-indigo-600 mt-1 mr-3" size={24} />
                                <div>
                                    <h3 className="font-semibold text-slate-900">Escolaridade</h3>
                                    <p className="text-slate-600">{vaga.escolaridade}</p>
                                </div>
                            </div>
                            <div className="flex items-start p-4 bg-slate-50 rounded-lg">
                                <MapPin className="text-indigo-600 mt-1 mr-3" size={24} />
                                <div>
                                    <h3 className="font-semibold text-slate-900">Localização</h3>
                                    <p className="text-slate-600">Brasil (Remoto ou Presencial)</p>
                                </div>
                            </div>
                        </div>

                        {/* Accessibility & Subtypes */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Deficiências Atendidas</h3>
                                <div className="flex flex-wrap gap-3">
                                    {vaga.subtipos?.map(sub => (
                                        <span key={sub.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                            {sub.nome}
                                        </span>
                                    ))}
                                    {(!vaga.subtipos || vaga.subtipos.length === 0) && (
                                        <p className="text-slate-500 italic">Nenhuma especificada.</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Recursos de Acessibilidade</h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {vaga.acessibilidades?.map(acc => (
                                        <div key={acc.id} className="flex items-center text-slate-700">
                                            <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" />
                                            <span>{acc.descricao}</span>
                                        </div>
                                    ))}
                                    {(!vaga.acessibilidades || vaga.acessibilidades.length === 0) && (
                                        <p className="text-slate-500 italic">Nenhum recurso específico listado.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="pt-8 border-t border-slate-100 flex justify-end">
                            <button
                                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                                onClick={() => alert("Funcionalidade de candidatura em breve!")}
                            >
                                Candidatar-se a esta vaga
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
