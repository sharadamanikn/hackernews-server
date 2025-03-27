import { prismaClient } from "../../extras/prisma";
import { createPostError } from "./posts-types";
import type { createPostResult } from "./posts-types";

export const createPost = async(parameters:{ id: string;      
    title:  string;
    content:   string;
    authorId: string;   }): Promise<createPostResult> =>{
const usercreate = await prismaClient.post.create({

    data:{
        id: parameters.id,
        title:parameters.title,
        content:parameters.content,
        authorId:parameters.authorId,
        },
});
return {
    id: usercreate.id,   
    title: usercreate.title,
    content: usercreate.content,
    authorId: usercreate.authorId,
};


    };

