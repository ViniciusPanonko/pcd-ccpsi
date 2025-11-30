import { Link } from 'react-router-dom';
import { Users, Building, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoggedInHome from './LoggedInHome';

export default function LandingPage() {
    const { user } = useAuth();

    if (user) {
        return <LoggedInHome />;
    }

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <svg
                            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                            fill="currentColor"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>

                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Oportunidades reais para</span>{' '}
                                    <span className="block text-indigo-600 xl:inline">talentos únicos</span>
                                </h1>
                                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    O Inclui+ conecta pessoas com deficiência a empresas que valorizam a diversidade. Encontre vagas compatíveis com suas necessidades de acessibilidade.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link
                                            to="/cadastro"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                                        >
                                            Começar agora
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link
                                            to="/vagas"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                                        >
                                            Ver vagas
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-indigo-50">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Pessoas trabalhando em escritório inclusivo"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Diferenciais</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Por que usar o Inclui+?
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
                            Nossa plataforma foi desenhada pensando em acessibilidade desde o primeiro dia.
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Match de Acessibilidade</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-slate-500">
                                    Cruzamos suas necessidades específicas com as adaptações que a empresa oferece.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        <Users className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Comunidade Ativa</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-slate-500">
                                    Conecte-se com outros profissionais e compartilhe experiências.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        <Building className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Empresas Verificadas</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-slate-500">
                                    Todas as empresas passam por uma verificação de compromisso com a inclusão.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>
        </div>
    );
}
