import React, { useState, ReactNode, useEffect } from 'react';
import { Box, IconButton, Alert, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Link, Stack, Divider, Button, Paper, MenuList } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import router from 'next/router';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import LoadingSpinner from './LoadingSpinner';
import Navbar from '../Home/Navbar';
import DrawerMenu from './DrawerMenu';
import Footer from '../Home/Footer';
import DialogComponent from './DialogComponent';
import AddCodeForm from './AddCodeForm';
import CustomizedSnackbar from './Snakbar';

interface DashboardlayoutProps {
    children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardlayoutProps) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [snakbarMessage, setSnakbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [openCodeDialog, setOpenCodeDialog] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const checkAuth = async () => {
            try {
                const response = await fetch(`${apiUrl}/users/get_user_data`, {
                    method: 'POST',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                    setUserId(data.userId);
                    setIsLoading(false);
                    console.log(`userid: ${userId} username: ${username}`)
                } else {
                    router.push('/');
                    console.error("Not authenticated");
                }
            } catch (err) {
                router.push('/');
                console.error('Error fetching user data')
            }
        };

        checkAuth();
    }, [])

    const openAddCodeDialog = () => {
        setOpenCodeDialog(true);
    };

    const successAddCode = () => {
        setOpenCodeDialog(false);
        setSnakbarMessage("Il tuo codice è stato inserito!");
        setSnackbarOpen(true);
    }

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
        { text: 'I miei codici', icon: <AssignmentIcon />, path: '/my-referral' },
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
        setOpenDrawer(newOpen);
    };


    return (
        <>
            {isLoading ? (
                <Box 
                    sx={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <LoadingSpinner />
                </Box>
                
            ) : (
                <Box>
                    <DialogComponent open={openCodeDialog} onClose={() => setOpenCodeDialog(false)}>
                        <Box>
                            <AddCodeForm successAddCode={successAddCode} />
                        </Box>
                    </DialogComponent>
                    <Navbar>
                        {isMobile ? (
                            <>
                                <IconButton onClick={toggleDrawer(true)} sx={{ alignSelf: 'start', m: 2, zIndex: '2' }}>
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
                                            <ListItemButton onClick={() => handleLogout()}>
                                                <ListItemIcon>
                                                    <ExitToAppIcon />
                                                </ListItemIcon>
                                                <ListItemText primary='Logout' />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </DrawerMenu>
                            </>
                        ) : (
                            <>
                                <Stack
                                    direction="row"
                                    spacing={2.5}
                                    sx={{
                                        marginTop: '12px !important'
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            openAddCodeDialog()
                                        }}
                                        variant='contained'
                                        sx={{
                                            color: 'white',
                                            height: '35px'
                                        }}
                                    >
                                        Pubblica un codice
                                    </Button>
                                    <Link
                                        href="/my-referral"
                                        color="inherit"
                                    >
                                        I miei codici
                                    </Link>
                                    <Link
                                        href="/dashboard"
                                        color="inherit"
                                    >
                                        Tutte le offerte
                                    </Link>
                                </Stack>

                                <IconButton
                                    onClick={handleClickProfile}
                                    sx={{
                                        alignSelf: 'end',
                                        zIndex: '2',
                                        fontSize: 40,
                                        ml: 2,
                                    }}
                                >
                                    <AccountCircleIcon sx={{ fontSize: 40, }} />
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={openP}
                                    onClose={handleCloseProfile}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    slotProps={{
                                        list: {
                                            'aria-labelledby': 'basic-button',
                                        },
                                    }}
                                >
                                    <MenuItem onClick={handleCloseProfile}>
                                        <ListItemIcon>
                                            <PersonIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Profilo</ListItemText>
                                    </MenuItem>

                                    <Divider />

                                    <MenuItem
                                        onClick={() => {
                                            handleCloseProfile();
                                            handleLogout();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <ExitToAppIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Logout</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Navbar>
                    <CustomizedSnackbar
                        open={snackbarOpen}
                        onClose={() => setSnackbarOpen(false)}
                        message={snakbarMessage}
                    />
                    <Box>
                        {children}
                    </Box>
                    <Footer />
                </Box>
            )}

        </>

    );
};

export default DashboardLayout;
