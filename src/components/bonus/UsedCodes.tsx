'use client';

import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import apiService from '@/components/scripts/apiService';
import LoadingSpinner from '../common/LoadingSpinner';
import { useTranslation } from 'next-i18next';

export default function UsedCodes() {
    const { t } = useTranslation('common');
    const [usedCodes, setUsedCodes] = useState<Array<{
        brand: string;
        bonus_value: string;
        confirmed: boolean;
        created_at: string;
    }>>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsedCodes = async () => {
            try {
                setLoading(true);
                const res = await apiService("used_codes", "get_used_code");
                setUsedCodes(res.data);
            } catch (error) {
                console.error("Error get_used_code: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsedCodes();
    }, [])

    return (
        <Box>
            {loading ? (
                <Box
                    sx={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <LoadingSpinner />
                </Box>
            ) : usedCodes.length === 0 ? (
                <Box
                    sx={{
                        width: '100%',
                        height: '60vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" color="text.secondary">
                        {t('no_used_codes')}
                    </Typography>
                </Box>
            ) : (
                <Box p={2}>
                    <Typography variant="h6" gutterBottom>
                        {t('used_codes')}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>{t('brand')}</strong></TableCell>
                                    <TableCell><strong>{t('bonus_value')}</strong></TableCell>
                                    <TableCell><strong>{t('confirmed')}</strong></TableCell>
                                    <TableCell><strong>{t('usage_date')}</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usedCodes.map((code, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{code.brand}</TableCell>
                                        <TableCell>{code.bonus_value}</TableCell>
                                        <TableCell>{code.confirmed ? t('yes') : t('no')}</TableCell>
                                        <TableCell>{new Date(code.created_at).toLocaleDateString('it-IT')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
}
