import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import router from 'next/router';

import { Box } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import DialogComponent from '@/components/common/DialogComponent';
import AddCodeForm from '@/components/common/AddCodeForm';
import CustomizedSnackbar from '@/components/common/Snakbar';
import DashboardLayoutDesktop from '@/components/Dashboard/DashboardLayoutDesktop';
import DashboardLayoutMobile from '@/components/Dashboard/DashboardLayoutMobile';
import Footer from '@/components/Home/Footer';
import apiService from '@/components/scripts/apiService';

interface DashboardlayoutProps {
    children?: ReactNode;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardLayout({ children }: DashboardlayoutProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [openCodeDialog, setOpenCodeDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setIsLoading(true);
                
                const res = await apiService('users', 'get_user_data');

                if (res.error || !res.data || !Array.isArray(res.data) || res.data.length === 0) {
                    router.push('/');
                    return;
                }

                setUsername(res.data[0].username);
                setUserId(res.data[0].user_id);
            } catch (err) {
                router.push('/');
            } finally {
                setIsLoading(false);
            }
        };
    
        checkAuth();
    }, []);

    const successAddCode = () => {
        setOpenCodeDialog(false);
        setSnackbarMessage("Il tuo codice è stato inserito!");
        setSnackbarOpen(true);
    };


    return (
        <>
            <Head>
                <title>Dashboard | BonusCenter</title>
                <meta name="description" content="Condividi codici referral e guadagna online in modo veloce e senza rischi" />
                <link rel="icon" href="/icons/bonuscenter_icon.png" />
            </Head>
            {isLoading ? (
                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center' }}>
                    <LoadingSpinner />
                </Box>
            ) : (
                <>
                    <DialogComponent open={openCodeDialog} onClose={() => setOpenCodeDialog(false)}>
                        <AddCodeForm successAddCode={successAddCode} />
                    </DialogComponent>

                    <Box
                        sx={{
                            minHeight: "100vh"
                        }}
                    >
                        {isMobile ? (
                            <DashboardLayoutMobile
                                username={username}
                                openAddCodeDialog={() => setOpenCodeDialog(true)}
                            />
                        ) : (
                            <DashboardLayoutDesktop
                                username={username}
                                openAddCodeDialog={() => setOpenCodeDialog(true)}
                            />
                        )}
                    </Box>


                    <CustomizedSnackbar
                        open={snackbarOpen}
                        onClose={() => setSnackbarOpen(false)}
                        message={snackbarMessage}
                    />
                    <Footer />
                </>
            )}
        </>
    );

}
