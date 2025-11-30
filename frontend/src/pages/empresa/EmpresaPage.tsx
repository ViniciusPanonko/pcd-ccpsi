import { useEffect, useState } from "react";
import { useParams, NavLink, Outlet, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import type { Empresa } from "../../types";
import { LayoutDashboard, Briefcase, Settings, LogOut, Building2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function EmpresaPage() {
  const { id } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      setErro(null);
      try {
        if (!id) return;
        const data = await api.buscarEmpresa(Number(id));
        setEmpresa(data);
      } catch (err: any) {
        setErro("Erro ao carregar dados da empresa");
      }
    }
    carregar();
  }, [id]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (erro) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{erro}</div>;
  }

  if (!empresa) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 truncate w-32" title={empresa.nome}>{empresa.nome}</h2>
            <p className="text-xs text-slate-500">Área da Empresa</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to={`/empresa/${empresa.id}`}
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <LayoutDashboard size={20} className="mr-3" />
            Dashboard
          </NavLink>

          <NavLink
            to={`/empresa/${empresa.id}/vagas`}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <Briefcase size={20} className="mr-3" />
            Vagas
          </NavLink>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button className="flex w-full items-center px-4 py-3 text-sm font-medium text-slate-400 cursor-not-allowed">
              <Settings size={20} className="mr-3" />
              Configurações
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}