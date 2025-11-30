import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterEmpresaForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        nome: '',
        cnpj: '',
        email: '',
        senha: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const empresa = await api.criarEmpresa(formData.nome, formData.cnpj, formData.email, formData.senha);

            // Auto-login
            login({
                id: empresa.id,
                nome: empresa.nome,
                email: empresa.email,
                tipo: 'empresa'
            });

            // Redirect to company dashboard
            navigate(`/empresa/${empresa.id}/vagas`);
        } catch (err: any) {
            setError(err.message || 'Erro ao criar empresa');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="nome" className="block text-sm font-medium text-slate-700">Nome da Empresa</label>
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
                <label htmlFor="cnpj" className="block text-sm font-medium text-slate-700">CNPJ</label>
                <input
                    type="text"
                    id="cnpj"
                    required
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    value={formData.cnpj}
                    onChange={e => setFormData({ ...formData, cnpj: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Corporativo</label>
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

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
                {loading ? 'Cadastrando...' : 'Cadastrar Empresa'}
            </button>
        </form>
    );
}
