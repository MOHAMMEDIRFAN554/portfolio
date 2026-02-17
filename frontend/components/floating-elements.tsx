'use client';

import { motion } from 'framer-motion';

export function FloatingElements() {
  const elements = [
    { id: 1, size: 'w-32 h-32', top: '10%', left: '10%', delay: 0, duration: 6 },
    { id: 2, size: 'w-48 h-48', top: '60%', left: '80%', delay: 1, duration: 8 },
    { id: 3, size: 'w-40 h-40', top: '30%', left: '70%', delay: 2, duration: 7 },
    { id: 4, size: 'w-24 h-24', top: '80%', left: '20%', delay: 0.5, duration: 9 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map(element => (
        <motion.div
          key={element.id}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: element.delay,
          }}
          className={`absolute ${element.size} rounded-full opacity-5 blur-3xl`}
          style={{
            top: element.top,
            left: element.left,
            background: element.id % 2 === 0 ? 'radial-gradient(circle, #fa00ff, transparent)' : 'radial-gradient(circle, #00d4ff, transparent)',
          }}
        />
      ))}
    </div>
  );
}
