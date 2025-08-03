'use client';

import { Avatar, Box, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

import { useEffect, useState } from 'react';
import apiService from '../scripts/apiService';
import CustomizedSnackbar from '../common/Snakbar';
import { t } from 'i18next';
import LoadingSpinner from '../common/LoadingSpinner';

interface ChatContainerProps {
    handleCloseChat: () => void;
    receiverUsername?: string;
    senderId: string;
    receiverId?: string;
}

export default function ChatContainer({ handleCloseChat, senderId, receiverUsername, receiverId }: ChatContainerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severitySnakbar, setSeveritySnakbar] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [message, setMessage] = useState('');
    const [messagesList, setMessagesList] = useState([]);


    useEffect(() => {

        const fetchMessage = async () => {
            try {
                setIsLoading(true);
                const res = await apiService("chat", "get_messages", { sender_id: senderId, receiver_id: receiverId });

                if (!res.error) {
                    setMessagesList(res.data[0]);
                } else {
                    setSnackbarOpen(true);
                    setSnackbarMessage('Error fetching data');
                    setSeveritySnakbar('warning');
                }
            } catch (err) {
                console.error("Error: ", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMessage();

    }, [])


    const handleSend = () => {
        if (message.trim() === '') {
            return;
        }


    };

    return (
        <Box
            sx={{
                p: 2,
                position: 'fixed',
                bottom: 20,
                right: 20,
                width: 320,
                height: 400,
                bgcolor: '#fff',
                borderRadius: 2,
                boxShadow: 4,
                zIndex: 1300,
            }}
        >
            <Stack direction={'row'} sx={{ justifyContent: 'space-between', display: 'flex' }}>
                <Avatar />
                <Typography
                    variant="h6"
                    sx={{
                        ml: -2,
                        mt: 0.4,
                        maxWidth: '180px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {receiverUsername}
                </Typography>

                <IconButton onClick={handleCloseChat}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            {isLoading ? (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <LoadingSpinner />
                </Box>


            ) : (
                <>
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            height: '270px',
                            p: 2,
                        }}
                    >
                        {/* Messaggi qui */}
                    </Box>


                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Scrivi un messaggio..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSend} edge="end">
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}

                    />
                </>
            )}


            <CustomizedSnackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                severity={severitySnakbar}
                message={snackbarMessage}
            />

        </Box>
    );
};
