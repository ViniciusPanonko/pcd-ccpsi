
import { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { Type, Sun, Eye, RotateCcw, X } from 'lucide-react';

export default function AccessibilityToolbar() {
    const {
        highContrast,
        toggleHighContrast,
        increaseFontSize,
        decreaseFontSize,
        dyslexicFont,
        toggleDyslexicFont,
        resetSettings
    } = useAccessibility();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2">
            {isOpen && (
                <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-3 min-w-[200px] animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <div className="flex justify-between items-center border-b pb-2 mb-1">
                        <span className="font-semibold text-sm">Acessibilidade</span>
                        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-100 rounded">
                            <X size={16} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Tamanho da Fonte</span>
                            <div className="flex gap-1">
                                <button
                                    onClick={decreaseFontSize}
                                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded"
                                    aria-label="Diminuir fonte"
                                >
                                    A-
                                </button>
                                <button
                                    onClick={increaseFontSize}
                                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded"
                                    aria-label="Aumentar fonte"
                                >
                                    A+
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={toggleHighContrast}
                            className={`flex items-center gap-2 p-2 rounded text-sm transition-colors ${highContrast ? 'bg-yellow-400 text-black font-bold' : 'hover:bg-slate-100'}`}
                        >
                            <Sun size={18} />
                            Alto Contraste
                        </button>

                        <button
                            onClick={toggleDyslexicFont}
                            className={`flex items-center gap-2 p-2 rounded text-sm transition-colors ${dyslexicFont ? 'bg-blue-100 text-blue-800' : 'hover:bg-slate-100'}`}
                        >
                            <Type size={18} />
                            Fonte Dislexia
                        </button>

                        <button
                            onClick={resetSettings}
                            className="flex items-center gap-2 p-2 rounded text-sm hover:bg-red-50 text-red-600 mt-2 border-t"
                        >
                            <RotateCcw size={16} />
                            Restaurar Padrão
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                aria-label="Abrir menu de acessibilidade"
            >
                <Eye size={24} />
            </button>
        </div>
    );
}
