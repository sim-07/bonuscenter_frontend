import { Box, Divider, Typography, TextField, InputAdornment, IconButton, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';

import apiService from "../scripts/apiService";
import CommentsList from "./CommentsList";
import CustomizedSnackbar from "../common/Snakbar";

interface CommentsContainerProps {
    bonusName: string;
}

type SeveritySnakbarType = {
    severity?: 'success' | 'error' | 'warning' | 'info';
}

export default function CommentsContainer({ bonusName }: CommentsContainerProps) {
    const { t } = useTranslation('common');

    const [isLoading, setIsLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [snakbarMessage, setSnakbarMessage] = useState('');
    const [severitySnakbar, setSeveritySnakbar] = useState<SeveritySnakbarType | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [commentsList, setCommentsList] = useState<{
        username: string;
        text: string;
        reply_text: string | null;
        bonus_name: string;
        created_at: string;
    }[]>([]);

    const fetchAllComments = async () => {
        try {
            setIsLoading(true);
            const res = await apiService('comments', 'get_all_comments', { bonusName })
            if (!res.error) {
                setCommentsList(res.data);
            } else {
                console.error(res.error)
            }

        } catch (err: any) {
            console.error('Error_fetching_comments', err.message || err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllComments();
    }, [])

    const sendComment = async () => {
        if (commentText.trim() === "") return;
        try {
            const res = await apiService('comments', 'post_comment', { bonusName, commentText })

            if (!res.error) {
                setCommentText("");
                setOpenSnackbar(true);
                setSnakbarMessage(t('comment_posted'));
                setSeveritySnakbar({ severity: 'success' });
                fetchAllComments();
            } else {
                setOpenSnackbar(true);
                setSnakbarMessage(res.error);
                setSeveritySnakbar({ severity: 'warning' });
                console.error(res.error)
            }
        } catch (err: any) {
            console.error('Error_fetching_comments', err.message || err);
        }

    };

    return (
        <Box
            sx={{
                backgroundColor: "grey.800",
                p: 1,
                borderRadius: '12px',
                height: 500,
                minWidth: "100%",
                display: 'flex',
                justifyContent: 'center',
                overflow: "hidden",
            }}
        >
            <Stack
                direction={'column'}
                gap={3}
                sx={{
                    width: '90%',
                    mt: 2,
                }}
            >
                <Typography sx={{ margin: 2, fontSize: "25px" }}>
                    {t('comments')}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <TextField
                    sx={{
                        width: '100%'
                    }}
                    variant="outlined"
                    label={t('post_comment')}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendComment()}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={sendComment}>
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                {commentsList.length === 0 && !isLoading ? (
                    <Typography sx={{ color: '#666' }}>
                        {t('no_comments_yet')}
                    </Typography>
                ) : (
                    <CommentsList commentsList={commentsList} isLoading={isLoading} />
                )}

            </Stack>

            <CustomizedSnackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={snakbarMessage}
                severity={severitySnakbar?.severity}
            />
        </Box>
    );
}
