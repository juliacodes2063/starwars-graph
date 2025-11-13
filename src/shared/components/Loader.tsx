import { motion } from 'framer-motion';

export function Loader() {
  return (
    <motion.div
      style={{
        display: 'flex',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
      }}
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: '9999px',
            background: 'var(--color-font)',
          }}
          variants={{
            initial: { y: 0, opacity: 0.2 },
            animate: { y: [0, -8, 0], opacity: [0.2, 1, 0.2] },
          }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}
