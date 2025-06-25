'use client';

import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
    Autocomplete,
    AutocompleteRenderInputParams,
} from '@mui/material';
import router from 'next/router';
import { useState } from 'react';
import { bonusListData } from '../data/bonusListData';

type AddCodeFormProps = {
    successAddCode: () => void;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AddCodeForm({ successAddCode }: AddCodeFormProps) {
    const [formData, setFormData] = useState<{
        title: string;
        brand: string;
        bonus_value: string;
        code: string;
        desctiption: string;
    }>({
        title: '',
        brand: '',
        bonus_value: '',
        code: '',
        desctiption: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const formFields = [
        {
            name: 'title',
            label: 'Titolo',
            type: 'text',
            required: true,
        },
        {
            name: 'brand',
            label: 'Seleziona brand',
            type: 'autoComplete',
            required: true,
        },
        {
            name: 'bonus_value',
            label: 'Valore bonus',
            type: 'text',
            required: true,
        },
        {
            name: 'code',
            label: 'Codice/Link',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            label: 'Descrizione',
            type: 'textArea',
            required: true,
        },
    ];

    const brandList = bonusListData.map((bonus) => {
        return bonus.title;
    })

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            title: '',
            brand: '',
            bonus_value: '',
            code: '',
            desctiption: ''
        });
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        for (const field of formFields) {
            if (field.required && !formData[field.name as keyof typeof formData]) {
                setErrorMessage(`Il campo "${field.label}" è obbligatorio`);
                return;
            }
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch(
                `${apiUrl}/codes/post_code`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();
            if (response.ok) {
                resetForm();
                successAddCode();
            } else {
                setErrorMessage(data.error || 'Errore del server');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Errore di rete');
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
            }}
        >
            <Typography sx={{ color: '#535353', fontSize: '1.4em', mb: 3 }}>
                Pubblica un codice
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
                    case 'autoComplete':
                        return (
                            <Autocomplete
                                key={field.name}
                                disablePortal
                                options={brandList}
                                value={formData[field.name as keyof typeof formData] || ''}
                                onChange={(_, newValue) => handleChange(field.name, newValue || '')}
                                renderInput={(params) => (
                                    <TextField {...params} label="Brand" required={field.required} />
                                )}
                            />
                        );
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
                    'PUBBLICA CODICE'
                )}
            </Button>

            {errorMessage && (
                <Typography sx={{ color: 'red' }}>{errorMessage}</Typography>
            )}
        </Box>
    );
}
