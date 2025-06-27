import { ReactNode, useState } from "react";
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';

import Navbar from "../Home/Navbar";
import DrawerMenu from "../common/DrawerMenu";
import router from "next/router";
import BonusContainer from "../bonus/BonusContainer";
import UserReferral from "../common/UserReferral";
import UsedCodes from "../common/UsedCodes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const listMenu = [
    { text: 'Profilo', icon: <PersonIcon />, component: <BonusContainer /> },
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
    const [activeTab, setActiveTab] = useState(0);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
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
            console.error('Errore durante il logout:', error);
        }
    };

    return (
        <Box>
            <Navbar>
                <IconButton onClick={toggleDrawer(true)} sx={{ alignSelf: 'start', m: 2, zIndex: 2 }}>
                    <MenuIcon />
                </IconButton>

                <DrawerMenu open={openDrawer} toggleDrawer={toggleDrawer}>
                    <List>
                        {listMenu.map((tab, index) => (
                            <ListItem key={tab.text} disablePadding>
                                <ListItemButton onClick={() => {
                                    setActiveTab(index);
                                    setOpenDrawer(false);
                                }}>
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
