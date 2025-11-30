import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Vaga, TipoComSubtipos, Acessibilidade } from '../types';
import { Search, Briefcase, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PublicVagasPage() {
    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [filteredVagas, setFilteredVagas] = useState<Vaga[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters Data
    const [tipos, setTipos] = useState<TipoComSubtipos[]>([]);
    const [acessibilidades, setAcessibilidades] = useState<Acessibilidade[]>([]);

    // Active Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTipos, setSelectedTipos] = useState<number[]>([]);
    const [selectedAcessibilidades, setSelectedAcessibilidades] = useState<number[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        Promise.all([
            api.listarTodasVagas(),
            api.listarTiposComSubtipos(),
            api.listarAcessibilidades()
        ]).then(([vagasData, tiposData, acessData]) => {
            setVagas(vagasData);
            setFilteredVagas(vagasData);
            setTipos(tiposData);
            setAcessibilidades(acessData);
        }).catch(err => {
            console.error(err);
            setError("Erro ao carregar vagas.");
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        let result = vagas;

        // Filter by Search Term
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(v =>
                v.descricao.toLowerCase().includes(lower) ||
                v.empresa?.nome.toLowerCase().includes(lower) ||
                v.escolaridade.toLowerCase().includes(lower)
            );
        }

        // Filter by Disability Type (Subtipos)
        if (selectedTipos.length > 0) {
            result = result.filter(v =>
                v.subtipos?.some(s => selectedTipos.includes(s.id))
            );
        }

        // Filter by Accessibility
        if (selectedAcessibilidades.length > 0) {
            result = result.filter(v =>
                v.acessibilidades?.some(a => selectedAcessibilidades.includes(a.id))
            );
        }

        setFilteredVagas(result);
    }, [vagas, searchTerm, selectedTipos, selectedAcessibilidades]);

    const toggleSubtipo = (id: number) => {
        setSelectedTipos(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleAcessibilidade = (id: number) => {
        setSelectedAcessibilidades(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedTipos([]);
        setSelectedAcessibilidades([]);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Search Banner */}
            <div className="bg-indigo-700 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-white text-center mb-8">
                        Encontre a vaga perfeita para você
                    </h1>
                    <div className="max-w-3xl mx-auto relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-4 border-transparent rounded-lg leading-5 bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-slate-400 sm:text-lg shadow-lg"
                            placeholder="Busque por cargo, empresa ou palavra-chave..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Mobile Filter Button */}
                    <button
                        className="lg:hidden flex items-center justify-center w-full py-3 bg-white border border-slate-300 rounded-md shadow-sm text-slate-700 font-medium"
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                    >
                        <Filter size={20} className="mr-2" />
                        Filtros
                    </button>

                    {/* Sidebar Filters */}
                    <aside className={`lg:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-8 sticky top-24">

                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-900">Filtros</h3>
                                {(selectedTipos.length > 0 || selectedAcessibilidades.length > 0) && (
                                    <button onClick={clearFilters} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                                        Limpar
                                    </button>
                                )}
                            </div>

                            {/* Deficiências */}
                            <div>
                                <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wider mb-3">Deficiências</h4>
                                <div className="space-y-3">
                                    {tipos.map(tipo => (
                                        <div key={tipo.id}>
                                            <p className="text-xs font-semibold text-slate-500 mb-2">{tipo.nome}</p>
                                            <div className="space-y-2 pl-2">
                                                {tipo.subtipos.map(sub => (
                                                    <label key={sub.id} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                                                            checked={selectedTipos.includes(sub.id)}
                                                            onChange={() => toggleSubtipo(sub.id)}
                                                        />
                                                        <span className="ml-2 text-sm text-slate-600">{sub.nome}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Acessibilidade */}
                            <div>
                                <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wider mb-3">Acessibilidade</h4>
                                <div className="space-y-2">
                                    {acessibilidades.map(acc => (
                                        <label key={acc.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                                                checked={selectedAcessibilidades.includes(acc.id)}
                                                onChange={() => toggleAcessibilidade(acc.id)}
                                            />
                                            <span className="ml-2 text-sm text-slate-600">{acc.descricao}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-slate-600">
                                Mostrando <strong>{filteredVagas.length}</strong> vagas
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 p-4 rounded-md text-red-600 text-center">
                                {error}
                            </div>
                        ) : filteredVagas.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-lg border border-slate-200 border-dashed">
                                <Briefcase className="mx-auto h-12 w-12 text-slate-400" />
                                <h3 className="mt-2 text-sm font-medium text-slate-900">Nenhuma vaga encontrada</h3>
                                <p className="mt-1 text-sm text-slate-500">Tente ajustar seus filtros ou busca.</p>
                                <button onClick={clearFilters} className="mt-6 btn btn-primary">
                                    Limpar filtros
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {filteredVagas.map(vaga => (
                                    <div key={vaga.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-1">
                                                    {vaga.descricao.length > 50 ? vaga.descricao.substring(0, 50) + '...' : vaga.descricao}
                                                </h3>
                                                <div className="flex items-center text-slate-600 mb-2">
                                                    <Briefcase size={16} className="mr-1" />
                                                    <span className="font-medium mr-4">{vaga.empresa?.nome}</span>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {vaga.subtipos?.slice(0, 3).map(vs => (
                                                        <span key={vs.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {vs.nome}
                                                        </span>
                                                    ))}
                                                    {(vaga.subtipos?.length ?? 0) > 3 && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                            +{(vaga.subtipos?.length ?? 0) - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                                                <span className="text-xs text-slate-500">Publicada recentemente</span>
                                                <Link
                                                    to={`/vagas/${vaga.id}`}
                                                    className="w-full sm:w-auto text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                                >
                                                    Ver Detalhes
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-slate-100">
                                            <p className="text-sm text-slate-600 line-clamp-2">{vaga.descricao}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
