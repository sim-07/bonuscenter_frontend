import { Box, Link } from '@mui/material';

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
                <Link href="/home" underline="none" color="inherit">Home</Link>
                <Link href="/about" underline="none" color="inherit">About</Link>
                <Link underline="none" color="inherit" onClick={openLoginDialog}>Login</Link>

                <DialogComponent open={openLogin} onClose={() => setOpenLogin(false)} variant="form">
                    <LoginForm signinTypeP={"login"} />
                </DialogComponent>
            </Navbar>
        </Box>
    );
}