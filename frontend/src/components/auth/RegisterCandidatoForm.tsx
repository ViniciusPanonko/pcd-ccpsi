import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import type { TipoComSubtipos } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterCandidatoForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        escolaridade: 'Ensino Médio Completo',
        senha: ''
    });
    const [tipos, setTipos] = useState<TipoComSubtipos[]>([]);
    const [selectedSubtipos, setSelectedSubtipos] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.listarTiposComSubtipos()
            .then(setTipos)
            .catch(console.error);
    }, []);

    const toggleSubtipo = (id: number) => {
        setSelectedSubtipos(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Criar candidato
            const candidato = await api.criarCandidato(
                formData.nome,
                formData.email,
                formData.telefone,
                formData.escolaridade,
                formData.senha
            );

            // 2. Vincular subtipos se houver seleção
            if (selectedSubtipos.length > 0) {
                await api.vincularSubtiposACandidato(candidato.id, selectedSubtipos);
            }

            // Auto-login
            login({
                id: candidato.id,
                nome: candidato.nome,
                email: candidato.email,
                tipo: 'candidato'
            });

            // Redirect to candidate dashboard
            navigate(`/candidato/${candidato.id}`);
        } catch (err: any) {
            setError(err.message || 'Erro ao criar candidato');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-slate-700">Nome Completo</label>
                    <input
                        type="text"
                        id="nome"
                        required
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        value={formData.nome}
                        onChange={e => setFormData({ ...formData, nome: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="senha" className="block text-sm font-medium text-slate-700">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        required
                        minLength={6}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        value={formData.senha}
                        onChange={e => setFormData({ ...formData, senha: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-slate-700">Telefone</label>
                    <input
                        type="tel"
                        id="telefone"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        value={formData.telefone}
                        onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="escolaridade" className="block text-sm font-medium text-slate-700">Escolaridade</label>
                    <select
                        id="escolaridade"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        value={formData.escolaridade}
                        onChange={e => setFormData({ ...formData, escolaridade: e.target.value })}
                    >
                        <option>Fundamental Incompleto</option>
                        <option>Fundamental Completo</option>
                        <option>Ensino Médio Incompleto</option>
                        <option>Ensino Médio Completo</option>
                        <option>Superior Incompleto</option>
                        <option>Superior Completo</option>
                        <option>Pós-graduação</option>
                    </select>
                </div>
            </div>

            <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-slate-900 mb-3">Sua Deficiência</h3>
                <p className="text-sm text-slate-500 mb-4">Selecione todas que se aplicam.</p>

                <div className="space-y-4 max-h-60 overflow-y-auto p-2 border rounded-md bg-slate-50">
                    {tipos.map(tipo => (
                        <div key={tipo.id}>
                            <h4 className="font-semibold text-sm text-slate-700 mb-2">{tipo.nome}</h4>
                            <div className="space-y-2 pl-2">
                                {tipo.subtipos.map(sub => (
                                    <label key={sub.id} className="flex items-center space-x-2 cursor-pointer hover:bg-slate-100 p-1 rounded">
                                        <input
                                            type="checkbox"
                                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                            checked={selectedSubtipos.includes(sub.id)}
                                            onChange={() => toggleSubtipo(sub.id)}
                                        />
                                        <span className="text-sm text-slate-600">{sub.nome}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
                {loading ? 'Cadastrando...' : 'Cadastrar Candidato'}
            </button>
        </form>
    );
}
