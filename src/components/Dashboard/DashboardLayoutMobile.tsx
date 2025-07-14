import { useState } from "react";
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Stack, Menu } from "@mui/material";
import { useTranslation } from "next-i18next";

import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Navbar from "../Home/Navbar";
import DrawerMenu from "../common/DrawerMenu";
import router from "next/router";
import BonusContainer from "../bonus/BonusContainer";
import UserReferral from "../bonus/UserReferral";
import UsedCodes from "../bonus/UsedCodes";
import apiService from "../scripts/apiService";
import NotificationList from "../common/NotificationList";

export default function DashboardLayoutMobile({
    username,
    openAddCodeDialog
}: {
    username: string,
    openAddCodeDialog: () => void
}) {
    const { t } = useTranslation('dashboard');

    const listMenu = [
        { text: t('profile'), icon: <PersonIcon />, route: '/profile' },
        { text: t('all_codes'), icon: <AssignmentIcon />, component: <BonusContainer /> },
        { text: t('my_codes'), icon: <AssignmentAddIcon />, component: <UserReferral /> },
        { text: t('used_codes'), icon: <AssignmentTurnedInIcon />, component: <UsedCodes /> },
    ];

    const [openDrawer, setOpenDrawer] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [anchorElNotification, setAnchorElNotification] = useState<null | HTMLElement>(null);
    const openN = Boolean(anchorElNotification);

    const handleClickNotification = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElNotification(event.currentTarget);
    };

    const handleCloseNotification = () => {
        setAnchorElNotification(null);
    };

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
            console.error('Error during logout:', error);
        }
    };

    return (
        <Box>
            <Navbar>

                <Stack direction={'row'} spacing={1.5}>
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

                    <IconButton
                        onClick={handleClickNotification}
                        sx={{
                            bgcolor: 'grey.200',
                            color: 'black',
                            height: '40px',
                            width: '40px',
                            marginTop: '15px',
                        }}
                    >
                        <NotificationsIcon />
                    </IconButton>
                </Stack>

                <Menu
                    anchorEl={anchorElNotification}
                    open={openN}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <NotificationList compact={true} max={50} />
                </Menu>

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
                                <ListItemText primary={t('logout')} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </DrawerMenu>

            </Navbar>

            <Box
                sx={{
                    ml: 3,
                    mt: 3
                }}
            >
                {listMenu[activeTab].component}
            </Box>
        </Box>
    );
}
