import { useEffect, useState } from "react";
import apiService from "../scripts/apiService";
import { Box, Stack, Typography, Divider, TextField, InputAdornment, IconButton } from "@mui/material";
import { t } from "i18next";

import SendIcon from "@mui/icons-material/Send";

import CustomizedSnackbar from "../common/Snakbar";
import ReviewsList from "./ReviewsList";

interface ReviewsProps {
    bonusName: string;
}

type SeveritySnakbarType = {
    severity?: 'success' | 'error' | 'warning' | 'info';
}

export default function Reviews({ bonusName }: ReviewsProps) {

    const [isLoading, setIsLoading] = useState(true);
    const [snakbarMessage, setSnakbarMessage] = useState('');
    const [reviewText, setReviewText] = useState("");
    const [severitySnakbar, setSeveritySnakbar] = useState<SeveritySnakbarType | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [lastReviews, setLastReviews] = useState<{
        username: string;
        text: string;
        rating: number;
        created_at: string;
    }[]>([]);

    // const fetchLastReviews = async () => {
    //     try {
    //         setIsLoading(true);
    //         const res = await apiService('reviews', 'get_last_reviews', { bonusName })
    //         if (!res.error) {
    //             setLastReviews(res.data);
    //         } else {
    //             console.error(res.error)
    //         }

    //     } catch (err: any) {
    //         console.error('Error fetching reviews', err.message || err);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    const sendReview = async () => {
        // if (reviewText.trim() === "") return;
        // try {
        //     const res = await apiService('reviews', 'post_review', { bonusName, reviewText })

        //     if (!res.error) {
        //         setReviewText("");
        //         setOpenSnackbar(true);
        //         setSnakbarMessage(t('review_posted'));
        //         setSeveritySnakbar({ severity: 'success' });
        //         fetchLastReviews();
        //     } else {
        //         setOpenSnackbar(true);
        //         setSnakbarMessage(res.error);
        //         setSeveritySnakbar({ severity: 'warning' });
        //         console.error(res.error)
        //     }
        // } catch (err: any) {
        //     console.error('Error fetching reviews', err.message || err);
        // }

    };

    // useEffect(() => {
    //     fetchLastReviews();
    // }, []);

    return (
        <>
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
                        {t('reviews')}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <TextField
                        sx={{
                            width: '100%'
                        }}
                        variant="outlined"
                        label={`${t('post_review')}`}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendReview()}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={sendReview}>
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {lastReviews.length === 0 && !isLoading ? (
                        <Typography sx={{ color: '#666' }}>
                            {t('no_reviews_yet')}
                        </Typography>
                    ) : (
                        <ReviewsList lastReviews={lastReviews} isLoading={isLoading} />
                    )}

                </Stack>

                <CustomizedSnackbar
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    message={snakbarMessage}
                    severity={severitySnakbar?.severity}
                />
            </Box>
        </>
    )
}