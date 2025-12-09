'use client';

import {
    Box,
    Button,
    TextField,
    Typography,
    Link as MuiLink,
    CircularProgress
} from '@mui/material';
import router from 'next/router';
import { useState } from 'react';
import apiService from '@/components/scripts/apiService';

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
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: "grey.800",
            }}
        >
            {/* TITOLO LOGIN/SIGNUP */}
            <Typography sx={{ color: 'grey.300', fontSize: '1.4em', mb: 3 }}>
                {signinType === 'login' ? t('login') : t('signup')}
            </Typography>

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
                            sx={{ mb: 0.5 }}
                        />
                    )
                );
            })}

            {/* PRIVACY POLICY */}
            {signinType === 'signup' && (
                <Typography sx={{ color: "grey.400" }}>
                    {t('signup_privacy_prefix')}{' '}
                    <MuiLink href="/privacy" sx={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: '0px !important' }}>
                        {t('privacy_policy')}
                    </MuiLink>.
                </Typography>
            )}

            {/* BOTTONE INVIO */}
            <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    mt: 2,
                    position: 'relative',
                    p: 1
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
            {errorMessage && (
                <Typography sx={{ color: 'red' }}>
                    {errorMessage}
                </Typography>
            )}

        </Box>
    );
}
