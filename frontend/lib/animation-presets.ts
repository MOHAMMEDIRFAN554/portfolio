export const animationPresets = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  flipIn: {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  slideIn: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },

  rotateIn: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 },
    transition: { duration: 0.7, ease: 'easeOut' },
  },

  bounce: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
  },

  pulse: {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },

  glow: {
    animate: {
      boxShadow: [
        '0 0 20px rgba(250, 0, 255, 0.3)',
        '0 0 40px rgba(250, 0, 255, 0.6)',
        '0 0 20px rgba(250, 0, 255, 0.3)',
      ],
    },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },

  float: {
    animate: { y: [0, -20, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },

  shimmer: {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
    },
    transition: { duration: 3, repeat: Infinity, ease: 'linear' },
  },

  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },

  hoverScale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 10 },
  },

  hoverGlow: {
    whileHover: {
      boxShadow: '0 0 30px rgba(250, 0, 255, 0.5)',
    },
    transition: { duration: 0.3 },
  },
};
