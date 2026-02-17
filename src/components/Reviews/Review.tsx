import { Box, Typography } from "@mui/material";

import { ReviewType } from '@/types/reviewTypes';


export default function Review({ username, text, rating, created_at }: ReviewType) {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: "white",
                p: 2,
                borderRadius: 2,
                border: '1px solid #ececec',
                mb: 1,
            }}
        >
            <Typography variant="subtitle2" color="text.secondary">
                <strong>{username}</strong> - {new Date(created_at).toLocaleDateString('it-IT')}
            </Typography>
            <Typography variant="body1">{text}</Typography>
            {/* TODO rating -- ☆ -- */}
        </Box>
    );
}
