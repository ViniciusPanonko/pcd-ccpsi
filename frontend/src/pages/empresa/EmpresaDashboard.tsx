import { Link, useParams } from "react-router-dom";
import { Briefcase, Users, PlusCircle, TrendingUp } from "lucide-react";

export default function EmpresaDashboard() {
    const { id } = useParams();

    // Mock data for dashboard - in real app would come from API
    const stats = [
        { label: "Vagas Ativas", value: "12", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-100" },
        { label: "Candidatos", value: "48", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
        { label: "Visualizações", value: "1.2k", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Visão Geral</h2>
                <p className="text-slate-600">Bem-vindo ao seu painel de controle.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center">
                        <div className={`p-4 rounded-lg ${stat.bg} mr-4`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Ações Rápidas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                        to={`/empresa/${id}/vagas`}
                        className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                        <PlusCircle className="h-5 w-5 text-indigo-600 mr-3 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-slate-700">Nova Vaga</span>
                    </Link>
                    <Link
                        to={`/empresa/${id}/vagas`}
                        className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                        <Briefcase className="h-5 w-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-slate-700">Gerenciar Vagas</span>
                    </Link>
                    {/* Placeholder for future features */}
                    <div className="flex items-center p-4 border border-slate-200 rounded-lg opacity-50 cursor-not-allowed">
                        <Users className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="font-medium text-gray-400">Buscar Talentos (Em breve)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
