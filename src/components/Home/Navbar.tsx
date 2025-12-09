import { Box, AppBar, Toolbar, Stack } from '@mui/material';
import { ReactNode } from 'react';

import BonuscenterIcon from '../Icons/BonuscenterIcon.jsx';
import router, { Router } from 'next/router.js';


interface NavbarProps {
    children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
    return (
        <Box
            sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <AppBar
                position="static"
                sx={{
                    boxShadow: 'none',
                    color: '#b9b9b9ff',
                    backgroundColor: 'grey.900',
                    fontSize: '1.1em',
                    px: { xs: 2, sm: 4 },
                    backgroundImage: 'none',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        px: 0,
                        flexDirection: 'row',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            order: { xs: 0, md: 1 },
                            '& a': {
                                cursor: 'pointer',
                                textDecoration: 'none',
                                fontSize: '1.1em',
                                marginLeft: '25px',

                            },
                        }}
                    >
                        {children}
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            userSelect: 'none',
                            mr: { xs: 0, md: 4 },
                            ml: { xs: 2, md: 0 },
                            minWidth: { xs: '150px', sm: '150px', md: '256px' },
                            maxWidth: { xs: '150px', sm: '150px', md: '256px' },
                            order: { xs: 1, md: 0 },
                        }}
                    >
                        <BonuscenterIcon
                            style={{
                                width: '100%',
                                height: 'auto',
                                cursor: 'pointer'
                            }}
                            onClick={() => router.push('/dashboard')}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
