'use client';

import { Box, Button, Typography, Avatar, Stack, Divider, LinearProgress, IconButton, Link, TextField, InputAdornment, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EuroIcon from '@mui/icons-material/Euro';

import apiService from '@/components/scripts/apiService';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';
import CustomizedSnackbar from '@/components/common/Snakbar';

type SeveritySnakbarType = {
    severity?: 'success' | 'error' | 'warning' | 'info';
}

export default function SuggestNewCode() {
    const router = useRouter();

    const [formData, setFormData] = useState<{
        bonus_name: string;
        bonus_description: string;
        bonus_value: string;
        note: string;
    }>({
        bonus_name: '',
        bonus_description: '',
        bonus_value: '',
        note: ''
    });
    const [severitySnakbar, setSeveritySnakbar] = useState<SeveritySnakbarType | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const formFields = [
        {
            name: 'bonus_name',
            label: 'Nome del brand',
            type: 'text',
            required: true,
        },
        {
            name: 'bonus_value',
            label: 'Premio bonus',
            type: 'amount',
            required: true,
        },
        {
            name: 'bonus_description',
            label: 'Descrizione e requisiti bonus (opzionale)',
            type: 'textArea',
            required: false,
        },
        {
            name: 'note',
            label: 'Note (opzionale)',
            type: 'textArea',
            required: false,
        },
    ];

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await apiService('codes', 'suggest_new_bonus', formData);
            setIsLoading(true);

            if (res.error) {
                setSeveritySnakbar({ severity: 'error' });
                setSnackbarOpen(true);
                setSnackbarMessage("Si è verificato un errore, prova più tardi")
                return;
            } else {
                setSeveritySnakbar({ severity: 'success' });
                setSnackbarOpen(true);
                setSnackbarMessage("Suggerimento inviato con succeso! Verrà esaminato il prima possibile")
            }

        } catch (err) {
            console.error('Errore nel caricamento del profilo');
            router.push('/');
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            <Head>
                <title>Bonuscenter</title>
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
                <Link href='/dashboard'>
                    <IconButton>
                        <ArrowBackIcon sx={{ fontSize: '30px' }} />
                    </IconButton>
                </Link>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        m: '40px 0px'
                    }}
                >

                    <Typography sx={{ color: '#535353', fontSize: '1.4em', mb: 3 }}>
                        Suggerisci nuovo brand
                    </Typography>

                    {formFields.map((field) => {
                        switch (field.type) {
                            case 'text':
                                return (
                                    <TextField
                                        key={field.name}
                                        label={field.label}
                                        type={field.type}
                                        variant="outlined"
                                        value={formData[field.name as keyof typeof formData]}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        required={field.required}
                                        sx={{ mb: 0.5 }}
                                    />
                                )
                            case 'amount':
                                return (
                                    <TextField
                                        key={field.name}
                                        label={field.label}
                                        variant="outlined"
                                        type="text"
                                        inputMode="decimal"
                                        value={formData[field.name as keyof typeof formData]}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*\.?\d{0,2}$/.test(value)) {
                                                handleChange(field.name, value);
                                            }
                                        }}
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <EuroIcon />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                    />
                                )

                            case 'textArea':
                                return (
                                    <TextField
                                        key={field.name}
                                        label={field.label}
                                        type={field.type}
                                        variant="outlined"
                                        value={formData[field.name as keyof typeof formData]}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        required={field.required}
                                        sx={{ mb: 0.5 }}
                                        multiline
                                        rows={4}
                                    />
                                )

                            default:
                                return null;
                        }
                    })}

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            mt: 2,
                            position: 'relative',
                            p: 1,
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'INVIA'
                        )}
                    </Button>

                </Box>

            </Box>

            <Footer />

            <CustomizedSnackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                severity={severitySnakbar?.severity || 'success'}
            />

        </>
    );
}
