import { prismaClient } from "../../extras/prisma";
import { type CreateCommentResult , CreateCommentError, type GetCommentResult, GetCommentError, type DeleteCommentResult, DeleteCommentError, UpdateCommentError, type UpdateCommentResult } from "./comments-types";

export const createCommentOnPost = async (parameters: { userId: string, postId: string, text: string}): Promise<CreateCommentResult> => {
    const { userId, postId, text } = parameters;
    if(!userId || !postId || !text.trim())
    {
        throw new Error(CreateCommentError.BAD_REQUEST);
    }
    const comment = await prismaClient.comment.create({
      data: {
        userId,
        postId,
        text,
      },
    });
    return { comment };
};

export const getAllComments = async (parameters: { postId: string, page: number, pageSize: number }): Promise<GetCommentResult> => {
  const {postId,page,pageSize}= parameters;
  if(!postId)
  {
    throw GetCommentError.BAD_REQUEST;
  }
  const comments = await prismaClient.comment.findMany({
    where: { postId: parameters.postId },
    orderBy: {createdAt: "desc"},
    skip: (page-1)*pageSize,
    take:pageSize,
  });
  const totalComments = await prismaClient.comment.count({where:{postId}});
  return { comments, totalComments };
};

export const deleteCommentById = async(parameters:{ commentId: string, userId: string }): Promise<DeleteCommentResult> => {
  const { commentId, userId } = parameters;
  if(!commentId)
  {
    return { error: DeleteCommentError.BAD_REQUEST };
  }
  const comment = await prismaClient.comment.findUnique({
    where: { id: commentId},
  });
  if(!comment)
  {
    return { error: DeleteCommentError.COMMENT_NOT_FOUND };
  }
  if (comment.userId !== userId) {
    return { error: DeleteCommentError.UNAUTHORIZED };
  }
  await prismaClient.comment.delete({
      where: { id: commentId },
  });
  return { success: true };
}

export const updateCommentById = async (parameters: { commentId: string, userId: string, text: string }): Promise<UpdateCommentResult> => {
  const { commentId, userId, text } = parameters;
  if (!commentId || !userId || !text.trim()) {
          return { error: UpdateCommentError.BAD_REQUEST };
  }
  const comment = await prismaClient.comment.findUnique({
    where: { id: commentId },
  });
  if (!comment) {
    return { error: UpdateCommentError.NOT_FOUND };
  }
  if (comment.userId !== userId) {
    return { error: UpdateCommentError.UNAUTHORIZED };
  }
  await prismaClient.comment.update({
    where: { id: commentId },
    data: { text },
  });
  return { success: true };
};
  
  