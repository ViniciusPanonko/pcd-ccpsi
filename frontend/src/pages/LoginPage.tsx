import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipo, setTipo] = useState<'empresa' | 'candidato' | 'admin'>('candidato');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const user = await api.login(email, senha, tipo);

            login({
                id: user.id,
                nome: user.nome,
                email: user.email,
                tipo: tipo
            });

            if (tipo === 'empresa') {
                navigate(`/empresa/${user.id}/vagas`);
            } else if (tipo === 'admin') {
                navigate('/admin');
            } else {
                navigate(`/candidato/${user.id}`);
            }
        } catch (err: any) {
            setError(err.message || 'Erro ao realizar login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                        Entre na sua conta
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600">
                        Ou{' '}
                        <Link to="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">
                            crie uma nova conta gratuitamente
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>

                    {/* Tipo de Login Switch */}
                    <div className="flex justify-center space-x-2 mb-4">
                        <button
                            type="button"
                            onClick={() => setTipo('candidato')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${tipo === 'candidato'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                                }`}
                        >
                            Sou Candidato
                        </button>
                        <button
                            type="button"
                            onClick={() => setTipo('empresa')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${tipo === 'empresa'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                                }`}
                        >
                            Sou Empresa
                        </button>
                        <button
                            type="button"
                            onClick={() => setTipo('admin')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${tipo === 'admin'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                                }`}
                        >
                            Administrador
                        </button>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Endereço de email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
