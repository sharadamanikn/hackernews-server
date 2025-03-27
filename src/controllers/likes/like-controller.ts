import { prismaClient } from "../../extras/prisma";
import { type CreateLikeResult, CreateLikeError} from "./like-types";
import { type GetLikesResult, GetLikesError } from "./like-types"; 
import { DeleteLikeError, type DeleteLikeResult } from "./like-types";

export const createLikeOnPost = async (parameters: { userId: string, postId: string }): Promise<CreateLikeResult> => {
    const existingLike = await prismaClient.like.findFirst({
      where: {
        userId: parameters.userId,
        postId: parameters.postId,
      },
    });
  
    if (existingLike) {
      throw CreateLikeError.ALREADY_EXISTS; 
    }
  
    const like = await prismaClient.like.create({
      data: {
        userId: parameters.userId,
        postId: parameters.postId,
      },
    });
  
    return { like };
  };
  

  export const getAllLikes = async (parameters: { postId: string, page: number, pageSize: number }): Promise<GetLikesResult> => {
    const {postId,page,pageSize}= parameters;
    if(!postId)
    {
      throw GetLikesError.BAD_REQUEST;
    }

    const likes = await prismaClient.like.findMany({
      where: { postId: parameters.postId },
      orderBy: {createdAt: "desc"},
      skip: (page-1)*pageSize,
      take:pageSize,
    });
  
const totalLikes = await prismaClient.like.count({where:{postId}});
  
    return { likes, totalLikes };
  };
  



  export const deleteLikeOnPost = async (parameters: { userId: string, postId: string }): Promise<DeleteLikeResult> => {
    const { userId, postId } = parameters;
    if (!userId || !postId) {
        throw new Error(DeleteLikeError.BAD_REQUEST);
    }
    const existingLike = await prismaClient.like.findFirst({
        where: { userId, postId },
    });
    if (!existingLike) {
        throw new Error(DeleteLikeError.NOT_FOUND);
    }
    await prismaClient.like.delete({
        where: { id: existingLike.id },
    });

    return { message: "Like removed successfully" };
};


