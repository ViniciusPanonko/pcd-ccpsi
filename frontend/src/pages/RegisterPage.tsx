import { useState } from 'react';
import { Building2, User } from 'lucide-react';
import RegisterEmpresaForm from '../components/auth/RegisterEmpresaForm';
import RegisterCandidatoForm from '../components/auth/RegisterCandidatoForm';

export default function RegisterPage() {
    const [profileType, setProfileType] = useState<'empresa' | 'candidato' | null>(null);

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                        Crie sua conta
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600">
                        Junte-se ao Inclui+ e faça parte da mudança.
                    </p>
                </div>

                {!profileType ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <button
                            onClick={() => setProfileType('empresa')}
                            className="relative rounded-lg border border-slate-300 bg-white px-6 py-5 shadow-sm flex flex-col items-center space-y-3 hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                        >
                            <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-full">
                                <Building2 className="h-8 w-8 text-indigo-600" />
                            </div>
                            <div className="text-center">
                                <span className="block text-sm font-medium text-slate-900">Sou uma Empresa</span>
                                <span className="block text-xs text-slate-500 mt-1">Quero divulgar vagas inclusivas</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setProfileType('candidato')}
                            className="relative rounded-lg border border-slate-300 bg-white px-6 py-5 shadow-sm flex flex-col items-center space-y-3 hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                        >
                            <div className="flex-shrink-0 p-3 bg-green-50 rounded-full">
                                <User className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="text-center">
                                <span className="block text-sm font-medium text-slate-900">Sou um Candidato</span>
                                <span className="block text-xs text-slate-500 mt-1">Busco oportunidades acessíveis</span>
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 relative">
                        <button
                            onClick={() => setProfileType(null)}
                            className="absolute top-4 right-4 text-sm text-slate-400 hover:text-slate-600"
                        >
                            Voltar
                        </button>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium leading-6 text-slate-900 border-b pb-2">
                                Cadastro de {profileType === 'empresa' ? 'Empresa' : 'Candidato'}
                            </h3>
                        </div>

                        {profileType === 'empresa' ? <RegisterEmpresaForm /> : <RegisterCandidatoForm />}
                    </div>
                )}
            </div>
        </div>
    );
}
