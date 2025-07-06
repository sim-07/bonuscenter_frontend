import { ReactNode, useState } from "react";
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Stack } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import AddIcon from '@mui/icons-material/Add';

import Navbar from "../Home/Navbar";
import DrawerMenu from "../common/DrawerMenu";
import router from "next/router";
import BonusContainer from "../bonus/BonusContainer";
import UserReferral from "../common/UserReferral";
import UsedCodes from "../common/UsedCodes";
import apiService from "../scripts/apiService";

const listMenu = [
    { text: 'Profilo', icon: <PersonIcon />, route: '/profile' },
    { text: 'Tutti i codici', icon: <AssignmentIcon />, component: <BonusContainer /> },
    { text: 'I miei codici', icon: <AssignmentAddIcon />, component: <UserReferral /> },
    { text: 'Codici usati', icon: <AssignmentTurnedInIcon />, component: <UsedCodes /> },
];

export default function DashboardLayoutMobile({
    username,
    openAddCodeDialog
}: {
    username: string,
    openAddCodeDialog: () => void
}) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [activeTab, setActiveTab] = useState(1);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
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

    return (
        <Box>
            <Navbar>

                <Stack direction={'row'}>
                    <IconButton onClick={toggleDrawer(true)} sx={{ alignSelf: 'start', m: 2, zIndex: 2 }}>
                        <MenuIcon />
                    </IconButton>

                    <IconButton
                        onClick={openAddCodeDialog}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            height: '40px',
                            width: '40px',
                            marginTop: '15px',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Stack>
                <DrawerMenu open={openDrawer} toggleDrawer={toggleDrawer}>
                    <List>
                        {listMenu.map((tab, index) => (
                            <ListItem key={tab.text} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        if (tab.route) {
                                            router.push(tab.route);
                                        } else {
                                            setActiveTab(index);
                                        }
                                        setOpenDrawer(false);
                                    }}
                                >
                                    <ListItemIcon>{tab.icon}</ListItemIcon>
                                    <ListItemText primary={tab.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider sx={{ m: 2 }} />
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </DrawerMenu>

            </Navbar>

            <Box
                sx={{
                    ml: 3
                }}
            >
                {listMenu[activeTab].component}
            </Box>


        </Box>
    );
}
