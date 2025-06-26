import { Box, Button, IconButton, Link, Stack, Menu, MenuItem, ListItemIcon, ListItemText, Divider, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import dynamic from 'next/dynamic';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import router from "next/router";

import VerticalTabs from "@/components/common/TabPanel"
import BonusContainer from "../bonus/BonusContainer";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const UserReferral = dynamic(() => import('@/components/common/UserReferral'));
const UsedCodes = dynamic(() => import('@/components/common/UsedCodes'));

export default function DashboardLayoutDesktop({
    children,
    username,
    openAddCodeDialog
}: {
    children: ReactNode,
    username: string,
    openAddCodeDialog: () => void
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openP = Boolean(anchorEl);

    const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseProfile = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${apiUrl}/users/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.error('Errore durante logout');
        }
    };

    const tab = [
        { title: 'Tutti i codici', icon: <AssignmentIcon />, content: <BonusContainer /> },
        { title: 'I miei codici', icon: <AssignmentIcon />, content: <UserReferral /> },
        { title: 'Codici usati', icon: <AssignmentTurnedInIcon />, content: <UsedCodes /> },
    ];
    

    return (
        <Box>
            <Navbar>
                <Stack direction="row" spacing={2.5} sx={{ marginTop: '12px !important' }}>
                    <Button variant="contained" onClick={openAddCodeDialog} sx={{ color: 'white', height: '35px' }}>
                        Pubblica un codice
                    </Button>
                    {/* <Link href="/my-referral" color="inherit">I miei codici</Link>
                    <Link href="/dashboard" color="inherit">Tutte le offerte</Link> */}
                </Stack>

                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, alignSelf: 'flex-end', zIndex: 2, mt: -1, ml: 2, p: 1 }}>
                    <IconButton onClick={handleClickProfile} sx={{ ml: 2, p: 1 }}>
                        <AccountCircleIcon sx={{ fontSize: 40 }} />
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
                    anchorEl={anchorEl}
                    open={openP}
                    onClose={handleCloseProfile}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={handleCloseProfile}>
                        <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                        <ListItemText>Profilo</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { handleCloseProfile(); handleLogout(); }}>
                        <ListItemIcon><ExitToAppIcon fontSize="small" /></ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            </Navbar>

            <Box
                sx={{
                    mt: 5,
                }}
            >
                <VerticalTabs tabs={tab} />
            </Box>
            
            <Box>{children}</Box>
            <Footer />

        </Box>
    );
}
