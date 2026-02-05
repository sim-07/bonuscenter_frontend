import React, { useEffect, useState } from 'react';
import { Box, Pagination, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import BonusCard from './BonusCard';
import DialogComponent from '../common/DialogComponent';
import AddCodeForm from '../common/AddCodeForm';
import CustomizedSnackbar from '../common/Snakbar';
import apiService from '../scripts/apiService';

import { useTranslation } from 'next-i18next';

import { BonusItem } from '@/types/bonusTypes';

import { bonusListData } from '../data/bonusListData';

interface BonusListProps {
    bonusListDataP: BonusItem[];
    edit?: boolean;
    locale?: string;
}

export default function BonusList({ bonusListDataP, edit = false, locale = 'en' }: BonusListProps) {
    const [page, setPage] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [selectedCodeId, setSelectedCodeId] = useState<string | null>(null);
    const [itemsPage, setItemsPage] = useState(bonusListDataP);
    const [bonusViews, setBonusViews] = useState<{ [key: string]: number }>({});

    const { t } = useTranslation('common'); 


    useEffect(() => {

        const getViews = async () => {
            try {
                const res = await apiService('bonuses', 'get_views');
                
                if (res.error || !res.data || res.data.length === 0) {
                    console.error("Getviews error: ", res.error)
                    return;
                }
                
                let formattedData = res.data.reduce((acc: any, e: any) => {
                    acc[e.bonus_name] = e.views;
                    return acc;
                }, {})

                setBonusViews(formattedData);
                
            } catch (err) {
                console.error('Error getviews:', err);
            }
        }

        getViews();
    }, [])




    const itemsPageNum = 15;

    useEffect(() => {
        const startIndex = (page - 1) * itemsPageNum;
        const endIndex = startIndex + itemsPageNum;
        setItemsPage(bonusListDataP.slice(startIndex, endIndex));
    }, [page, bonusListDataP]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const closeBonusCardSnakbar = () => {
        setSnackbarOpen(false);
    };

    const closeBonusCardDialog = () => {
        setOpenDialog(false);
    };

    const successEditCode = async () => {
        setOpenDialog(false);
        setSnackbarMessage(t("code_successfully_updated"));
        setSnackbarOpen(true);
    
        try {
            const res = await apiService('codes', 'get_user_codes');
    
            const userReferralWithImg = res.data.map((ref: any) => {
                const selectedBonus = bonusListData.find(
                    (b) => b.name.toLowerCase() === ref.name.toLowerCase()
                );
                return {
                    ...ref,
                    image: selectedBonus?.image,
                };
            });
            setItemsPage(userReferralWithImg);
    
        } catch (err: any) {
            console.error('Errore nel recupero dei codici:', err.message || err);
        }
    };

    const editCode = () => {
        setOpenDialog(true);
    };

    const deleteCode = async (code_id: string) => {
        try {
            const res = await apiService("codes", "delete_code", { code_id: code_id });
            if (!res.error) {
                setSnackbarOpen(true);
                setSnackbarMessage(t("code_successfully_deleted"));
            } else {
                console.error("Errore eliminando il codice");
            }
        } catch (err) {
            console.error("Errore eliminando il codice");
        }
    };

    return (
        <Box
            sx={{
                mt: 4,
                mb: 4,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '70vh',
                width: '100%'
            }}
        >
            <Box sx={{ flex: 1, width: '100%' }}>
                <Grid
                    container
                    spacing={2}
                    columns={{ xs: 4, sm: 6, md: 9, lg: 12, xl: 10 }}
                    sx={{ margin: 0, justifyContent: 'center', padding: '10px !important' }}
                >
                    {itemsPage.map((bonus, index) => (
                        <Grid key={index} size={{ xs: 4, sm: 3, md: 3, lg: 3, xl: 2 }}>
                            <BonusCard
                                code_id={bonus.code_id}
                                name={bonus.name}
                                title={bonus.title}
                                description={bonus.description}
                                image={bonus.image}
                                bonus_value={bonus.bonus_value}
                                edit={edit}
                                category={bonus.category}
                                active={bonus.active}
                                views={bonusViews[bonus.name]}
                                editCode={editCode}
                                deleteCode={deleteCode}
                                setSelectedCodeId={setSelectedCodeId}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Stack sx={{ justifyContent: 'center', alignSelf: 'center', pt: 5 }}>
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
