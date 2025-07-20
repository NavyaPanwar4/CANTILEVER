import { useEffect } from 'react';
import './ThemeVerifier.css';

export default function ThemeVerifier() {
  useEffect(() => {
    // Check all elements for proper dark mode application
    const verifyDarkMode = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const expectedBackground = theme === 'dark' 
        ? getComputedStyle(document.documentElement)
          .getPropertyValue('--background-default').trim()
        : '#f5f5f5';
      
      const actualBackground = getComputedStyle(document.body)
        .backgroundColor;
      
      console.log(`Theme: ${theme}`);
      console.log(`Expected BG: ${expectedBackground}`);
      console.log(`Actual BG: ${actualBackground}`);
      
      if (actualBackground !== expectedBackground) {
        console.error('Dark mode background mismatch!');
        document.body.style.backgroundColor = expectedBackground;
      }
    };

    verifyDarkMode();
    window.addEventListener('theme-change', verifyDarkMode);
    
    return () => window.removeEventListener('theme-change', verifyDarkMode);
  }, []);

  return null; // This is a non-visual component
}