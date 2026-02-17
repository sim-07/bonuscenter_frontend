import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

import NextLink from 'next/link';

import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import React from "react";
import DialogComponent from "../common/DialogComponent";
import LoadingSpinner from "../common/LoadingSpinner";
import CustomizedSnackbar from "../common/Snakbar";
import apiService from '@/components/scripts/apiService';
import AddCodeForm from "../common/AddCodeForm";

import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "next-i18next";
import LoginForm from "../common/LoginForm";


interface AllReferralProps {
    bonusName: string;
}

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
    visibility?: number;
    created_at: string;
};

type SeveritySnakbarType = {
    severity?: 'success' | 'error' | 'warning' | 'info';
}

export default function AllReferral({ bonusName }: AllReferralProps) {
    const { t } = useTranslation('common');
    const { locale } = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [allReferralData, setAllReferralData] = useState<ReferralType[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReferral, setSelectedReferral] = useState<ReferralType | null>(null);
    const [snakbarMessage, setSnakbarMessage] = useState('');
    const [severitySnakbar, setSeveritySnakbar] = useState<SeveritySnakbarType | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openCodeDialog, setOpenCodeDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [username, setUsername] = useState<string | null>(null);

    const [openLogin, setOpenLogin] = useState(false);

    const openLoginDialog = () => {
        setOpenLogin(true);
    };

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


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await apiService("users", "get_user_data", {});
                if (res.error) {
                    //console.error("Error get_user_data: ", res.error);
                }
                if (res.data) {
                    setUsername(res.data[0].username);
                }

            } catch (error: any) {
                console.error(error.message || error);
            }
        }

        fetchUserData();

    }, [])

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedReferral(null);
    };

    const copyCode = async (code: string) => {
        setOpenSnackbar(true);

        try {
            await navigator.clipboard.writeText(code);
            setSnakbarMessage(t("code_copied"));
            setSeveritySnakbar({ severity: 'success' });
        } catch (err) {
            setSnakbarMessage(t("code_copy_error"));
            setSeveritySnakbar({ severity: 'error' });
        }
    };

    useEffect(() => {
        const getAllReferral = async () => {
            try {

                const res = await apiService("codes", "get_codes_by_bonus", { name: bonusName })

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

    const successAddCode = () => {
        setOpenCodeDialog(false);
        setSnackbarMessage(t('code_succesfully_added'));
        setSnackbarOpen(true);
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <Box
                sx={{
                    backgroundColor: "grey.800",
                    p: 4,
                    borderRadius: '12px',
                    minWidth: "350px",
                    maxWidth: "450px",
                    height: 'auto',
                    overflow: 'hidden'
                }}
            >
                <Stack
                    direction={'row'}
                >
                    <Typography sx={{ margin: 2, fontSize: "25px" }}>
                        {t('community_codes')}
                    </Typography>

                    <IconButton
                        onClick={() => setOpenCodeDialog(true)}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            height: '40px',
                            width: '40px',
                            mt: 2,
                            ml: 1,
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Stack>

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
                            {t('no_codes')}
                        </Typography>
                    </Box>
                ) : (
                    <List
                        sx={{
                            width: "100%",
                            bgcolor: "grey.800",
                            overflowY: 'auto',
                            height: '300px'
                        }}>
                        {allReferralData.map((referral) => (
                            <React.Fragment key={referral.code_id}>
                                <ListItem
                                    sx={{
                                        maxHeight: '100px',
                                        cursor: "pointer",
                                        overflow: 'hidden'
                                    }}
                                    alignItems="flex-start"
                                    onClick={(e) => {
                                        if ((e.target as HTMLElement).closest('a')) {
                                            return;
                                        }
                                        handleOpenDialog(referral);
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt={referral.username} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Link
                                                component={NextLink}
                                                href={locale === 'it' ? `/it/user?u=${referral.username}` : `/en/user?u=${referral.username}`}
                                                underline="hover"
                                                sx={{ color: 'primary.main', cursor: 'pointer' }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {referral.username}
                                            </Link>
                                        }
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
                        <Box sx={{ color: "grey.200", maxHeight: "70vh", overflowY: "auto" }}>
                            <Stack
                                direction={'column'}
                                spacing={5}
                            >
                                <Stack
                                    direction={'row'}
                                    spacing={2}
                                    sx={{
                                        mb: 3,
                                        backgroundColor: "grey.700",
                                        p: 3,
                                        borderRadius: 2
                                    }}
                                >
                                    <Avatar alt={selectedReferral.username} />
                                    <Link
                                        component={NextLink}
                                        href={locale === 'it' ? `/it/user?u=${selectedReferral.username}` : `/en/user?u=${selectedReferral.username}`}
                                        underline="hover"
                                        sx={{ color: 'primary.main', cursor: 'pointer', marginTop: "7px !important" }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {selectedReferral.username}
                                    </Link>

                                </Stack>
                                <Typography>
                                    {selectedReferral.created_at.split('T')[0]}
                                </Typography>

                                <Divider />

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

                                <Divider />

                                <Button
                                    variant="contained"
                                    sx={{
                                        color: "white"
                                    }}
                                    onClick={() => copyCode(selectedReferral.code)}
                                >
                                    {t("copy_code")}
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

                <DialogComponent open={openCodeDialog} onClose={() => setOpenCodeDialog(false)}>
                    {
                        username ? (
                            <AddCodeForm successAddCode={successAddCode} />
                        ) : (
                            <LoginForm signinTypeP={"signup"} />
                        )
                    }
                </DialogComponent>

                <CustomizedSnackbar
                    open={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                />

                <Divider sx={{ m: 2 }} />

                {locale == "it" ? (
                    <Box sx={{ mt: 2, color: "#737373" }}>
                        <InfoOutlineIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5, mt: '-6px' }} />
                        Usa i codici degli altri per aumentare la visibilità dei tuoi. Più partecipi, più visibilità ottieni.{' '}
                        {username ? (
                            <>
                                Controlla <Link href="/profile" underline="hover">qui</Link> la visibilità dei tuoi codici.
                            </>
                        ) : (
                            <>
                                <Typography>
                                    Per iniziare subito, <Typography component="span" onClick={openLoginDialog} sx={{ color: "primary.main", cursor: "pointer" }}>crea un account!</Typography>
                                </Typography>
                            </>
                        )}
                    </Box>
                ) : (
                    <Box sx={{ mt: 2, color: "#737373" }}>
                        <InfoOutlineIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5, mt: '-6px' }} />
                        Use other users' codes to increase the visibility of your own. The more you participate, the more exposure your codes get.{' '}
                        {username ? (
                            <>
                                Check your codes' visibility <Link href="/profile" underline="hover">here</Link>.
                            </>
                        ) : (
                            <>
                                <Typography>
                                    To get started, <Typography component="span" onClick={openLoginDialog} sx={{ color: "primary.main", cursor: "pointer" }}>create an account!</Typography>
                                </Typography>
                            </>
                        )}
                    </Box>
                )}

            </Box>

            <DialogComponent open={openLogin} onClose={() => setOpenLogin(false)} variant="form">
                <LoginForm signinTypeP={"signup"} />
            </DialogComponent>

        </>
    );
}