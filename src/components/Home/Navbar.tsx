'use client';

import { AppBar, Toolbar, Typography, Button, Stack, Link, Box } from '@mui/material';
import Image from 'next/image';

import DialogComponent from '../common/DialogComponent';
import LoginForm from '../common/LoginForm';
import { useState } from 'react';

export default function Navbar() {
    const [openLogin, setOpenLogin] = useState(false);

    const openLoginDialog = () => {
        setOpenLogin(true);
    };

    return (
        <Box
            sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    color: "#000000",
                    fontSize: "1.1em",
                    px: { xs: 2, sm: 4 }
                }}
            >
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 0
                }}>
                    <Box sx={{ flexGrow: 1, userSelect: 'none', mr: 4 }}>
                        <Image
                            src={'/icon/bonuscenter.avif'}
                            alt={'bonuscenter'}
                            width={256}
                            height={34}
                            priority={true}
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxWidth: '256px',
                                minWidth: '120px'
                            }}
                        />
                    </Box>
                    <Stack direction="row" spacing={2.5} sx={{
                        '& a': {
                            cursor: 'pointer',
                            textDecoration: 'none',
                            fontSize: '1.1em'
                        },
                        '& a:first-of-type': {
                            fontWeight: 'bold',
                        },
                    }}>
                        <Link href="/home" underline="none" color="inherit">Home</Link>
                        <Link href="/about" underline="none" color="inherit">About</Link>
                        <Link underline="none" color="inherit" onClick={openLoginDialog}>Login</Link>
                    </Stack>
                </Toolbar>
            </AppBar >

            <DialogComponent open={openLogin} onClose={() => setOpenLogin(false)}>
                <LoginForm signinTypeP={"login"} />
            </DialogComponent>
        </Box>

    );
}