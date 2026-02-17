import { Box } from "@mui/material";
import Review from "./Review";
import LoadingSpinner from "../common/LoadingSpinner";

import { ReviewType } from '@/types/reviewTypes';

interface ReviewsListProps {
    lastReviews: ReviewType[];
    isLoading: boolean;
}

export default function ReviewsList({ lastReviews, isLoading }: ReviewsListProps) {
    return (
        <Box
            sx={{
                height: 300,
                overflowY: "auto",
                pr: 1,
            }}
        >
            {!isLoading ? (
                lastReviews.map((review, index) => (
                    <Review
                        key={index}
                        username={review.username}
                        text={review.text}
                        rating={review.rating}
                        created_at={review.created_at}
                    />
                ))
            ) : (
                <Box sx={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <LoadingSpinner />
                </Box>
            )}
        </Box>
    );
}
