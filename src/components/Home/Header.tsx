import { Box, Link, Typography } from '@mui/material';

import Navbar from './Navbar';
import { useState } from 'react';
import DialogComponent from '../common/DialogComponent';
import LoginForm from '../common/LoginForm';

export default function Header() {

    const [openLogin, setOpenLogin] = useState(false);

    const openLoginDialog = () => {
        setOpenLogin(true);
    };

    return (
        <Box>
            <Navbar>
                <Typography
                    onClick={openLoginDialog}
                    sx={{ cursor: 'pointer', color: 'inherit' }}
                >
                    Login
                </Typography>
                <Link href="/about" underline="none" color="inherit">About</Link>


                <DialogComponent open={openLogin} onClose={() => setOpenLogin(false)} variant="form">
                    <LoginForm signinTypeP={"login"} />
                </DialogComponent>
            </Navbar>
        </Box>
    );
}