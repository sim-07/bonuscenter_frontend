import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import router from 'next/router';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

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

import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

interface DashboardlayoutProps {
    children?: ReactNode;
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['dashboard', 'common'])),
        },
    };
}

export default function DashboardLayout({ children }: DashboardlayoutProps) {
    const { t } = useTranslation('dashboard');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [openCodeDialog, setOpenCodeDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [unread, setUnread] = useState(false);
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [isAuthChecking, setIsAuthChecking] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const checkAuthMethod = async () => {
            try {
                const { data: { user }, error: userError } = await supabase.auth.getUser();

                if (!userError && user) {
                    setUserAuth(user);
                }
            } catch (err) {
                console.log("ERROR checkAuthMethod: ", err);
                setIsLoading(false);
                router.push('/');
            } finally {
                setIsAuthChecking(false);
            }
        }

        checkAuthMethod();
    }, []);

    useEffect(() => {

        if (isAuthChecking) {
            return;
        }

        const checkAuth = async () => {
            try {
                switch (userAuth?.app_metadata.provider) {
                    case "google":
                        try {
                            const res = await apiService('users', 'google_signin', {
                                user: userAuth
                            });

                            if (res.error) {
                                console.error("Error google: ", res.error);
                                router.push("/");
                                return;
                            }
                        } catch (err) {
                            console.error("Error google: ", err)
                        }
                        break;

                    default:
                        break;
                }

                await getUserData();
                await unreadNotifications();
            } catch (err) {
                console.log("Err checkAuth", err);
                router.push("/");
            } finally {
                setIsLoading(false);
            }
        }

        const unreadNotifications = async () => {
            try {
                const res = await apiService('notification', 'get_notifications_not_read', {});

                if (!res.error) {
                    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                        setUnread(true);
                    } else {
                        setUnread(false);
                    }
                } else {
                    console.error("Error_get_notifications", res.error);
                }


            } catch (error) {
                console.error("Error notReadNotifications", error);
            }
        };

        const getUserData = async () => {
            const res = await apiService('users', 'get_user_data');

            if (res.error || !res.data || !Array.isArray(res.data) || res.data.length === 0) {
                console.log("NO USER DATA: ", res);
                router.push('/');
                return;
            }
            setUsername(res.data[0].username);
            setUserId(res.data[0].user_id);
        }

        checkAuth();

    }, [userAuth, isAuthChecking]);


    const successAddCode = () => {
        setOpenCodeDialog(false);
        setSnackbarMessage("Il tuo codice è stato inserito!");
        setSnackbarOpen(true);
    };

    return (
        <>
            <Head>
                <title>Dashboard | BonusCenter</title>
                <meta name="description" content={t('description')} />
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

