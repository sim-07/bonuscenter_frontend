import { Box, Link, Typography } from '@mui/material';
import Navbar from './Navbar';
import { useState } from 'react';
import DialogComponent from '../common/DialogComponent';
import LoginForm from '../common/LoginForm';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';


export default function Header() {
    const { t } = useTranslation('common');
    const { locale } = useRouter();

    const [openLogin, setOpenLogin] = useState(false);

    const openLoginDialog = () => {
        setOpenLogin(true);
    };

    return (
        <Box>
            <Navbar>
                <Typography
                    onClick={openLoginDialog}
                    sx={{
                        cursor: 'pointer',
                        color: 'inherit',
                        fontWeight: 'bold',
                        fontSize: '1.10em'
                    }}
                >
                    {t('login_link')}
                </Typography>

                <Link href={locale === 'it' ? '/it/about' : '/en/about'} underline="none" color="inherit" sx={{ whiteSpace: "nowrap", display: {xs: "none", sm: "block"} }}>
                    {t('about')}
                </Link>

                <DialogComponent open={openLogin} onClose={() => setOpenLogin(false)} variant="form">
                    <LoginForm signinTypeP={"signup"} />
                </DialogComponent>
            </Navbar>
        </Box>
    );
}
