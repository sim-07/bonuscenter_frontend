import React, { useState, ReactNode } from 'react';
import { Box, IconButton, Alert, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Link, Stack } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import router from 'next/router';
import Navbar from '../Home/Navbar';
import DrawerMenu from './DrawerMenu';
import Footer from '../Home/Footer';

interface DashboardlayoutProps {
    children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardlayoutProps) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openP = Boolean(anchorEl);
    const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseProfile = () => {
        setAnchorEl(null);
    };

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
                        <Stack
                            direction="row"
                            spacing={2.5}
                            sx={{
                                marginTop: '15px !important',
                            }}
                        >
                            <Link href="/home" underline="none" color="inherit">I miei codici</Link>
                            <Link href="/about" underline="none" color="inherit">Pubblica un codice</Link>
                        </Stack>


                        <IconButton
                            onClick={handleClickProfile}
                            sx={{
                                alignSelf: 'end',
                                zIndex: '2',
                                fontSize: 40,
                                ml: 'auto',
                                mr: 2,
                            }}
                        >
                            <AccountCircleIcon sx={{ fontSize: 40 }} />
                        </IconButton>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openP}
                            onClose={handleCloseProfile}
                            slotProps={{
                                list: {
                                    'aria-labelledby': 'basic-button',
                                },
                            }}
                        >
                            <MenuItem onClick={handleCloseProfile}>Profilo</MenuItem>
                            <MenuItem onClick={handleCloseProfile}>Impostazioni</MenuItem>
                            <MenuItem onClick={handleCloseProfile}>Logout</MenuItem>
                        </Menu>
                    </>
                )}
            </Navbar>
                <Box>
                    {children}
                </Box>
            <Footer />
        </Box>
    );
};

export default DashboardLayout;
