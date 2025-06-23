import React, { useState, ReactNode } from 'react';
import { Box, IconButton, Alert, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import router from 'next/router';
import Navbar from '../Home/Navbar';
import DrawerMenu from './DrawerMenu';

interface DashboardlayoutProps {
    children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardlayoutProps) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const listMenu = [
        { text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
        { text: 'Profilo', icon: <PersonIcon />, path: '/profilo' },
    ];

    const handleLogout = async () => {
        try {
            const response = await fetch(`${apiUrl}/users/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                router.push('/');
            } else {
                console.error("Errore durante logout");
            }
        } catch (error) {
            console.error('Errore durante il logout:', error);
        }
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <Box>
            <Navbar>
                {isMobile ? (
                    <>
                        <IconButton onClick={toggleDrawer(true)} sx={{ alignSelf: 'start', m: 2, zIndex: '2' }}>
                            <MenuIcon />
                        </IconButton>

                        <DrawerMenu open={open} toggleDrawer={toggleDrawer}>
                            <List>
                                {listMenu.map(({ text, icon, path }) => (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton onClick={() => router.push(path)}>
                                            <ListItemIcon>{icon}</ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </DrawerMenu>
                    </>
                ) : (
                    <>
                        <IconButton onClick={toggleDrawer(true)} sx={{ alignSelf: 'end', mr: 1, zIndex: '2', fontSize: 40 }}>
                            <AccountCircleIcon />
                        </IconButton>
                    </>
                )}

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {error && <Alert severity="error">{error}</Alert>}
                    {children}
                </Box>
            </Navbar>
        </Box>
    );
};

export default DashboardLayout;
