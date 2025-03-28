import { Hono } from "hono";
import { tokenMiddleware } from "./middlewares/token-middleware";
import { createLikeOnPost, getAllLikes, deleteLikeOnPost  } from "../controllers/likes/like-controller";
import {CreateLikeError, GetLikesError, DeleteLikeError  }  from "../controllers/likes/like-types";

export const likesRoutes = new Hono();

likesRoutes.post("/on/:postId",tokenMiddleware, async(c) =>
{
    try {
        const postId = c.req.param("postId");
        const userId = c.get("userId");
        if(!userId || !postId)
        {
            return c.json({message: CreateLikeError.UNAUTHORIZED },401);
        }
        const result = await createLikeOnPost({userId, postId});
        return c.json(result,201);
    }
    catch(e)
    {
        console.error("Error in creating like",e);
        if(e === CreateLikeError.ALREADY_EXISTS)
        {
                return c.json({message:"You have already liked this post"},200);
        }
        return c.json({message:CreateLikeError.INTERNAL_SERVER_ERROR},500);
    }
});

likesRoutes.get("/on/:postId", tokenMiddleware, async(c) => {
    try{
        const postId = c.req.param("postId");
        const page = parseInt(c.req.query("page") || "1", 10);
        const pageSize = parseInt(c.req.query("pageSize") || "10", 10);
        if (page < 1 || pageSize < 1) {
            return c.json({ message: "Invalid page or pageSize" }, 400);
        }
        if(!postId)
        {
            return c.json({message: GetLikesError.BAD_REQUEST},400);       
        }
        const result = await getAllLikes({postId, page, pageSize});
        return c.json(result,200);
    }
    catch(e)
    {
        return c.json({ message: GetLikesError.INTERNAL_SERVER_ERROR }, 500);  
    }

});

likesRoutes.delete("/on/:postId", tokenMiddleware, async (c) => {
    try {
        const postId = c.req.param("postId");
        const userId = c.get("userId");

        if (!userId || !postId) {
            return c.json({ message: DeleteLikeError.BAD_REQUEST }, 400);
        }

        const result = await deleteLikeOnPost({ userId, postId });
        return c.json(result, 200);
    } catch (e) {
        console.error("Error deleting like:", e);

        if (e === DeleteLikeError.NOT_FOUND) {
            return c.json({ message: "Like not found" }, 404);
        }
        return c.json({ message: DeleteLikeError.INTERNAL_SERVER_ERROR }, 500);
    }
});





