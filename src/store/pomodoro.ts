import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimerMode = 'work' | 'shortRest' | 'longRest' | 'idle';

interface PomodoroState {
  mainTime: number;
  timeCounting: boolean;
  mode: TimerMode;
  currentCycle: number;
  cyclesQtdManager: boolean[];
  completedCycles: number;
  fullWorkingTime: number;
  numberOfPomodoros: number;
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
  darkMode: boolean;
  
  setMainTime: (time: number) => void;
  decrementTime: () => void;
  toggleTimer: () => void;
  setMode: (mode: TimerMode) => void;
  incrementPomodoros: () => void;
  completeCycle: () => void;
  resetCycleManager: () => void;
  popCycleManager: () => void;
  toggleDarkMode: () => void;
  updateSettings: (settings: Partial<Pick<PomodoroState, 'pomodoroTime' | 'shortRestTime' | 'longRestTime' | 'cycles'>>) => void;
  resetStats: () => void;
}

const DEFAULT_POMODORO_TIME = 1500;
const DEFAULT_SHORT_REST = 300;
const DEFAULT_LONG_REST = 900;
const DEFAULT_CYCLES = 4;

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      mainTime: DEFAULT_POMODORO_TIME,
      timeCounting: false,
      mode: 'idle',
      currentCycle: 1,
      cyclesQtdManager: new Array(DEFAULT_CYCLES - 1).fill(true),
      completedCycles: 0,
      fullWorkingTime: 0,
      numberOfPomodoros: 0,
      pomodoroTime: DEFAULT_POMODORO_TIME,
      shortRestTime: DEFAULT_SHORT_REST,
      longRestTime: DEFAULT_LONG_REST,
      cycles: DEFAULT_CYCLES,
      darkMode: false,
      
      setMainTime: (time) => set({ mainTime: time }),
      
      decrementTime: () => {
        const state = get();
        set({ mainTime: state.mainTime - 1 });
        if (state.mode === 'work') {
          set({ fullWorkingTime: state.fullWorkingTime + 1 });
        }
      },
      
      toggleTimer: () => set((state) => ({ timeCounting: !state.timeCounting })),
      setMode: (mode) => set({ mode }),
      incrementPomodoros: () => set((state) => ({ numberOfPomodoros: state.numberOfPomodoros + 1 })),
      completeCycle: () => set((state) => ({ completedCycles: state.completedCycles + 1 })),
      
      resetCycleManager: () => {
        const state = get();
        set({ cyclesQtdManager: new Array(state.cycles - 1).fill(true) });
      },
      
      popCycleManager: () => set((state) => {
        const newManager = [...state.cyclesQtdManager];
        newManager.pop();
        return { cyclesQtdManager: newManager };
      }),
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      updateSettings: (settings) => set(settings),
      
      resetStats: () => set({
        completedCycles: 0,
        fullWorkingTime: 0,
        numberOfPomodoros: 0,
      }),
    }),
    {
      name: 'pomodoro-storage',
      partialize: (state) => ({
        completedCycles: state.completedCycles,
        fullWorkingTime: state.fullWorkingTime,
        numberOfPomodoros: state.numberOfPomodoros,
        pomodoroTime: state.pomodoroTime,
        shortRestTime: state.shortRestTime,
        longRestTime: state.longRestTime,
        cycles: state.cycles,
        darkMode: state.darkMode,
      }),
    }
  )
);
