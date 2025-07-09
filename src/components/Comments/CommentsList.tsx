import { Box } from "@mui/material";
import Comment from "./Comment";
import LoadingSpinner from "../common/LoadingSpinner";

interface Comment {
    username: string;
    text: string;
    reply_text: string | null;
    bonus_name: string;
    created_at: string;
}

interface CommentsListProps {
    commentsList: Comment[];
}

export default function CommentsList({ commentsList }: CommentsListProps) {
    return (
        <Box
            sx={{
                height: 300,
                overflowY: "auto",
                pr: 1,
            }}
        >
            {commentsList.length > 0 ? (
                commentsList.map((comment, index) => (
                    <Comment
                        key={index}
                        username={comment.username}
                        text={comment.text}
                        reply_text={comment.reply_text}
                        created_at={comment.created_at}
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
