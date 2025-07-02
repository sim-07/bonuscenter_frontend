'use client';

import { Box, Button, Typography, Avatar, Stack, Divider, LinearProgress, IconButton, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import apiService from '@/components/scripts/apiService';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';


export default function Profilo() {
    const [userData, setUserData] = useState<{
        username: string;
        email: string;
        created_at: string;
        codes_count: number;
        estimated_bonus: number;
    } | null>(null);

    const router = useRouter();

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
                console.error('Errore nel caricamento del profilo');
                router.push('/');
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await apiService('users', 'logout');
            router.push('/');
        } catch (err) {
            console.error('Errore nel logout');
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm("Sei sicuro di voler cancellare il tuo account? Questa azione è irreversibile.")) return;

        try {
            await apiService('users', 'delete_account');
            router.push('/');
        } catch (err) {
            console.error('Errore durante la cancellazione dell’account');
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

    const { username, email, created_at } = userData;

    const maxCodes = 20;
    const maxBonus = 200;

    ///// test
    let codes_count = 54;
    let estimated_bonus = 120;
    ///// test

    let visibilityPercent = Math.min(100,
        ((codes_count / maxCodes) * 50) + ((estimated_bonus / maxBonus) * 50)
    );

    let visibilityLabel = "Iniziale";
    if (visibilityPercent >= 75) visibilityLabel = "Estrema";
    else if (visibilityPercent >= 50) visibilityLabel = "Ottima";
    else if (visibilityPercent >= 25) visibilityLabel = "Buona";

    return (
        <>
            <Head>
                <title>Bonuscenter | Profile</title>
            </Head>
            <Navbar>
                <></>
            </Navbar>

            <Box
                sx={{
                    maxWidth: 600,
                    margin: '0 auto',
                    padding: 10,
                    borderRadius: 4,
                    boxShadow: 3,
                    mt: 6,
                    mb: 10,
                    backgroundColor: '#fff',
                }}
            >
                <Link href='/dashboard'>
                    <IconButton>
                        <ArrowBackIcon sx={{ fontSize: '30px' }} />
                    </IconButton>
                </Link>

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
                            Registrato il {new Date(created_at).toLocaleDateString()}
                        </Typography>
                    </Box>

                    <Divider sx={{ width: '100%' }} />

                    <Box width="100%">
                        <Typography variant="h6" sx={{ mb: 2 }} gutterBottom>
                            📊 Attività
                        </Typography>
                        <Typography variant="body1">Codici pubblicati: </Typography>
                        <Typography variant="body1">Bonus stimati: €</Typography>

                        <Box sx={{ mt: 3, mb: 2 }}>
                            <Typography sx={{ fontSize: '18px', mb: 2 }} gutterBottom>
                                👁️ Visibilità: {visibilityLabel} ({Math.round(visibilityPercent)}%)
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
                                            visibilityPercent < 25 ? '#f44336' :
                                                visibilityPercent < 50 ? '#ff9800' :
                                                    visibilityPercent < 75 ? '#2196f3' :
                                                        '#4caf50'
                                    },
                                }}
                            />
                        </Box>
                    </Box>

                    <Divider sx={{ width: '100%' }} />

                    <Stack direction="row" spacing={3} sx={{ marginTop: '50px !important' }}>
                        <Button variant="outlined" color="error" onClick={handleLogout}>
                            Logout
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleDeleteAccount}>
                            Cancella account
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            <Footer />

        </>
    );
}
