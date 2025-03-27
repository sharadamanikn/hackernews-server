import { type Like } from "@prisma/client"; 

export type CreateLikeResult =
{
    like: Like;
};
export enum CreateLikeError
{
    BAD_REQUEST="BAD_REQUEST",
    INTERNAL_SERVER_ERROR="INTERNAL_SERVER_ERROR",
    ALREADY_EXISTS="ALREADY_EXISTS",
    UNAUTHORIZED="UNAUTHORIZED",
}

export type GetLikesResult = {
    likes: Like[];
    totalLikes: number;
};
export enum GetLikesError {
    BAD_REQUEST = "BAD_REQUEST",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    UNAUTHORIZED = "UNAUTHORIZED",
}

export type DeleteLikeResult = {
    message: string;
};
export enum DeleteLikeError {
    BAD_REQUEST = "BAD_REQUEST",
    UNAUTHORIZED = "UNAUTHORIZED",
    NOT_FOUND = "NOT_FOUND",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
}