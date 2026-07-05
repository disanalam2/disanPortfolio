import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const PageLayout = ({ children, className = "" }) => {
  return (
    <motion.section
      className={`${className} container`} // 'container' auto attach ho jayega width ke liye
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
};

export default PageLayout;