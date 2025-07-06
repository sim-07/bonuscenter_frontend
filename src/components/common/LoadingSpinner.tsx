import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingSpinnerProps {
  size?: number;
}

export default function LoadingSpinner({size = 80}: LoadingSpinnerProps) {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <CircularProgress size={size} />
    </Stack>
  );
}