import { prismaClient } from "../../extras/prisma";
import { type CreateCommentResult , CreateCommentError, type GetCommentResult, GetCommentError } from "./comments-types";

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