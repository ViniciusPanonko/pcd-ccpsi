
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import AccessibilityToolbar from './AccessibilityToolbar';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <Navbar />

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Inclui+. Todos os direitos reservados.</p>
                    <p className="mt-2">Conectando talentos a oportunidades acessíveis.</p>
                </div>
            </footer>

            <AccessibilityToolbar />
        </div>
    );
}
