import { Hono } from "hono";
import { tokenMiddleware } from "./middlewares/token-middleware";
import {  createCommentOnPost, deleteCommentById, getAllComments, updateCommentById } from "../controllers/comments/comments-controller";
import { CreateCommentError, DeleteCommentError, GetCommentError, UpdateCommentError }  from "../controllers/comments/comments-types";

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


commentsRoutes.delete("/:commentId", tokenMiddleware, async (c) => {
    try {
        const commentId = c.req.param("commentId");
        const userId = c.get("userId");

        if (!commentId || !userId) {
            return c.json({ message: DeleteCommentError.BAD_REQUEST }, 400);
        }

        const result = await deleteCommentById({ commentId, userId });

        if (result.error) {
            return c.json({ message: result.error }, 403);
        }

        return c.json({ message: "Comment deleted successfully" }, 200);
    } catch (e) {
        console.error("Error deleting comment:", e);
        return c.json({ message: DeleteCommentError.INTERNAL_SERVER_ERROR }, 500);
    }
});


commentsRoutes.patch("/:commentId", tokenMiddleware, async (c) => {
    try {
        const commentId = c.req.param("commentId");
        const userId = c.get("userId");
        const { text } = await c.req.json();

        if (!commentId || !userId || !text.trim()) {
            return c.json({ message: UpdateCommentError.BAD_REQUEST }, 400);
        }

        const result = await updateCommentById({ commentId, userId, text });

        if (result.error) {
            return c.json({ message: UpdateCommentError.NOT_FOUND},403);
        }

        return c.json({ message: "Comment updated successfully" }, 200);
    } catch (e) {
        console.error("Error updating comment:", e);
        return c.json({ message: UpdateCommentError.INTERNAL_SERVER_ERROR }, 500);
    }
});