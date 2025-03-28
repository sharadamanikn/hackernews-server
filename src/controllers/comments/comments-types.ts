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

export type DeleteCommentResult = {
    success?: boolean;
    error?: DeleteCommentError;
};
export enum DeleteCommentError {
    BAD_REQUEST = "BAD_REQUEST",
    NOT_FOUND = "COMMENT_NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED_ACTION",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    COMMENT_NOT_FOUND = "COMMENT_NOT_FOUND",
}

export enum UpdateCommentError {
    BAD_REQUEST = "BAD_REQUEST",
    NOT_FOUND = "COMMENT_NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED_ACTION",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
}

export type UpdateCommentResult = {
    success?: boolean;
    error?: UpdateCommentError;
};