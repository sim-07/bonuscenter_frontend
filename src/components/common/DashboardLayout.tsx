import React, { useState, ReactNode } from 'react';
import { Box, IconButton, Alert, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Link, Stack, Divider, Button } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import router from 'next/router';
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

    const [openCodeDialog, setOpenCodeDialog] = useState(false);

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
                                marginTop: '10px !important'
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
                            <Button
                                variant='contained'
                                sx={{
                                    color: 'white',
                                    height: '35px'
                                }}
                            >
                                I miei codici
                            </Button>
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
                            <MenuItem
                                onClick={() => {
                                    handleCloseProfile();
                                    handleLogout();
                                }}
                            >
                                Logout
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
    );
};

export default DashboardLayout;
