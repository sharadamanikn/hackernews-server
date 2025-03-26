import { prismaClient } from "../../extras/prisma";
import { GetMeError, userError, type GetMeResult } from "./users-types";
import { type userResult } from "./users-types";


export const getMe = async (parameters: { userId: string }): Promise<GetMeResult> => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: parameters.userId,
    },
  });

  if (!user) {
    throw GetMeError.BAD_REQUEST;
  }

  return {
    user,
  };
};


export const getAllUsers = async (page:number =1 , pageSize: number=10): Promise<userResult> => {
    const users = await prismaClient.user.findMany({
        orderBy: {
             username: "asc"
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
  
    
    const totalUsers = await prismaClient.user.count();
    
   return {
    users,
    total: totalUsers,
   }
};



  
  

