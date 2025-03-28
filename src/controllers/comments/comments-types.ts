import { type Comment } from "@prisma/client"; 
export type CreateCommentResult =
{
    comment: Comment;
};
export enum CreateCommentError {
    BAD_REQUEST="BAD_REQUEST",
    INTERNAL_SERVER_ERROR="INTERNAL_SERVER_ERROR",
    ALREADY_EXISTS="ALREADY_EXISTS",
    UNAUTHORIZED="UNAUTHORIZED",
}

export type GetCommentResult = {
    comments: Comment[];
    totalComments: number;

};
export enum GetCommentError
{
    BAD_REQUEST = "BAD_REQUEST",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    UNAUTHORIZED = "UNAUTHORIZED",
}
