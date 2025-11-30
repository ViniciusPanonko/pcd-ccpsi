import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  dyslexicFont: boolean;
  toggleDyslexicFont: () => void;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1); // 1 = 100%
  const [dyslexicFont, setDyslexicFont] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedContrast = localStorage.getItem('highContrast') === 'true';
    const savedFontSize = parseFloat(localStorage.getItem('fontSize') || '1');
    const savedDyslexic = localStorage.getItem('dyslexicFont') === 'true';

    setHighContrast(savedContrast);
    setFontSize(savedFontSize);
    setDyslexicFont(savedDyslexic);
  }, []);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('highContrast', String(highContrast));
    localStorage.setItem('fontSize', String(fontSize));
    localStorage.setItem('dyslexicFont', String(dyslexicFont));

    // Apply classes to body/html
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    if (dyslexicFont) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }

    // Apply font size to root
    document.documentElement.style.fontSize = `${fontSize * 16}px`;

  }, [highContrast, fontSize, dyslexicFont]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 0.1, 1.5)); // Max 150%
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 0.1, 0.8)); // Min 80%

  const toggleDyslexicFont = () => setDyslexicFont(prev => !prev);

  const resetSettings = () => {
    setHighContrast(false);
    setFontSize(1);
    setDyslexicFont(false);
  };

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      toggleHighContrast,
      fontSize,
      increaseFontSize,
      decreaseFontSize,
      dyslexicFont,
      toggleDyslexicFont,
      resetSettings
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
