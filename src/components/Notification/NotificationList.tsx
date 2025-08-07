import { Box, Button, Divider, IconButton, ListItemText, MenuItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';

import ClearIcon from '@mui/icons-material/Clear';

import apiService from "../scripts/apiService";
import LoadingSpinner from "../common/LoadingSpinner";
import CustomizedSnackbar from '@/components/common/Snakbar';

type NotificationListProps = {
    max?: number;
    compact?: boolean;
};

type Notification = {
    notification_id?: string;
    code_id?: string;
    message: string;
    type: string;
    created_at: string;
};

type SeveritySnakbarType = {
    severity?: 'success' | 'error' | 'warning' | 'info';
}

export default function NotificationList({ max, compact = false }: NotificationListProps) {
    const { t } = useTranslation('common');

    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const [snakbarMessage, setSnakbarMessage] = useState('');
    const [severitySnakbar, setSeveritySnakbar] = useState<SeveritySnakbarType | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                setIsLoading(true);
                const res = await apiService('notification', 'get_notifications', {});

                if (!res.error) {
                    setNotifications(res.data);
                } else {
                    console.error(t("error_get_notifications"), res.error);
                }
            } catch (error) {
                console.error(t("error_get_notifications"), error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotification();

    }, [t])

    const items = max ? notifications.slice(0, max) : notifications;

    const handleConfirmUsedCode = async (code_id?: string) => {
        try {
            setIsLoading(true);
            const res = await apiService('used_codes', 'confirm_code', { code_id });

            if (!res.error) {
                try {
                    const resDelete = await apiService('notification', 'delete_notification', { code_id });
                    if (!resDelete.error) {
                        setSnakbarMessage(t("confirmed"));
                        setSeveritySnakbar({ severity: 'success' });
                        setOpenSnackbar(true);
                        setNotifications(prev =>
                            prev.filter(item => item.code_id !== code_id)
                        );
                    } else {
                        console.error(t("error_delete_notification"), resDelete.error);
                    }
                } catch (error) {
                    console.error(t("error_delete_notification"), error);
                }
            } else {
                console.error(t("error_confirm_code"), res.error);
            }
        } catch (error) {
            console.error(t("error_confirm_code"), error);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteNotification = async (notification_id: string) => {
        console.log(notification_id);
        try {
            const resDelete = await apiService('notification', 'delete_notification', { notification_id });
            if (!resDelete.error) {
                setSnakbarMessage(t("confirmed"));
                setSeveritySnakbar({ severity: 'success' });
                setOpenSnackbar(true);
                setNotifications(prev =>
                    prev.filter(item => item.notification_id !== notification_id)
                );
            } else {
                console.error(t("error_delete_notification"), resDelete.error);
            }
        } catch (error) {
            console.error(t("error_delete_notification"), error);
        }
    }

    return (
        <>
            {compact ? (
                <>
                    {!isLoading ? (
                        items.length === 0 ? (
                            <MenuItem
                                sx={{
                                    whiteSpace: 'normal',
                                    alignItems: 'flex-start',
                                    minWidth: 300,
                                    maxWidth: 400,
                                }}
                            >
                                {t("no_notifications")}
                            </MenuItem>
                        ) : (
                            items.map((item, index) => {
                                let content;

                                switch (item.type) {
                                    case 'used_code':
                                        content = (
                                            <Stack direction="column" spacing={2}>
                                                <ListItemText
                                                    primary={item.message}
                                                    secondary={new Date(item.created_at).toLocaleString()}
                                                />
                                                <Button
                                                    variant="contained"
                                                    sx={{ color: "white", maxWidth: 140 }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleConfirmUsedCode(item.code_id);
                                                    }}
                                                >
                                                    {t("confirm")}
                                                </Button>
                                            </Stack>
                                        );
                                        break;

                                    default:
                                        content = (
                                            <Stack direction={'row'}>
                                                <ListItemText
                                                    primary={item.message}
                                                    secondary={new Date(item.created_at).toLocaleString()}
                                                />

                                                <IconButton onClick={() => deleteNotification(item.notification_id ? item.notification_id : "")}>
                                                    <ClearIcon></ClearIcon>
                                                </IconButton>

                                            </Stack>
                                        );
                                }

                                return (
                                    <div key={index}>
                                        <MenuItem
                                            sx={{
                                                whiteSpace: 'normal',
                                                alignItems: 'flex-start',
                                                minWidth: 300,
                                                maxWidth: 400,
                                            }}
                                        >
                                            {content}
                                        </MenuItem>
                                        <Divider />
                                    </div>
                                );
                            })
                        )
                    ) : (
                        <Box
                            sx={{
                                width: '100%',
                                minWidth: 300,
                                minHeight: 100,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                            }}
                        >
                            <LoadingSpinner size={40} />
                        </Box>
                    )}
                </>
            ) : (
                <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                    {items.map((item, index) => (
                        <Box key={index} sx={{ py: 1, borderBottom: '1px solid #eee' }}>
                            <Typography variant="body2">{item.message}</Typography>
                            <Typography variant="caption" color="gray">
                                {new Date(item.created_at).toLocaleString()}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}

            <CustomizedSnackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={snakbarMessage}
                severity={severitySnakbar?.severity}
            />
        </>
    );

};
