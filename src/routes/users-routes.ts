import { Hono } from "hono";
import { prismaClient } from "../extras/prisma";
import { tokenMiddleware } from "./middlewares/token-middleware";
import { getAllUsers, getMe } from "../controllers/users/users-controller";
import { GetMeError } from "../controllers/users/users-types";

export const usersRoutes = new Hono();

usersRoutes.get("/me", tokenMiddleware, async (context) => {
  const userId = context.get("userId");

  try {
    const user = await getMe({
      userId,
    });

    return context.json(
      {
        data: user,
      },
      200
    );
  } catch (e) {
    if (e === GetMeError.BAD_REQUEST) {
      return context.json(
        {
          error: "User not found",
        },
        400
      );
    }

    return context.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
});


usersRoutes.get("", tokenMiddleware, async (context) => {
    try {
        const url = new URL(context.req.url); // Get query parameters
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
        if (page < 1 || pageSize < 1) {
          return context.json({ message: "Invalid page or pageSize" }, 400);
        }
        const result = await getAllUsers(page, pageSize);
        return context.json(
          {
            data: result.users,
            pagination: {
              page,
              pageSize,
              total: result.total,
              totalPages: Math.ceil(result.total / pageSize),
            },
          },
          200
        );
      } 
      catch (e) {
        console.error("Error fetching users:", e);
        return context.json({ message: "Internal Server Error" }, 500);
      }
});




