import { Hono } from "hono";
import { tokenMiddleware } from "./middlewares/token-middleware";
import {  createCommentOnPost, getAllComments } from "../controllers/comments/comments-controller";
import { CreateCommentError, GetCommentError }  from "../controllers/comments/comments-types";

export const commentsRoutes = new Hono();

commentsRoutes.post("/on/:postId", tokenMiddleware, async (c) => {
    try {
        const postId = c.req.param("postId");
        const userId = c.get("userId");
        const { text } = await c.req.json();
        if (!userId || !postId || !text.trim()) {
            return c.json({ message: CreateCommentError.BAD_REQUEST }, 400);
        }
        const result = await createCommentOnPost({ userId, postId, text });

        return c.json(result, 201);
    } catch (e) {
        console.error("Error creating comment:", e);
        return c.json({ message: CreateCommentError.INTERNAL_SERVER_ERROR }, 500);
    }
});

commentsRoutes.get("/on/:postId", tokenMiddleware, async(c) => {
    try{
        const postId = c.req.param("postId");
        const page = parseInt(c.req.query("page") || "1", 10);
        const pageSize = parseInt(c.req.query("pageSize") || "10", 10);
        if (page < 1 || pageSize < 1) {
            return c.json({ message: "Invalid page or pageSize" }, 400);
        }
        if(!postId)
        {
            return c.json({message: GetCommentError.BAD_REQUEST},400);       
        }
        const result = await getAllComments({postId, page, pageSize});
        return c.json(result,200);
    }
    catch(e)
    {
        return c.json({ message: GetCommentError.INTERNAL_SERVER_ERROR }, 500);  
    }

});