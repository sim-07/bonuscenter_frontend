'use client';

import { Box, Button, Typography, Avatar, Stack, Divider, LinearProgress, IconButton, Link, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import MessageIcon from '@mui/icons-material/Message';

import apiService from '@/components/scripts/apiService';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomizedSnackbar from '@/components/common/Snakbar';
import BonusContainer from '@/components/bonus/BonusContainer';
import { bonusListData } from '@/components/data/bonusListData';
import ChatContainer from '@/components/chat/ChatContainer';

export default function Profilo() {
    const router = useRouter();
    const [openChat, setOpenChat] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severitySnakbar, setSeveritySnakbar] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [authUserId, setAuthUserId] = useState('');
    const [authUsername, setAuthUsername] = useState('');
    const [userCodes, setUserCodes] = useState<any[]>([]);
    const [userData, setUserData] = useState<{
        user_id: string;
        username: string;
        email: string;
        created_at: string;
    } | null>(null);


    const { locale } = useRouter();
    const { t } = useTranslation('user_page');

    const { u } = router.query;

    useEffect(() => {
        const init = async () => {
            try {
                const authRes = await apiService('users', 'get_user_data');

                setAuthUsername(authRes.data[0].username);
                setAuthUserId(authRes.data[0].user_id);

            } catch (err) {
                console.log("Not authenticated")
            }

            try {
                setIsLoading(true);

                const userRes = await apiService('users', 'find_user_by_username', { u });
                if (userRes.error || !userRes.data) {
                    setSnackbarOpen(true);
                    setSnackbarMessage("User not found");
                    setSeveritySnakbar('error');
                    return;
                }
                setUserData(userRes.data);

                const codesRes = await apiService('codes', 'get_codes_by_user', { user_id: userRes.data.user_id });
                if (!codesRes.error && codesRes.data) {
                    const userCodesWithImg = codesRes.data.map((ref: any) => {
                        const selectedBonus = bonusListData.find(
                            (b) => b.title.toLowerCase() === ref.brand.toLowerCase()
                        );
                        return {
                            ...ref,
                            image: selectedBonus?.image,
                        };
                    });

                    setUserCodes(userCodesWithImg);
                } else {
                    setSnackbarOpen(true);
                    setSnackbarMessage("Failed to load user codes");
                    setSeveritySnakbar('error');
                }

            } catch (err) {
                console.error("Init error: ", err);
                setSnackbarOpen(true);
                setSnackbarMessage("Unexpected error");
                setSeveritySnakbar('error');
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, [u]);


    const handleOpenChat = () => {
        if (userData?.username == authUsername) {
            setSnackbarOpen(true);
            setSnackbarMessage(t('same_user'));
            setSeveritySnakbar('warning');
            return;
        }

        if (userData) {
            if (authUserId) {
                if (!openChat) {
                    setOpenChat(true);
                } else {
                    setOpenChat(false);
                }

            } else {
                setSnackbarOpen(true);
                setSnackbarMessage(t('error_auth'));
                setSeveritySnakbar('warning');
            }
        } else {
            setSnackbarOpen(true);
            setSnackbarMessage(t('not_ex_user'));
            setSeveritySnakbar('warning');
        }
    }

    const handleCloseChat = () => {
        setOpenChat(false);
    }

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <LoadingSpinner />
            </Box>
        );
    }


    return (
        <>
            <Head>
                <title>{u} | BonusCenter</title>
            </Head>
            <Navbar>
                <Link
                    href={locale === 'it' ? '/it/dashboard' : '/en/dashboard'}
                    style={{
                        color: 'black',
                        textDecoration: 'underline'
                    }}
                >
                    {t('all_bonus')}
                </Link>
            </Navbar>

            <Box
                sx={{
                    minHeight: '70vh',
                    width: { xs: '90%', md: '90%' },
                    margin: '0 auto',
                    padding: { xs: '50px 30px', md: '60px' },
                    borderRadius: 4,
                    boxShadow: 3,
                    mt: 6,
                    mb: 10,
                    backgroundColor: '#fff',
                }}
            >
                <Stack direction={'column'} gap={5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" gap="20px" alignItems="center">
                            <Avatar />
                            <Typography variant="h5">{userData?.username || "-"}</Typography>
                        </Stack>

                        <IconButton onClick={handleOpenChat}>
                            <MessageIcon sx={{ fontSize: '2rem' }} />
                        </IconButton>
                    </Stack>

                    {userData?.created_at && (
                        <Typography variant="body2" color="gray" sx={{ mb: 1 }}>
                            {t('registered_on')} {new Date(userData.created_at).toLocaleDateString()}
                        </Typography>
                    )}


                    <Box>
                        <BonusContainer width='100%' bonusListDataP={userCodes}>

                        </BonusContainer>
                    </Box>

                </Stack>

            </Box>

            {openChat && userData && authUserId && (
                <ChatContainer
                    handleCloseChat={handleCloseChat}
                    senderId={authUserId}
                    receiverId={userData.user_id}
                    receiverUsername={userData.username}
                />
            )}

            <CustomizedSnackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                severity={severitySnakbar}
                message={snackbarMessage}
            />

            <Footer />
        </>
    );
}

// export async function getServerSideProps({ locale }: { locale: string }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['user_page', 'common'])),
//         },
//     };
// }