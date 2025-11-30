
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Briefcase, Building2, Home, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const isActive = (path: string) => {
        return location.pathname.startsWith(path)
            ? "text-indigo-600 border-b-2 border-indigo-600"
            : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50";
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                I+
                            </div>
                            <span className="font-bold text-xl text-slate-900 tracking-tight">Inclui+</span>
                        </Link>

                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${isActive('/') && location.pathname === '/' ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-600 hover:text-indigo-600"}`}
                            >
                                <Home size={18} className="mr-2" />
                                Início
                            </Link>

                            <Link
                                to="/vagas"
                                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${isActive('/vagas')}`}
                            >
                                <Briefcase size={18} className="mr-2" />
                                Vagas
                            </Link>

                            <Link
                                to="/empresas"
                                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${isActive('/empresas')}`}
                            >
                                <Building2 size={18} className="mr-2" />
                                Empresas
                            </Link>

                            {user?.tipo === 'empresa' && (
                                <Link
                                    to={`/empresa/${user.id}`}
                                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${isActive(`/empresa/${user.id}`)}`}
                                >
                                    <Briefcase size={18} className="mr-2" />
                                    Minha Empresa
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-slate-700">
                                        Olá, <strong>{user.nome}</strong>
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="inline-flex items-center px-3 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Sair
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                                        Entrar
                                    </Link>
                                    <Link
                                        to="/cadastro"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cadastre-se
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Abrir menu principal</span>
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
