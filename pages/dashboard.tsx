'use client';

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

export default function DashboardLayout({ children }: DashboardlayoutProps) {
    // Remove useTranslation since we're client-only
    
    const theme = useTheme();
    
    // Fix: Initialize with false and update on client
    const [isMobile, setIsMobile] = useState(false);
    
    // Only run on client
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 960); // md breakpoint
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

                setUsername(res.data[0].username);
                setUserId(res.data[0].user_id);
                setIsLoading(false);
            } catch (err) {
                console.error('Auth error:', err);
                router.push('/');
            }
        };

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
                    console.error("Error getting notifications:", res.error);
                }
            } catch (error) {
                console.error("Error in unreadNotifications:", error);
            }
        };

        // Run both in parallel
        Promise.all([checkAuth(), unreadNotifications()]);
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
                {/* Hardcoded description since we removed translations */}
                <meta name="description" content="Your dashboard for managing bonuses and rewards" />
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

                    <Box sx={{ minHeight: "100vh" }}>
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
                        {children}
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

// REMOVE getServerSideProps entirely - this component is now client-only