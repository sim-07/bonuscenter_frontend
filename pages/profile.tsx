import { Box, Button, Typography, Avatar, Stack, Divider, LinearProgress, IconButton, Link, Select, MenuItem, SelectChangeEvent, Chip } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AppsIcon from '@mui/icons-material/Apps';

import apiService from '@/components/scripts/apiService';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';
import CustomizedSnackbar from '@/components/common/Snakbar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { supabase } from '@/lib/supabaseClient';

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['profile', 'common'])),
        },
    };
}

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
        visibility: number;
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
            await supabase.auth.signOut();

            if (typeof window !== 'undefined') {
                window.localStorage.clear();
                window.sessionStorage.clear();
            }

            await apiService('users', 'logout');

            window.location.href = '/';

        } catch (err) {
            console.error("Error during logout:", err);
            await apiService('users', 'logout');
            router.push('/');
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

    let codesCount = usedCodes.length;
    let bonusValue = usedCodes.reduce((acc, curr) => {
        return acc + parseFloat(curr.bonus_value || '0');
    }, 0);



    let userBonusTotal = userBonusValue.reduce((acc, curr) => {
        return acc + parseFloat(curr.bonus_value || '0');
    }, 0);

    let bonusValueTot = bonusValue + userBonusTotal;

    let visibilityLabel = t('visibility_initial');
    if (userData.visibility >= 75) visibilityLabel = t('visibility_extreme');
    else if (userData.visibility >= 50) visibilityLabel = t('visibility_good');
    else if (userData.visibility >= 20) visibilityLabel = t('visibility_fair');

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            <Head>
                <title>{t('page_title')} | BonusCenter</title>
            </Head>
            <Navbar>
                <></>
            </Navbar>

            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <Box
                    sx={{
                        maxWidth: 1000,
                        width: { xs: '95%', md: '80%', lg: '60%' },
                        margin: '0 auto',
                        padding: { xs: 3, sm: 6, md: 10 },
                        borderRadius: 4,
                        mt: 6,
                        mb: 10,
                        backgroundColor: 'grey.800',
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
                        <Box
                            sx={{
                                borderRadius: "16px",
                                width: "100%",
                                marginTop: "40px !important",
                                p: 3,
                            }}
                        >
                            <Stack direction={{ xs: "column", sm: "row" }} gap={{ xs: 2, sm: 4 }} alignItems="center">
                                <Avatar sx={{ width: 80, height: 80, backgroundColor: "primary.main" }}>
                                    {email?.charAt(0)?.toUpperCase() || '?'}
                                </Avatar>

                                <Box textAlign={{ xs: "center", sm: "left" }}>
                                    <Typography variant="h5">@{username}</Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        {email}
                                    </Typography>
                                    <Chip
                                        label={`${t('registered_on')} ${new Date(userData.created_at).toLocaleDateString('it-IT')}`}
                                        size="small"
                                        variant="outlined"
                                        sx={{ color: '#888', borderColor: '#444', mt: 1 }}
                                    />
                                </Box>
                            </Stack>

                        </Box>

                        <Box width="100%">
                            <Stack direction={{ xs: 'column', md: 'row' }} gap={3}>
                                <Box
                                    sx={{
                                        backgroundColor: "#292929",
                                        borderRadius: "16px",
                                        width: "100%",
                                        p: 3,
                                        maxWidth: { xs: "100%", md: "300px" },
                                        height: "160px"
                                    }}
                                >
                                    <Stack direction={"row"}>
                                        <AppsIcon />
                                        <Typography sx={{ ml: 2, marginTop: "-5px", color: "#7f7f7f" }} variant="h6"><strong>{t('used_codes')}</strong></Typography>
                                    </Stack>
                                    <Typography variant="h4" sx={{ mt: 2 }}>{codesCount}</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        backgroundColor: "#292929",
                                        borderRadius: "16px",
                                        width: "100%",
                                        p: 3,
                                    }}
                                >
                                    <Stack direction={"row"}>
                                        <MonetizationOnIcon sx={{ color: "gold" }} />
                                        <Typography sx={{ ml: 2, marginTop: "-5px", color: "#7f7f7f" }} variant="h6"><strong>{t('total_earnings')}</strong></Typography>
                                    </Stack>

                                    <Typography variant="h4" sx={{ mt: 2 }}>{bonusValueTot}€</Typography>
                                </Box>
                            </Stack>


                            <Box
                                sx={{
                                    backgroundColor: "grey.700",
                                    borderRadius: "16px",
                                    width: "100%",
                                    marginTop: "20px !important",
                                    p: 3,
                                }}
                            >
                                <Typography sx={{ fontSize: '18px', mb: 2 }} component="div">
                                    <Stack direction={"row"} gap={2} alignItems="center">
                                        <EmojiEventsIcon sx={{ fontSize: "30px", color: "primary.main" }} />
                                        <Typography variant='h5'><strong>{t('visibility')}:</strong></Typography>
                                    </Stack>
                                </Typography>

                                <Stack direction={"row"} gap={2} sx={{ my: 3 }} alignItems="center">
                                    <Typography variant='h5' >{Math.round(userData.visibility)}%</Typography>

                                    <Chip
                                        label={`${visibilityLabel}`}
                                        size="medium"
                                        variant="outlined"
                                        sx={{ color: '#c5c5c5', borderColor: '#585858' }}
                                    />
                                </Stack>


                                <LinearProgress
                                    variant="determinate"
                                    value={userData.visibility}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: '#e0e0e0',
                                        '& .MuiLinearProgress-bar': {
                                            borderRadius: 5,
                                            backgroundColor:
                                                userData.visibility < 20 ? '#f44336' :
                                                    userData.visibility < 50 ? '#ff9800' :
                                                        userData.visibility < 75 ? '#2196f3' :
                                                            '#4caf50'
                                        },
                                    }}
                                />

                                <Typography sx={{ color: '#626262', mt: 3 }}>
                                    &#128712; {t('visibility_description')}
                                </Typography>
                            </Box>


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

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ marginTop: '50px !important', width: "100%" }}>
                            <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
                                {t('logout')}
                            </Button>
                            <Button variant="outlined" color="error" fullWidth onClick={handleDeleteAccount}>
                                {t('delete_account')}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Box>

            <CustomizedSnackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />

            <Footer />

        </Box>
    );
}