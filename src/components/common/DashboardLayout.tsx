import React, { useState, useEffect, ReactNode } from 'react';
import { Box, IconButton, Alert } from '@mui/material';
import DrawerMenu from './DrawerMenu';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventIcon from '@mui/icons-material/Event';

interface DashboardlayoutProps {
    children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardlayoutProps) => {
    const [open, setOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;

    const listMenu = [
        { text: 'Home', icon: <HomeIcon />, path: '/dashboard', role: ["studente", "insegnante"] },
        { text: 'Profilo', icon: <PersonIcon />, path: '/profilo', role: ["studente", "insegnante"] },
        { text: 'Gestione utenti', icon: <PeopleAltIcon />, path: '/manage-users', role: ["insegnante"] },
        { text: 'Cogestione', icon: <EventIcon />, path: '/manage-events', role: ["insegnante"] },
    ];

    const handleLogout = async () => {
        try {
            const response = await fetch(`${apiUrl}/users/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                // navigate('/');
            } else {
                console.error("Errore durante logout");
            }
        } catch (error) {
            console.error('Errore durante il logout:', error);
        }
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <IconButton onClick={toggleDrawer(true)} sx={{ alignSelf: 'start', m: 2, zIndex: '2' }}>
                <MenuIcon />
            </IconButton>

            <DrawerMenu open={open} toggleDrawer={toggleDrawer} handleLogout={handleLogout} listMenu={filteredListMenu} />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {error && <Alert severity="error">{error}</Alert>}
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;