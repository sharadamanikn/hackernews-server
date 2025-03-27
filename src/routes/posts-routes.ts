import { Hono } from "hono";
import { tokenMiddleware } from "./middlewares/token-middleware";
import { createPost} from "../controllers/posts/posts-controller";
import  {createPostError, type createPostResult} from "../controllers/posts/posts-types";

export const postsRoutes = new Hono();

postsRoutes.post("/", tokenMiddleware, async (c) => {
    try {
        const body = await c.req.json(); 
    
        if (!body.id || !body.title || !body.content || !body.authorId) {
          return c.json({ message: createPostError.BAD_REQUEST }, 400);
        }
    
        const newPost: createPostResult = await createPost(body);
    
        return c.json(newPost, 201); 
      } catch (error) {
        return c.json({ message: createPostError.SERVER_ERROR }, 400);
      }
});
