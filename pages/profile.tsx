'use client';

import { Box, Button, Typography, Avatar, Stack, Divider, LinearProgress, IconButton, Link, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';

import apiService from '@/components/scripts/apiService';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomizedSnackbar from '@/components/common/Snakbar';

export default function Profilo() {
    const router = useRouter();
    const { pathname, asPath, query } = router;

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const { locale } = useRouter();
    const { t } = useTranslation('profile');

    const [userData, setUserData] = useState<{
        username: string;
        email: string;
        created_at: string;
    } | null>(null);

    const [usedCodes, setUsedCodes] = useState<Array<{
        bonus_name: string;
        brand: string;
        bonus_value: string;
    }>>([]);

    const [userBonusValue, setUserBonusValue] = useState<Array<{
        bonus_name: string;
        brand: string;
        bonus_value: string;
    }>>([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await apiService('users', 'get_user_data');

                if (res.error || !res.data || !Array.isArray(res.data) || res.data.length === 0) {
                    router.push('/');
                    return;
                }

                setUserData(res.data[0]);
            } catch (err) {
                console.error(t('error_loading_profile'));
                router.push('/');
            }
        };

        const fetchUsedCodes = async () => {
            try {
                const res = await apiService('used_codes', 'get_used_code');

                if (!res.error) {
                    const confirmedCodes = res.data.filter((code: any) => code.confirmed === true);
                    console.log(confirmedCodes)
                    setUsedCodes(confirmedCodes);
                } else {
                    console.error(t('error_fetching_used_codes'));
                }
            } catch (err) {
                console.error(t('error_fetching_used_codes'));
            }
        };

        const fetchUserUsedCodes = async () => {
            try {
                const res = await apiService('used_codes', 'get_user_used_code', { confirmed: true });

                if (!res.error) {
                    setUserBonusValue(res.data);
                } else {
                    console.error(t('error_fetching_user_used_codes'));
                }
            } catch (err) {
                console.error(t('error_fetching_user_used_codes'));
            }
        };

        fetchProfile();
        fetchUsedCodes();
        fetchUserUsedCodes();
    }, [t, router]);

    const handleLogout = async () => {
        try {
            await apiService('users', 'logout');
            router.push('/');
        } catch (err) {
            console.error(t('error_logout'));
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm(t('confirm_delete_account'))) return;

        try {
            await apiService('users', 'delete_account');
            router.push('/');
        } catch (err) {
            console.error(t('error_delete_account'));
        }
    };

    if (!userData) {
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

    const handleChangeLang = (event: SelectChangeEvent) => {
        const newLocale = event.target.value as string;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    const handleShare = () => {
        const urlShare = `${window.location.origin}/${locale}/user?u=${userData.username}`;
        if (navigator.share) {
            navigator.share({
                url: urlShare
            }).catch(err => {
                console.error('Errore durante la condivisione:', err);
            });
        } else {
            navigator.clipboard.writeText(urlShare).then(() => {
                setSnackbarOpen(true);
                setSnackbarMessage(t("code_copied"));
            });
        }
    };

    const { username, email, created_at } = userData;

    const maxCodes = 13;
    const maxBonus = 200;

    let codesCount = usedCodes.length;
    let bonusValue = usedCodes.reduce((acc, curr) => {
        return acc + parseFloat(curr.bonus_value || '0');
    }, 0);

    let visibilityPercent = Math.min(
        100,
        ((codesCount / maxCodes) * 50) + ((bonusValue / maxBonus) * 50)
    );

    let userBonusTotal = userBonusValue.reduce((acc, curr) => {
        return acc + parseFloat(curr.bonus_value || '0');
    }, 0);

    let bonusValueTot = bonusValue + userBonusTotal;

    let visibilityLabel = t('visibility_initial');
    if (visibilityPercent >= 75) visibilityLabel = t('visibility_extreme');
    else if (visibilityPercent >= 50) visibilityLabel = t('visibility_good');
    else if (visibilityPercent >= 20) visibilityLabel = t('visibility_fair');

    return (
        <>
            <Head>
                <title>{t('page_title')} | BonusCenter</title>
            </Head>
            <Navbar>
                <></>
            </Navbar>

            <Box
                sx={{
                    maxWidth: 600,
                    width: { xs: '90%', md: '60%' },
                    margin: '0 auto',
                    padding: 10,
                    borderRadius: 4,
                    boxShadow: 3,
                    mt: 6,
                    mb: 10,
                    backgroundColor: '#fff',
                }}
            >
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>

                    <NextLink href={locale === 'it' ? '/it/dashboard' : '/en/dashboard'} passHref>
                        <IconButton>
                            <ArrowBackIcon sx={{ fontSize: '30px' }} />
                        </IconButton>
                    </NextLink>

                    <IconButton onClick={handleShare}>
                        <ShareIcon sx={{ fontSize: '30px' }} />
                    </IconButton>

                </Stack>


                <Stack spacing={3} alignItems="center">
                    <Avatar sx={{ width: 80, height: 80 }}>
                        {email?.charAt(0)?.toUpperCase() || '?'}
                    </Avatar>

                    <Box textAlign="center">
                        <Typography variant="h6">@{username}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {email}
                        </Typography>
                        <Typography variant="body2" color="gray">
                            {t('registered_on')} {new Date(created_at).toLocaleDateString()}
                        </Typography>
                    </Box>

                    <Divider sx={{ width: '100%' }} />

                    <Box width="100%">
                        <Typography variant="h6" sx={{ mb: 2 }} gutterBottom>
                            📊 {t('activity')}
                        </Typography>
                        <Typography variant="body1"><strong>{t('used_codes')}:</strong> {codesCount}</Typography>
                        <Typography variant="body1"><strong>{t('total_earnings')}:</strong> {bonusValueTot}€</Typography>

                        <Box sx={{ mt: 3, mb: 2 }}>
                            <Typography sx={{ fontSize: '18px', mb: 2 }} gutterBottom>
                                <strong>{t('visibility')}:</strong> {visibilityLabel} (+{Math.round(visibilityPercent)}%)
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={visibilityPercent}
                                sx={{
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: '#e0e0e0',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 5,
                                        backgroundColor:
                                            visibilityPercent < 20 ? '#f44336' :
                                                visibilityPercent < 50 ? '#ff9800' :
                                                    visibilityPercent < 75 ? '#2196f3' :
                                                        '#4caf50'
                                    },
                                }}
                            />
                        </Box>
                        <Typography sx={{ color: '#626262' }}>
                            {t('visibility_description')}
                        </Typography>
                    </Box>

                    <Divider sx={{ width: '100%' }} />

                    <Stack direction={'row'} spacing={2} alignItems="center" justifyContent="flex-start" width="100%">
                        <Typography>
                            {t('select_language')}
                        </Typography>

                        <Select
                            value={locale}
                            onChange={handleChangeLang}
                            size="small"
                            sx={{ minWidth: 120 }}
                        >
                            <MenuItem value="it">Italiano</MenuItem>
                            <MenuItem value="en">English</MenuItem>
                        </Select>
                    </Stack>

                    <Divider sx={{ width: '100%' }} />

                    <Stack direction="row" spacing={3} sx={{ marginTop: '50px !important' }}>
                        <Button variant="outlined" color="error" onClick={handleLogout}>
                            {t('logout')}
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleDeleteAccount}>
                            {t('delete_account')}
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            <CustomizedSnackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />

            <Footer />
        </>
    );
}

export async function getServerSideProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['profile', 'common'])),
        },
    };
}