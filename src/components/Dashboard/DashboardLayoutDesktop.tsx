import { Box, Button, IconButton, Link, Stack, Menu, MenuItem, ListItemIcon, ListItemText, Divider, Typography, Avatar } from "@mui/material";
import { ReactNode, useState } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications'

import Navbar from "../Home/Navbar";
import router from "next/router";

import VerticalTabs from "@/components/common/VerticalTab"
import BonusContainer from "../bonus/BonusContainer";
import apiService from "../scripts/apiService";
import NotificationList from "../common/NotificationList";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const UserReferral = dynamic(() => import('@/components/common/UserReferral'));
const UsedCodes = dynamic(() => import('@/components/common/UsedCodes'));

export default function DashboardLayoutDesktop({
    username,
    openAddCodeDialog
}: {
    username: string,
    openAddCodeDialog: () => void
}) {
    const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);
    const [anchorElNotification, setAchorElNotification] = useState<null | HTMLElement>(null);
    const openP = Boolean(anchorElProfile);
    const openN = Boolean(anchorElNotification);

    const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleCloseProfile = () => {
        setAnchorElProfile(null);
    };

    const handleClickNotification = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAchorElNotification(event.currentTarget);
    };

    const handleCloseNotification = () => {
        setAchorElNotification(null);
    };

    const handleLogout = async () => {
        try {
            const res = await apiService('users', 'logout', {});

            if (!res.error) {
                router.push('/');
            } else {
                console.error("Error during logout");
            }
        } catch (error) {
            console.error('Errore durante il logout:', error);
        }
    };

    const tab = [
        { title: 'Tutti i codici', icon: <AssignmentIcon />, content: <BonusContainer width="98%" /> },
        { title: 'I miei codici', icon: <AssignmentIcon />, content: <UserReferral /> },
        { title: 'Codici usati', icon: <AssignmentTurnedInIcon />, content: <UsedCodes /> },
    ];


    return (
        <Box>
            <Navbar>
                <Stack direction="row" spacing={2.5} sx={{ marginTop: '12px !important' }}>
                    <IconButton
                        onClick={openAddCodeDialog}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            height: '40px',
                            width: '40px',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                        }}
                    >
                        <AddIcon />
                    </IconButton>

                    <IconButton
                        onClick={handleClickNotification}
                        sx={{ bgcolor: 'grey.200', color: 'text.primary', height: '40px', width: '40px' }}
                    >
                        <NotificationsIcon />
                    </IconButton>
                </Stack>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, alignSelf: 'flex-end', zIndex: 2, mt: -1, ml: 2, p: 1 }}>
                    <IconButton onClick={handleClickProfile} sx={{ ml: 2, p: 1 }}>
                        <Avatar sx={{ fontSize: 40 }} />
                    </IconButton>
                    <Box
                        component="span"
                        sx={{
                            fontSize: '1.1em',
                            fontWeight: 500,
                            color: 'text.primary',
                            maxWidth: 120,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {username}
                    </Box>
                </Box>

                <Menu
                    anchorEl={anchorElProfile}
                    open={openP}
                    onClose={handleCloseProfile}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem
                        onClick={() => {
                            handleCloseProfile();
                            router.push('/profile');
                        }}
                    >
                        <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                        <ListItemText>Profilo</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { handleCloseProfile(); handleLogout(); }}>
                        <ListItemIcon><ExitToAppIcon fontSize="small" /></ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>


                <Menu
                    anchorEl={anchorElNotification}
                    open={openN}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <NotificationList compact={true} max={10}/>
                </Menu>
            </Navbar>

            <Box
                sx={{
                    mt: 5,
                }}
            >
                <VerticalTabs tabs={tab} />
            </Box>

        </Box>
    );
}
