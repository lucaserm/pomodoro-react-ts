import { motion, AnimatePresence } from 'framer-motion';
import { secondsToMinutes } from '../utils/seconds-to-minutes';

interface Props {
  mainTime: number;
}

export function Timer({ mainTime }: Props) {
  const timeString = secondsToMinutes(mainTime);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-7xl md:text-9xl font-bold text-center my-8 font-mono text-gray-900 dark:text-white"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={timeString}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {timeString}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
