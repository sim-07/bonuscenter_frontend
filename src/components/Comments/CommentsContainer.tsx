import { Box, Divider, Typography, TextField, InputAdornment, IconButton, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";

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

    

    useEffect(() => {
        const fetchAllComments = async () => {
            try {
                const res = await apiService('comments', 'get_all_comments', { bonusName })
                if (!res.error) {
                    setCommentsList(res.data);
                } else {
                    console.error(res.error)
                }

            } catch (err: any) {
                console.error('Errore recupero dei commenti:', err.message || err);
            }
        }
        fetchAllComments();
    }, [])

    const sendComment = async () => {
        if (commentText.trim() === "") return;
        try {
            const res = await apiService('comments', 'post_comment', { bonusName, commentText })

            if (!res.error) {
                setCommentText("");
                setOpenSnackbar(true);
                setSnakbarMessage("Commento pubblicato!");
                setSeveritySnakbar({ severity: 'success' });
            } else {
                setOpenSnackbar(true);
                setSnakbarMessage(res.error);
                setSeveritySnakbar({ severity: 'warning' });
                console.error(res.error)
            }
        } catch (err: any) {
            console.error('Errore recupero dei commenti:', err.message || err);
        }

    };

    return (
        <Box
            sx={{
                backgroundColor: "grey.100",
                p: 1,
                borderRadius: '12px',
                height: 500,
                overflow: "scroll",
                minWidth: "100%",
                display: 'flex',
                justifyContent: 'center',
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
                    Commenti
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <TextField
                    sx={{
                        width: '100%'
                    }}
                    variant="outlined"
                    label="Pubblica un commento"
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
                <CommentsList commentsList={commentsList} />
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
