import React, { ReactNode } from 'react';
import { Drawer } from '@mui/material';

interface DrawerMenuProps {
    open: boolean,
    toggleDrawer: (newOpen: boolean) => () => void,
    children?: ReactNode;
}

const DrawerMenu = ({ open, toggleDrawer, children }: DrawerMenuProps) => {


    return (
        <Drawer
            open={open}
            onClose={toggleDrawer(false)}
            slotProps={{
                paper: {
                    sx: {
                        maxWidth: '300px',
                        width: '25%',
                        minWidth: '250px',
                    },
                },
            }}
        >
            {children}
        </Drawer >
    );
};

export default DrawerMenu;