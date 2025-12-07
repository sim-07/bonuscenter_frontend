'use client';

import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
    Autocomplete,
    InputAdornment,
    Link,
} from '@mui/material';

import EuroIcon from '@mui/icons-material/Euro';

import apiService from '../scripts/apiService';
import { useEffect, useState } from 'react';
import { bonusListData } from '../data/bonusListData';
import CustomizedSnackbar from './Snakbar';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

type AddCodeFormProps = {
    successAddCode: () => void;
    isAdd?: boolean;
    codeId?: string | null;
};

type SeveritySnakbarType = {
    severity?: 'success' | 'error' | 'warning' | 'info';
}

export default function AddCodeForm({ successAddCode, isAdd = true, codeId }: AddCodeFormProps) {

    const { t } = useTranslation('common');
    const { locale } = useRouter();

    const [formData, setFormData] = useState<{
        title: string;
        brand: string;
        bonus_value: string;
        code: string;
        description: string;
    }>({
        title: '',
        brand: '',
        bonus_value: '',
        code: '',
        description: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [severitySnakbar, setSeveritySnakbar] = useState<SeveritySnakbarType | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const formFields = [
        {
            name: 'title',
            label: t('title'),
            type: 'text',
            required: true,
        },
        {
            name: 'brand',
            label: t('select_brand'),
            type: 'autoComplete',
            required: true,
        },
        {
            name: 'bonus_value',
            label: t('bonus_value'),
            type: 'amount',
            required: true,
        },
        {
            name: 'code',
            label: t('code_or_link'),
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            label: t('description'),
            type: 'textArea',
            required: true,
        },
    ];

    const brandNameList = bonusListData.map((bonus) => {
        return bonus.title;
    })

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchCodeData = async () => {
            if (isAdd || !codeId) return;

            try {
                setIsLoading(true);

                const res = await apiService('codes', 'get_user_code', { code_id: codeId });

                const data = res.data?.[0];
                if (data) {
                    setFormData({
                        title: data.title || '',
                        brand: data.brand || '',
                        bonus_value: data.bonus_value || '',
                        code: data.code || '',
                        description: data.description || '',
                    });
                } else {
                    console.error(t('code_not_found'));
                }
            } catch (err: any) {
                console.error(t('error_fetching_code'), err.message || err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCodeData();
    }, [codeId, isAdd, t]);


    const resetForm = () => {
        setFormData({
            title: '',
            brand: '',
            bonus_value: '',
            code: '',
            description: ''
        });

        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        for (const field of formFields) {
            if (field.required && !formData[field.name as keyof typeof formData]) {
                setErrorMessage(t('field_required', { field: field.label }));
                return;
            }
        }

        setIsLoading(true);
        setErrorMessage('');

        const selectedBonus = bonusListData.find(
            (b) => b.title.toLowerCase() === formData.brand.toLowerCase()
        );

        const payload = {
            ...formData,
            name: selectedBonus ? selectedBonus.name : null,
            code_id: codeId ? codeId : null,
        };

        try {
            const res = await apiService(
                'codes',
                isAdd ? 'post_code' : 'update_code',
                payload
            );

            if (!res.error) {
                resetForm();
                successAddCode();
            } else {
                setSnackbarMessage(t("login_to_post_code"));
                setSeveritySnakbar({ severity: 'warning' });
                setSnackbarOpen(true);
            }


        } catch (err: any) {
            console.error(t('submit_error'), err);
            setErrorMessage(err.message || t('server_error'));
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
                {isAdd ? t('publish_code') : t('edit')}
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
                    case 'autoComplete':
                        return (
                            <Autocomplete
                                fullWidth
                                key={field.name}
                                options={brandNameList}
                                value={formData[field.name as keyof typeof formData] || ''}
                                sx={{
                                    width: '100%',
                                }}
                                onChange={(_, newValue) => handleChange(field.name, newValue || '')}
                                renderInput={(params) => (
                                    <TextField {...params} label={field.label} required={field.required} />
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

            <Typography>
                {t('not_found_brand')}{" "}
                <Link
                    sx={{
                        cursor: 'pointer',
                        color: 'primary.main'
                    }}
                    href={locale === 'it' ? '/it/suggest_new_code' : '/en/suggest_new_code'}
                >
                    {t('suggest_new_brand')}
                </Link>
            </Typography>

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
                    isAdd ? t('publish_code_btn') : t('edit_btn')
                )}
            </Button>

            {errorMessage && (
                <Typography sx={{ color: 'red' }}>{errorMessage}</Typography>
            )}

            <CustomizedSnackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                severity={severitySnakbar?.severity || 'success'}
            />
        </Box>
    );
}
