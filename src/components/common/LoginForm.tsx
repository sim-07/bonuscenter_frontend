'use client';

import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    Link as MuiLink,
    CircularProgress
} from '@mui/material';
import router from 'next/router';
import { useState } from 'react';

type LoginFormProps = {
    signinTypeP: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function LoginForm({ signinTypeP }: LoginFormProps) {
    const [signinType, setSigninType] = useState(signinTypeP); // signup o login
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
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
        setAcceptedPrivacy(false);
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (signinType === 'signup' && !acceptedPrivacy) {
            alert("Per continuare accetta l'informativa sulla privacy");
            return;
        }

        for (const field of formField) {
            if (field.formType.includes(signinType) && field.required && !formData[field.name]) {
                console.log(formField)
                setErrorMessage(`Il campo "${field.label}" è obbligatorio`);
                return;
            }
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${apiUrl}/users/${signinType === 'login' ? 'login' : 'create_user'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                resetForm();
                router.push('/dashboard');
            } else {
                console.log(data.error);
                setErrorMessage(data.error || 'Server error');
            }
        } catch (error) {
            console.error('Errore di rete:', error);
        } finally {
            setIsLoading(false);
        }

        console.log('Dati inviati:', { ...formData, acceptedPrivacy, mode: signinType });

    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            {/* TITOLO LOGIN/SIGNUP */}
            <Typography sx={{ color: '#535353', fontSize: '1.4em', mb: 3 }}>
                {signinType === 'login' ? 'Accedi' : 'Crea un account'}
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
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={acceptedPrivacy}
                            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                            sx={{ width: '40px' }}
                        />
                    }
                    label={
                        <Typography>
                            Ho letto e accetto{' '}
                            <MuiLink href="/privacy" sx={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: '0px !important' }}>
                                l'informativa sulla privacy
                            </MuiLink>.
                        </Typography>
                    }
                />
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
                {isLoading ? <CircularProgress size={24} color="inherit" /> : signinType === 'login' ? 'ACCEDI' : 'REGISTRATI'}
            </Button>

            {/* SWITCH LOGIN/SIGNUP */}
            {signinType === 'login' ? (
                <Typography sx={{ color: '#535353', display: 'inline-flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    Non hai un account?
                    <Button
                        variant="text"
                        sx={{ padding: 0, minWidth: 'auto', textTransform: 'none' }}
                        onClick={() => setSigninType('signup')}
                    >
                        Sign up
                    </Button>
                </Typography>
            ) : (
                <Typography sx={{ color: '#535353', display: 'inline-flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    Sei già registrato?
                    <Button
                        variant="text"
                        sx={{ padding: 0, minWidth: 'auto', textTransform: 'none' }}
                        onClick={() => setSigninType('login')}
                    >
                        Login
                    </Button>
                </Typography>
            )}

            {errorMessage && (
                <Typography sx={{ color: 'red' }}>
                    {errorMessage}
                </Typography>
            )}

        </Box>
    );
}
