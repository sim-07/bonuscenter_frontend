import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ReactNode, useState } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import DrawerMenu from "../common/DrawerMenu";
import router from "next/router";
import BonusContainer from "../bonus/BonusContainer";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const listMenu = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
    { text: 'Profilo', icon: <PersonIcon />, path: '/profilo' },
    { text: 'I miei codici', icon: <AssignmentIcon />, path: '/my-referral' },
];

export default function DashboardLayoutMobile({
    children,
    username,
    openAddCodeDialog
}: {
    children: ReactNode,
    username: string,
    openAddCodeDialog: () => void
}) {
    const [openDrawer, setOpenDrawer] = useState(false);

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
                        {listMenu.map(({ text, icon, path }) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => router.push(path)}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={text} />
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
                <BonusContainer />
            </Box>


            <Box>{children}</Box>
            
        </Box>
    );
}
