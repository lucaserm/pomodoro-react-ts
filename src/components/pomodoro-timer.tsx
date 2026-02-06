import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePomodoroStore } from '../store/pomodoro';
import { useInterval } from '../hooks/use-interval';
import { Timer } from './timer';
import { Button } from './button';
import { secondsToTime } from '../utils/seconds-to-time';
import { requestNotificationPermission, showNotification } from '../utils/notifications';
import bellStart from '../sounds/bell-start.mp3';
import bellFinish from '../sounds/bell-finish.mp3';

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

export function PomodoroTimer() {
  const {
    mainTime,
    timeCounting,
    mode,
    cyclesQtdManager,
    completedCycles,
    fullWorkingTime,
    numberOfPomodoros,
    pomodoroTime,
    shortRestTime,
    longRestTime,
    decrementTime,
    toggleTimer,
    setMainTime,
    setMode,
    incrementPomodoros,
    completeCycle,
    resetCycleManager,
    popCycleManager,
  } = usePomodoroStore();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useInterval(
    () => {
      decrementTime();
    },
    timeCounting ? 1000 : null
  );

  const configureWork = () => {
    setMode('work');
    setMainTime(pomodoroTime);
    if (!timeCounting) {
      toggleTimer();
    }
    audioStartWorking.play();
    showNotification('Hora de trabalhar! 💼', 'Foque por 25 minutos');
  };

  const configureRest = (long: boolean) => {
    setMode(long ? 'longRest' : 'shortRest');
    setMainTime(long ? longRestTime : shortRestTime);
    if (!timeCounting) {
      toggleTimer();
    }
    audioStopWorking.play();
    showNotification(
      long ? 'Descanso longo! ☕' : 'Hora de descansar! ☕',
      long ? 'Relaxe por 15 minutos' : 'Descanse por 5 minutos'
    );
  };

  useEffect(() => {
    if (mainTime > 0) return;

    if (mode === 'work' && cyclesQtdManager.length > 0) {
      configureRest(false);
      popCycleManager();
    } else if (mode === 'work' && cyclesQtdManager.length <= 0) {
      configureRest(true);
      resetCycleManager();
      completeCycle();
    }

    if (mode === 'work') {
      incrementPomodoros();
    }
    if (mode === 'shortRest' || mode === 'longRest') {
      configureWork();
    }
  }, [mainTime]);

  useEffect(() => {
    document.body.className = mode === 'work' ? 'working' : 'resting';
  }, [mode]);

  const isWorking = mode === 'work';
  const isResting = mode === 'shortRest' || mode === 'longRest';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
        <motion.h2
          key={mode}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
        >
          {isWorking ? '💼 Trabalhando' : isResting ? '☕ Descansando' : '🍅 Pronto para começar'}
        </motion.h2>

        <Timer mainTime={mainTime} />

        <div className="flex gap-4 justify-center flex-wrap my-8">
          <Button
            onClick={configureWork}
            variant={isWorking ? 'primary' : 'secondary'}
          >
            Trabalhar
          </Button>
          <Button
            onClick={() => configureRest(false)}
            variant={isResting ? 'primary' : 'secondary'}
          >
            Descansar
          </Button>
          <Button
            onClick={toggleTimer}
            disabled={mode === 'idle'}
          >
            {timeCounting ? '⏸ Pausar' : '▶ Iniciar'}
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          <StatCard label="Ciclos concluídos" value={completedCycles} />
          <StatCard label="Tempo trabalhado" value={secondsToTime(fullWorkingTime)} />
          <StatCard label="Pomodoros" value={numberOfPomodoros} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center cursor-default"
    >
      <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
      <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
    </motion.div>
  );
}
