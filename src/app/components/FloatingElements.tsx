'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Fixed positions for floating elements
const POSITIONS = [
  { x: '10%', y: '20%' },
  { x: '25%', y: '40%' },
  { x: '40%', y: '15%' },
  { x: '55%', y: '30%' },
  { x: '70%', y: '45%' },
  { x: '85%', y: '25%' },
  { x: '15%', y: '60%' },
  { x: '30%', y: '75%' },
  { x: '45%', y: '85%' },
  { x: '60%', y: '65%' },
  { x: '75%', y: '80%' },
  { x: '90%', y: '55%' },
  { x: '5%', y: '35%' },
  { x: '20%', y: '90%' },
  { x: '35%', y: '50%' },
  { x: '50%', y: '95%' },
  { x: '65%', y: '10%' },
  { x: '80%', y: '70%' },
  { x: '95%', y: '40%' },
  { x: '10%', y: '85%' },
];

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      {/* Floating elements */}
      <AnimatePresence>
        {POSITIONS.map((pos, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-blue-500/20 dark:bg-blue-400/20"
            style={{
              left: pos.x,
              top: pos.y,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.2, 0.3, 0.2],
              scale: [1, 1.1, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Background blobs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-3xl"
        style={{
          left: '20%',
          top: '30%',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/5 dark:bg-purple-400/5 blur-3xl"
        style={{
          right: '20%',
          bottom: '30%',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
} 