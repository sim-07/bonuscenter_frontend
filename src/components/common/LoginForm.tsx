'use client';

import {
    Box,
    Button,
    TextField,
    Typography,
    Link as MuiLink,
    CircularProgress,
    Divider,
    Stack,
} from '@mui/material';
import router from 'next/router';
import { useState } from 'react';
import apiService from '@/components/scripts/apiService';
import { supabase } from '@/lib/supabaseClient';
import { GoogleIcon } from '@/components/CustomIcons/CustomIcons';

import { useTranslation } from 'next-i18next';

type LoginFormProps = {
    signinTypeP: string;
};


export default function LoginForm({ signinTypeP }: LoginFormProps) {
    const { t } = useTranslation('login');

    const [signinType, setSigninType] = useState(signinTypeP); // "signup" o "login"
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const formField = [
        { name: 'email', label: 'Email', type: 'email', required: true, formType: ['signup'] },
        { name: 'username', label: 'Username', type: 'text', required: true, formType: ['login', 'signup'] },
        { name: 'password', label: 'Password', type: 'password', required: true, formType: ['login', 'signup'] },
    ];

    const handleChange = (label: string, value: string) => {
        setFormData((prev) => ({ ...prev, [label]: value }));
    };

    const resetForm = () => {
        setFormData({});
        setErrorMessage('');
    };

    const handleGoogleSignIn = async () => {
        await supabase.auth.signOut();
        if (typeof window !== 'undefined') {
            window.localStorage.clear();
        }

        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'select_account',
                },
            },
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        for (const field of formField) {
            if (field.formType.includes(signinType) && field.required && !formData[field.name]) {
                setErrorMessage(t('field_required', { field: field.label }));
                return;
            }
        }

        setIsLoading(true);

        try {
            await supabase.auth.signOut();
            if (typeof window !== 'undefined') {
                window.localStorage.clear();
            }

            const endpoint = signinType === 'login' ? 'login' : 'create_user';
            const data = await apiService("users", endpoint, formData);

            if (data.error) {
                setErrorMessage(data.error || t('server_error'));
                return;
            }

            resetForm();
            router.push('/dashboard');

        } catch (error: any) {
            console.log(error.message || error);
            setErrorMessage(error.message || t('server_error'));
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: "grey.800",
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}

            >
                {/* TITOLO LOGIN/SIGNUP */}
                <Typography sx={{ color: 'grey.200', fontSize: '1.7em', mb: 2 }}>
                    {signinType === 'login' ? t('login') : t('signup')}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* INPUT */}
                <Stack
                    direction={"column"}
                    gap={2}
                    sx={{
                        mt: 4,
                    }}
                >
                    {formField.map((field, index) => {
                        return (
                            field.formType.includes(signinType) && (
                                <TextField
                                    key={index}
                                    label={field.label}
                                    type={field.type}
                                    variant="outlined"
                                    value={formData[field.name] || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    required={field.required}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                        },
                                    }}
                                />
                            )
                        );
                    })}
                </Stack>

                <Stack direction={"column"} gap={1} sx={{ mt: 4 }}>


                    {/* BOTTONE INVIO */}
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            position: 'relative',
                            textTransform: 'none',
                            borderRadius: '12px',
                        }}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : signinType === 'login' ? t('login_upper') : t('signup_upper')}
                    </Button>


                    {/* SWITCH LOGIN/SIGNUP */}
                    <Typography sx={{ color: 'grey.400', display: 'inline-flex', alignItems: 'center', gap: 1, mt: 2 }}>
                        {signinType === 'login' ? (
                            <>
                                {t('no_account')}
                                <Button
                                    variant="text"
                                    sx={{ padding: 0, minWidth: 'auto', textTransform: 'none' }}
                                    onClick={() => setSigninType('signup')}
                                >
                                    {t('signup')}
                                </Button>
                            </>
                        ) : (
                            <>
                                {t('already_registered')}
                                <Button
                                    variant="text"
                                    sx={{ padding: 0, minWidth: 'auto', textTransform: 'none' }}
                                    onClick={() => setSigninType('login')}
                                >
                                    {t('login')}
                                </Button>
                            </>
                        )}
                    </Typography>
                </Stack>

                {errorMessage && (
                    <Typography sx={{ color: 'red' }}>
                        {errorMessage}
                    </Typography>
                )}

            </Box>

            {/* GOOGLE */}
            <Divider sx={{ color: "grey.200" }}>{t('or')}</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleGoogleSignIn}
                    startIcon={<GoogleIcon />}
                    sx={{
                        textTransform: 'none',
                        borderRadius: '12px',
                        py: 1.2
                    }}
                >
                    {signinType == "signup" ? t("signingoogle") : t("logingoogle")}
                </Button>
            </Box>

            {/* PRIVACY POLICY */}
            {signinType === 'signup' && (
                <Typography sx={{ color: "grey.400", mt: 2, fontSize: "14px" }}>
                    {t('signup_privacy_prefix')}{' '}
                    <MuiLink href="/privacy" sx={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: '0px !important', fontSize: "14px" }}>
                        {t('privacy_policy')}
                    </MuiLink>.
                </Typography>
            )}
        </Box>
    );
}
