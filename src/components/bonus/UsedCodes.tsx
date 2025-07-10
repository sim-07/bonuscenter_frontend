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

export default function UsedCodes() {
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
                console.log(res);
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
                        alignContent: 'center'
                    }}
                >
                    <LoadingSpinner />

                </Box>
            ) : (
                <Box p={2}>
                    <Typography variant="h6" gutterBottom>
                        Codici utilizzati
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Brand</strong></TableCell>
                                    <TableCell><strong>Valore Bonus</strong></TableCell>
                                    <TableCell><strong>Confermato</strong></TableCell>
                                    <TableCell><strong>Data utilizzo</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usedCodes.map((code, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{code.brand}</TableCell>
                                        <TableCell>{code.bonus_value}€</TableCell>
                                        <TableCell>
                                            {code.confirmed ? 'Sì' : 'No'}
                                        </TableCell>
                                        <TableCell>{new Date(code.created_at).toLocaleString()}</TableCell>
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
