'use client';

import { Box } from '@mui/material';

export default function ChatContainer() {
    
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                width: 320,
                height: 400,
                bgcolor: '#fff',
                borderRadius: 2,
                boxShadow: 4,
                zIndex: 1300,
            }}
        >

        </Box>
    );
};
