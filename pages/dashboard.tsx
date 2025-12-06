import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import router from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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

export default function DashboardLayout({ children }: DashboardlayoutProps) {
    const { t, ready } = useTranslation('dashboard');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [openCodeDialog, setOpenCodeDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [unread, setUnread] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setIsLoading(true);

                const res = await apiService('users', 'get_user_data');

                if (res.error || !res.data || !Array.isArray(res.data) || res.data.length === 0) {
                    router.push('/');
                    return;
                }

                setIsLoading(false);

                setUsername(res.data[0].username);
                setUserId(res.data[0].user_id);
            } catch (err) {
                router.push('/');
            }
        };

        const unreadNotifications = async () => {
            try {
                setIsLoading(true);
                const res = await apiService('notification', 'get_notifications_not_read', {});

                if (!res.error) {
                    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                        setUnread(true);
                    } else {
                        setUnread(false);
                    }
                } else {
                    console.error(t("error_get_notifications"), res.error);
                }


            } catch (error) {
                console.error(t("error notReadNotifications"), error);
            } finally {
                setIsLoading(false);
            }
        };

        unreadNotifications();
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
                <meta name="description" content={ready ? t('description') : ''} />
                <link rel="icon" href="/favicon.ico" />
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
                                setUnread={setUnread}
                                unread={unread}
                            />
                        ) : (
                            <DashboardLayoutDesktop
                                username={username}
                                openAddCodeDialog={() => setOpenCodeDialog(true)}
                                setUnread={setUnread}
                                unread={unread}
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

// export async function getServerSideProps({ locale }: { locale: string }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['dashboard', 'common', 'profile'])),
//         },
//     };
// }