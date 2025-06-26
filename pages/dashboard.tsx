import { ReactNode, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import router from 'next/router';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import DialogComponent from '@/components/common/DialogComponent';
import AddCodeForm from '@/components/common/AddCodeForm';
import CustomizedSnackbar from '@/components/common/Snakbar';
import DashboardLayoutDesktop from '@/components/Dashboard/DashboardLayoutDesktop';
import DashboardLayoutMobile from '@/components/Dashboard/DashboardLayoutMobile';

interface DashboardlayoutProps {
    children?: ReactNode;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardLayout({ children }: DashboardlayoutProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [openCodeDialog, setOpenCodeDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${apiUrl}/users/get_user_data`, {
                    method: 'POST',
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.username);
                    setUserId(data.user_id);
                } else {
                    router.push('/');
                }
            } catch (err) {
                router.push('/');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const successAddCode = () => {
        setOpenCodeDialog(false);
        setSnackbarMessage("Il tuo codice è stato inserito!");
        setSnackbarOpen(true);
    };


    return (
        <>
            {isLoading ? (
                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center' }}>
                    <LoadingSpinner />
                </Box>
            ) : (
                <>
                    <DialogComponent open={openCodeDialog} onClose={() => setOpenCodeDialog(false)}>
                        <AddCodeForm successAddCode={successAddCode} />
                    </DialogComponent>

                    {isMobile ? (
                        <DashboardLayoutMobile
                            username={username}
                            openAddCodeDialog={() => setOpenCodeDialog(true)}
                        >
                            {children}
                        </DashboardLayoutMobile>
                    ) : (
                        <DashboardLayoutDesktop
                            username={username}
                            openAddCodeDialog={() => setOpenCodeDialog(true)}
                        >
                            {children}
                        </DashboardLayoutDesktop>
                    )}

                    <CustomizedSnackbar
                        open={snackbarOpen}
                        onClose={() => setSnackbarOpen(false)}
                        message={snackbarMessage}
                    />
                </>
            )}
        </>
    );

}
