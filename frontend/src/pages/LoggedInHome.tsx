import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import type { Vaga } from '../types';
import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle, ArrowRight } from 'lucide-react';

export default function LoggedInHome() {
    const { user } = useAuth();
    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadVagas() {
            if (user?.tipo === 'candidato') {
                try {
                    const data = await api.listarVagasCompativeis(user.id);
                    // Get only the newest 3
                    setVagas(data.slice(0, 3));
                } catch (error) {
                    console.error("Erro ao carregar vagas compatíveis", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }
        loadVagas();
    }, [user]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Welcome Banner */}
            <div className="bg-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">
                        Olá, {user?.nome}! 👋
                    </h1>
                    <p className="text-indigo-200 text-lg max-w-3xl">
                        Bem-vindo de volta ao <strong>Inclui+</strong>. Estamos felizes em tê-lo conosco na construção de um mercado de trabalho mais inclusivo e acessível para todos.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

                {/* Project Presentation */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Sobre o Projeto</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4 text-slate-600">
                            <p>
                                O <strong>Inclui+</strong> é mais do que uma plataforma de vagas. É um ecossistema dedicado a conectar talentos únicos a empresas que verdadeiramente valorizam a diversidade.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Vagas com match inteligente de acessibilidade.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Empresas comprometidas com a inclusão.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Foco total na experiência do usuário.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-indigo-50 rounded-xl p-6 flex items-center justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Equipe diversa"
                                className="rounded-lg shadow-md object-cover h-64 w-full"
                            />
                        </div>
                    </div>
                </section>

                {/* Compatible Vacancies (Only for Candidates) */}
                {user?.tipo === 'candidato' && (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Vagas Recomendadas para Você</h2>
                            <Link to="/vagas" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                                Ver todas <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>

                        {loading ? (
                            <div className="text-center py-12">Carregando recomendações...</div>
                        ) : vagas.length > 0 ? (
                            <div className="grid md:grid-cols-3 gap-6">
                                {vagas.map(vaga => (
                                    <div key={vaga.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                                                <Briefcase size={24} />
                                            </div>
                                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                Compatível
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">{vaga.descricao}</h3>
                                        <p className="text-slate-500 text-sm mb-4">{vaga.empresa?.nome}</p>

                                        <div className="mt-auto pt-4 border-t border-slate-100">
                                            <Link
                                                to={`/vagas/${vaga.id}`}
                                                className="block w-full text-center py-2 px-4 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
                                            >
                                                Ver Detalhes
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl p-8 text-center border border-slate-200 border-dashed">
                                <p className="text-slate-500">Ainda não encontramos vagas perfeitas para o seu perfil, mas não desanime!</p>
                                <Link to="/vagas" className="text-indigo-600 font-medium mt-2 inline-block">
                                    Navegar por todas as vagas
                                </Link>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}
