'use client';

import { Avatar, Box, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import apiService from '../scripts/apiService';
import CustomizedSnackbar from '../common/Snakbar';
import { t } from 'i18next';
import LoadingSpinner from '../common/LoadingSpinner';
import { useTranslation } from 'next-i18next';

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
    const [messageText, setMessageText] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [scroll, setScroll] = useState(false);
    const { t } = useTranslation('user_page');
    const [messagesList, setMessagesList] = useState<Array<{
        text: string;
        sender_id: string;
        receiver_id: string;
        created_at: string;
    }>>([]);

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messagesListRef = useRef(messagesList);

    const isUserNearBottom = (): boolean => {
        const el = messagesContainerRef.current;
        if (!el) return false;
    
        const threshold = 100;
        const position = el.scrollTop + el.clientHeight;
        const height = el.scrollHeight;
    
        return height - position < threshold;
    };

    useEffect(() => {
        messagesListRef.current = messagesList;
    }, [messagesList]);

    useEffect(() => {
        if (isUserNearBottom() || firstLoad.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messagesList]);


    let firstLoad = useRef(true);
    useEffect(() => {
        const fetchMessage = async () => {
            
            try {
                if (firstLoad.current) {
                    setIsLoading(true);
                }

                const res = await apiService("chat", "get_messages", { sender_id: senderId, receiver_id: receiverId });

                if (!res.error) {
                    const newMessages = res.data;

                    if (JSON.stringify(newMessages) !== JSON.stringify(messagesList)) {
                        setMessagesList(newMessages);
                    }
                    if (firstLoad.current) {
                        setTimeout(() => {
                            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                            firstLoad.current = false;
                        }, 100);
                    }
                } else {
                    setSnackbarOpen(true);
                    setSnackbarMessage('Error fetching data');
                    setSeveritySnakbar('error');
                }
            } catch (err) {
                console.error("Error: ", err);
            } finally {
                setIsLoading(false);
            }
        }

        if (firstLoad) {
            fetchMessage();
        }

        setInterval(() => {
            fetchMessage();
        }, 2000)

    }, [])

    useLayoutEffect(() => {
        if (!isLoading) {
            inputRef.current?.focus();
            setScroll(false);
        }
    }, [isLoading, scroll]);

    const handleSend = async () => {
        if (messageText.trim() === '') {
            return;
        }

        setScroll(true);

        try {
            const res = await apiService("chat", "send_message", { sender_id: senderId, receiver_id: receiverId, text: messageText });

            // nuova attività sulla chat... - visualizza

            if (!res.error && receiverId) {
                setMessageText('');
                setMessagesList(prev => [
                    ...prev,
                    {
                        sender_id: senderId,
                        receiver_id: receiverId,
                        text: messageText,
                        created_at: new Date().toISOString(),
                    }
                ])
            } else {
                setSnackbarOpen(true);
                setSnackbarMessage('Error sending message');
                setSeveritySnakbar('error');
            }
        } catch (err) {
            console.error("Error: ", err);
        }

    };

    return (
        <Box
            sx={{
                p: 2,
                position: 'fixed',
                bottom: 20,
                right: 20,
                width: { xs: 320, md: 420 },
                height: 500,
                bgcolor: '#fff',
                borderRadius: 2,
                boxShadow: 4,
                zIndex: 1300,
            }}
        >
            <Stack direction={'row'} sx={{ justifyContent: 'space-between', display: 'flex', height: '50px' }}>
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
                        ref={messagesContainerRef}
                        sx={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            height: '78%',
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        {Array.isArray(messagesList) && messagesList.map((message, index) => {
                            const isSentByUser = message.sender_id === senderId;
                            const time = new Date(message.created_at).toLocaleString('it-IT', {
                                day: '2-digit',
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                            });

                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        alignSelf: isSentByUser ? 'flex-end' : 'flex-start',
                                        backgroundColor: isSentByUser ? '#e0f7fa' : '#f1f1f1',
                                        borderRadius: 2,
                                        p: 1.2,
                                        maxWidth: '80%',
                                        boxShadow: 1,
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                        sx={{ display: 'block', mb: 0.5 }}
                                    >
                                        {isSentByUser ? t('you') : receiverUsername} · {time}
                                    </Typography>
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                        {message.text}
                                    </Typography>
                                </Box>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </Box>


                    <TextField
                        fullWidth
                        inputRef={inputRef}
                        variant="outlined"
                        placeholder={t('typemessage')}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
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
