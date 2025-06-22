import { motion } from 'framer-motion';

export default function FeedbackBanner({ type, message }) {
  // Не рендерим компонент, если нет данных
  if (!type || !message) {
    return null;
  }

  return (
    <motion.div
      className={`feedback-banner ${type}`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {message}
    </motion.div>
  );
} 