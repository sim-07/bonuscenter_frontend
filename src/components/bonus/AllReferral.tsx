import {
    Avatar,
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import router from "next/router";
import React from "react";
import DialogComponent from "../common/DialogComponent";
import LoadingSpinner from "../common/LoadingSpinner";
import CustomizedSnackbar from "../common/Snakbar";
import apiService from '@/components/scripts/apiService';


interface AllReferralProps {
    bonusName: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type ReferralType = {
    code_id: string;
    user_id: string;
    username: string;
    title: string;
    brand: string;
    name: string;
    code: string;
    description: string;
    bonus_value: string;
    created_at: string;
};

type SeveritySnakbarType = {
    severity?: 'success' | 'error' | 'warning' | 'info';
}

export default function AllReferral({ bonusName }: AllReferralProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [allReferralData, setAllReferralData] = useState<ReferralType[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReferral, setSelectedReferral] = useState<ReferralType | null>(null);
    const [snakbarMessage, setSnakbarMessage] = useState('');
    const [severitySnakbar, setSeveritySnakbar] = useState<SeveritySnakbarType | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const handleOpenDialog = async (referral: ReferralType) => {
        setSelectedReferral(referral);
        setOpenDialog(true);

        try {
            const resSetUsedCodes = await apiService("used_codes", "set_used_code", {
                code_id: referral.code_id,
                created_by: referral.user_id,
                bonus_name: referral.name,
                bonus_value: referral.bonus_value,
                bonus_code: referral.code,
                brand: referral.brand,
            });
            if (resSetUsedCodes.error || !resSetUsedCodes.used_by) {
                console.error("Error set_used_code: ", resSetUsedCodes.error);
            } else {

                try {
                    const res = await apiService("notification", "create_notification", {
                        receiver: referral.user_id,
                        code_id: referral.code_id,
                        type: "used_code",

                    });
                    if (res.error) {
                        console.error("Error create_notification: ", res.error);
                    }
                } catch (error: any) {
                    console.error(error.message || error);
                }

            }
        } catch (error: any) {
            console.error(error.message || error);
        }

    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedReferral(null);
    };

    const copyCode = async (code: string) => {
        setOpenSnackbar(true);

        try {
            await navigator.clipboard.writeText(code);
            setSnakbarMessage("Il codice è stato copiato negli appunti!");
            setSeveritySnakbar({ severity: 'success' });
        } catch (err) {
            setSnakbarMessage("Errore durante la copia del codice");
            setSeveritySnakbar({ severity: 'error' });
        }
    };

    useEffect(() => {
        const getAllReferral = async () => {
            try {

                const res = await apiService("codes", "get_all_referral_codes", { name: bonusName })

                if (!res.error) {
                    setAllReferralData(res.data);
                } else {
                    console.error("Errore getAllReferral");
                }
            } catch (err) {
                router.push("/");
            } finally {
                setIsLoading(false);
            }
        };

        getAllReferral();
    }, [bonusName]);

    if (isLoading) return <LoadingSpinner />;

    return (
        <Box
            sx={{
                backgroundColor: "grey.100",
                p: 1,
                borderRadius: '12px',
                height: 300,
                overflow: "scroll",
                minWidth: "410px",
            }}
        >
            <Typography sx={{ margin: 2, fontSize: "25px" }}>
                Codici della community
            </Typography>
            <Divider />
            {allReferralData.length === 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                    }}
                >
                    <Typography color="text.secondary">
                        Nessun codice al momento.
                    </Typography>
                </Box>
            ) : (
                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "gray.100" }}>
                    {allReferralData.map((referral) => (
                        <React.Fragment key={referral.code_id}>
                            <ListItem
                                alignItems="flex-start"
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleOpenDialog(referral)}
                            >
                                <ListItemAvatar>
                                    <Avatar alt={referral.username} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={referral.username}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ color: "text.primary", display: "inline" }}
                                            >
                                                {`${referral.title}: `}
                                            </Typography>
                                            {referral.description}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            )}

            <DialogComponent open={openDialog} onClose={handleCloseDialog}>
                {selectedReferral && (
                    <Box sx={{ p: 2 }}>
                        <Stack
                            direction={'column'}
                            spacing={5}
                        >
                            <Stack
                                direction={'row'}
                                spacing={2}
                                sx={{
                                    mb: 3
                                }}
                            >
                                <Avatar alt={selectedReferral.username} />
                                <Typography sx={{ mt: '4px !important' }}>{selectedReferral.username}</Typography>

                            </Stack>
                            <Typography
                                variant="h5"
                                sx={{ marginBottom: '30px' }}
                            >
                                {selectedReferral.title}
                            </Typography>

                            <Typography>
                                <Box component="span" fontWeight="bold">Valore bonus:</Box> {selectedReferral.bonus_value}
                            </Typography>

                            <Typography>
                                {selectedReferral.description}
                            </Typography>

                            <Typography>
                                <Box component="span" fontWeight="bold">Codice:</Box> {selectedReferral.code}
                            </Typography>

                            <Button
                                variant="contained"
                                sx={{
                                    color: "white"
                                }}
                                onClick={() => copyCode(selectedReferral.code)}
                            >
                                Copia codice
                            </Button>
                        </Stack>

                    </Box>
                )}
            </DialogComponent>
            <CustomizedSnackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={snakbarMessage}
                severity={severitySnakbar?.severity}
            />
        </Box>
    );
}
