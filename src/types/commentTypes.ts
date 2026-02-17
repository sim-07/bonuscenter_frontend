export interface CommentType {
    username: string;
    text: string;
    reply_text?: string | null;
    created_at: string;
}