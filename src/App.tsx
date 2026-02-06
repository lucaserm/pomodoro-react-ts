import { useEffect } from 'react';
import { usePomodoroStore } from './store/pomodoro';
import { PomodoroTimer } from './components/pomodoro-timer';
import { DarkModeToggle } from './components/dark-mode-toggle';

export default function App() {
  const darkMode = usePomodoroStore((state) => state.darkMode);

  useEffect(() => {
    // Apply dark mode to document
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-cyan-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <DarkModeToggle />
      <PomodoroTimer />
    </div>
  );
}
