import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import AdminPage from "./pages/AdminPage";
import TiposPage from "./pages/TiposPage";
import SubtiposPage from "./pages/SubtiposPage";
import BarreirasPage from "./pages/BarreirasPage";
import AcessibilidadesPage from "./pages/AcessibilidadesPage";

import EmpresaPage from "./pages/empresa/EmpresaPage";
import VagaPage from "./pages/empresa/VagaPage";
import VagaDetalhePage from "./pages/empresa/VagaDetalhePage";
import CandidatoPage from "./pages/candidato/CandidatoPage";
import CandidatoVagasPage from "./pages/candidato/CandidatoVagasPage";
import EmpresaDashboard from "./pages/empresa/EmpresaDashboard";
import PublicVagasPage from "./pages/PublicVagasPage"; // Added this import as it's in the new routes
import PublicEmpresasPage from "./pages/PublicEmpresasPage";
import PublicVagaDetalhePage from "./pages/PublicVagaDetalhePage";

export default function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Layout Principal (Navbar + Footer + Toolbar) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="cadastro" element={<RegisterPage />} />

              {/* Área admin */}
              <Route path="admin" element={<AdminPage />}>
                <Route path="tipos" element={<TiposPage />} />
                <Route path="subtipos" element={<SubtiposPage />} />
                <Route path="barreiras" element={<BarreirasPage />} />
                <Route path="acessibilidades" element={<AcessibilidadesPage />} />
              </Route>

              {/* Área pública */}
              <Route path="vagas" element={<PublicVagasPage />} />
              <Route path="vagas/:id" element={<PublicVagaDetalhePage />} />
              <Route path="empresas" element={<PublicEmpresasPage />} />

              {/* Área da empresa */}
              <Route path="empresa/:id" element={<EmpresaPage />}>
                <Route index element={<EmpresaDashboard />} />
                <Route path="vagas" element={<VagaPage />} />
                <Route path="vagas/:vagaId" element={<VagaDetalhePage />} />
              </Route>

              {/* Área do candidato */}
              <Route path="candidato/:id" element={<CandidatoPage />} />
              <Route path="candidato/:id/vagas" element={<CandidatoVagasPage />} />

              {/* 404 */}
              <Route path="*" element={<div className="container-page py-16 text-center text-xl">Página não encontrada.</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AccessibilityProvider>
  );
}