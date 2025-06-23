import React, { ReactNode } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface DrawerMenuProps {
    open: boolean,
    toggleDrawer: (newOpen: boolean) => () => void,
    children?: ReactNode;
}

const DrawerMenu = ({ open, toggleDrawer, children }: DrawerMenuProps) => {


    return (
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {children}
        </Drawer>
    );
};

export default DrawerMenu;