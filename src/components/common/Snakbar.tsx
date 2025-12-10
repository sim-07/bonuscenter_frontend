import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type SnackbarProps = {
    open: boolean;
    onClose: () => void;
    message: string;
    severity?: 'success' | 'error' | 'warning' | 'info';
};

export default function CustomizedSnackbar({
    open,
    onClose,
    message,
    severity = 'success',
}: SnackbarProps) {
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') return;
        onClose();
    };

    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{
                    width: '100%',
                    color: 'white',
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
