import { Box, Button, Divider, IconButton, Link, ListItemText, MenuItem, Stack, Typography } from "@mui/material";
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
    sender_username: string;
    sender: string;
    notification_id?: string;
    code_id?: string;
    message: string;
    type: string;
    read: boolean;
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

                const resRead = await apiService('notification', 'set_read', {});
                if (resRead.error) {
                    console.error("Error in set_read")
                }
            } catch (error) {
                console.error(t("error set_read"), error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotification();

    }, [t])

    const sortedNotifications = [...notifications].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const items = max ? sortedNotifications.slice(0, max) : sortedNotifications;
    
    const handleConfirmUsedCode = async (code_id?: string, sender?: string) => {
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

            try {
                const res = await apiService('users', 'update_visibility', { target_user: sender });

                if (res.error) {
                    console.error("Error updating visibility", res.error);
                }
            } catch (error) {
                console.error("Error update visibility", error);
            }



        } catch (error) {
            console.error(t("error_confirm_code"), error);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteNotification = async (notification_id: string) => {
        try {
            const resDelete = await apiService('notification', 'delete_notification', { notification_id });
            if (!resDelete.error) {
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
                                                    secondary={new Date(item.created_at).toLocaleDateString('it-IT')}
                                                />
                                                <Button
                                                    variant="contained"
                                                    sx={{ color: "white", maxWidth: 140 }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleConfirmUsedCode(item.code_id, item.sender);
                                                    }}
                                                >
                                                    {t("confirm")}
                                                </Button>
                                            </Stack>
                                        );
                                        break;

                                    case 'new_activity_chat':
                                        content = (
                                            <Stack direction={'row'}>
                                                <Stack direction={'column'}>
                                                    <ListItemText
                                                        primary={
                                                            <Typography>
                                                                {item.message} <br />Click <Link href={`/user?u=${item.sender_username}`}>here</Link> to go to the chat
                                                            </Typography>
                                                        }
                                                        secondary={new Date(item.created_at).toLocaleDateString('it-IT')}
                                                    />
                                                </Stack>

                                                <Box sx={{ margin: 'auto' }}>
                                                    <IconButton onClick={() => deleteNotification(item.notification_id ? item.notification_id : "")} sx={{ height: '40px' }}>
                                                        <ClearIcon></ClearIcon>
                                                    </IconButton>
                                                </Box>


                                            </Stack>
                                        );
                                        break;

                                    default:
                                        content = (
                                            <Stack direction={'row'}>
                                                <ListItemText
                                                    primary={item.message}
                                                    secondary={new Date(item.created_at).toLocaleDateString('it-IT')}
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
                            <Typography variant="caption" color="grey">
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
