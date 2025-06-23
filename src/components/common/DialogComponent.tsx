'use client';

import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box } from '@mui/material';
import { easeOut, easeIn } from 'framer-motion';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const scaleVariant = {
  hidden: { scale: 0.5 },
  visible: {
    scale: 1,
    transition: { duration: 0.2, ease: easeOut },
  },
  exit: {
    scale: 0.5,
    transition: { duration: 0.2, ease: easeIn },
  },
};

type DialogComponentProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: 'form' | 'error';
};

export default function DialogComponent({
  open,
  onClose,
  children,
  variant = 'form',
}: DialogComponentProps) {
  const isError = variant === 'error';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'fixed',
            top: 0,
            left: '-20px',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}
          onClick={onClose}
        >
          <motion.div
            variants={scaleVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'white',
                color: isError ? '#ce0000' : 'black',
                padding: isError ? 2 : 4,
                borderRadius: 2,
                boxShadow: 24,
                maxHeight: isError ? 200 : 600,
                minWidth: isError ? 250 : 300,
                maxWidth: isError ? 500 : 500,
                width: isError
                  ? { xs: '80vw', sm: 280 }
                  : { xs: '90vw', sm: 400, md: '100%' },
              }}
            >
              {children}
            </Box>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
