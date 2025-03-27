import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes";
import { usersRoutes } from "./users-routes";
import { logger } from "hono/logger";
import {postsRoutes} from "./posts-routes";

export const allRoutes = new Hono();

allRoutes.use(logger());

allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);


