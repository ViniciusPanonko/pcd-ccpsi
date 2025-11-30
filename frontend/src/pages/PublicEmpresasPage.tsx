import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Empresa } from '../types';
import { Building2, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PublicEmpresasPage() {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [filteredEmpresas, setFilteredEmpresas] = useState<Empresa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        api.listarEmpresas()
            .then(data => {
                setEmpresas(data);
                setFilteredEmpresas(data);
            })
            .catch(err => {
                console.error(err);
                setError("Erro ao carregar empresas.");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            setFilteredEmpresas(empresas.filter(e =>
                e.nome.toLowerCase().includes(lower)
            ));
        } else {
            setFilteredEmpresas(empresas);
        }
    }, [searchTerm, empresas]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Search Banner */}
            <div className="bg-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl font-extrabold text-white mb-4">
                        Empresas Parceiras
                    </h1>
                    <p className="text-indigo-200 text-lg mb-8 max-w-2xl mx-auto">
                        Conheça as empresas que estão comprometidas com a inclusão e diversidade no mercado de trabalho.
                    </p>

                    <div className="max-w-2xl mx-auto relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-4 border-transparent rounded-lg leading-5 bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-slate-400 sm:text-lg shadow-lg"
                            placeholder="Buscar empresa por nome..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-900"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 p-4 rounded-md text-red-600 text-center">
                        {error}
                    </div>
                ) : filteredEmpresas.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg border border-slate-200 border-dashed">
                        <Building2 className="mx-auto h-12 w-12 text-slate-400" />
                        <h3 className="mt-2 text-sm font-medium text-slate-900">Nenhuma empresa encontrada</h3>
                        <p className="mt-1 text-sm text-slate-500">Tente buscar com outro termo.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEmpresas.map(empresa => (
                            <div key={empresa.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-lg transform group-hover:scale-110 transition-transform">
                                        <Building2 size={32} />
                                    </div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{empresa.nome}</h3>
                                    <div className="flex items-center justify-center text-slate-500 text-sm mb-6">
                                        <MapPin size={16} className="mr-1" />
                                        <span>Brasil</span>
                                    </div>

                                    <Link
                                        to="/vagas" // In future could filter vagas by this company
                                        className="block w-full py-2 px-4 border border-indigo-600 text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition-colors"
                                    >
                                        Ver Vagas
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
