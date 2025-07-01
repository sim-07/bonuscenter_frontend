import React, { useEffect, useState } from 'react';
import { Box, Grid, Pagination, Stack, Typography, Dialog } from '@mui/material';
import BonusCard from './BonusCard';
import DialogComponent from '../common/DialogComponent';
import AddCodeForm from '../common/AddCodeForm';
import CustomizedSnackbar from '../common/Snakbar';
import apiService from '../scripts/apiService';

import { bonusListData } from '../data/bonusListData';

interface BonusItem {
    code_id?: string;
    name: string,
    title: string;
    description: string;
    bonus_value: string;
    image: string;
}

interface BonusListProps {
    bonusListDataP: BonusItem[];
    edit?: boolean;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BonusList({ bonusListDataP, edit = false }: BonusListProps) {
    const [page, setPage] = React.useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [selectedCodeId, setSelectedCodeId] = useState<string | null>(null);
    const [itemsPage, setItemsPage] = useState(bonusListDataP);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const itemsPageNum = 12;

    useEffect(() => {
        const startIndex = (page - 1) * itemsPageNum;
        const endIndex = startIndex + itemsPageNum;
        setItemsPage(bonusListDataP.slice(startIndex, endIndex));
    }, [page, bonusListDataP]);

    const closeBonusCardSnakbar = () => {
        setSnackbarOpen(false);
    }

    const closeBonusCardDialog = () => {
        setOpenDialog(false);
    }

    const successEditCode = async () => {
        setOpenDialog(false);
        setSnackbarMessage("Il tuo codice è stato aggiornato!");
        setSnackbarOpen(true);

        try {
            const res = await apiService('codes', 'get_user_codes');

            const userReferralWithImg = res.data.map((ref: any) => {

                console.log("bonusListDataP: ", bonusListDataP)
                const selectedBonus = bonusListData.find(
                    (b) => b.name.toLowerCase() === ref.name.toLowerCase()
                );

                // console.log("sELECTEDBONUS: ", selectedBonus)

                return {
                    ...ref,
                    image: selectedBonus?.image,
                };
            });
            console.log("USERREFERRALWITHIMG: ", userReferralWithImg)
            setItemsPage(userReferralWithImg);

        } catch (err: any) {
            console.error('Errore nel recupero dei codici:', err.message || err);
        }
    };

    const editCode = () => {
        setOpenDialog(true);
    }

    const deleteCode = async (code_id: string) => {
        try {
            const res = await fetch(`${apiUrl}/codes/delete_code`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ code_id: code_id }),
            });
            if (res.ok) {
                setSnackbarOpen(true);
                setSnackbarMessage("Codice eliminato con successo")
            } else {
                console.error("Errore eliminando il codice")
            }
        } catch (err) {
            console.error("Errore eliminando il codice")
        }
    };

    return (
        <Box
            sx={{
                mt: 4,
                mb: 4,
                paddingRight: 5,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '70vh',
                width: '100%'
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    width: '100%'
                }}
            >
                <Grid
                    container
                    spacing={4}
                    columns={{ xs: 4, sm: 6, md: 9, lg: 12 }}
                    sx={{
                        margin: 0,
                        justifyContent: 'center',
                        padding: '10px !important',
                    }}
                >
                    {itemsPage.map((bonus, index) => (
                        <Grid key={index} size={{ xs: 4, sm: 3, md: 3, lg: 3 }}>
                            <BonusCard
                                code_id={bonus.code_id}
                                name={bonus.name}
                                title={bonus.title}
                                description={bonus.description}
                                image={bonus.image}
                                bonus_value={bonus.bonus_value}
                                edit={edit}
                                editCode={editCode}
                                deleteCode={deleteCode}
                                setSelectedCodeId={setSelectedCodeId}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Stack
                sx={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    pt: 5,
                }}
            >
                <Pagination
                    count={Math.ceil(bonusListDataP.length / itemsPageNum)}
                    page={page}
                    onChange={handleChange}
                />
            </Stack>

            {edit && (
                <>
                    <DialogComponent open={openDialog} onClose={closeBonusCardDialog}>
                        <AddCodeForm successAddCode={successEditCode} isAdd={false} codeId={selectedCodeId} />
                    </DialogComponent>

                    <CustomizedSnackbar
                        open={snackbarOpen}
                        onClose={closeBonusCardSnakbar}
                        message={snackbarMessage || ''}
                    />
                </>
            )}
        </Box>
    );
}