import { Box, Typography } from "@mui/material";

interface CommentProps {
    username: string;
    text: string;
    reply_text?: string | null;
    created_at: string;
}

export default function Comment({ username, text, reply_text, created_at }: CommentProps) {
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
            {reply_text && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, pl: 2 }}>
                    ↳ {reply_text}
                </Typography>
            )}
        </Box>
    );
}
