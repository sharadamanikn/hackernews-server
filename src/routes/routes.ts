import { Hono } from "hono";
import { logger } from "hono/logger";
import { authenticationRoutes } from "./authentication-routes";
import { usersRoutes } from "./users-routes";
import {postsRoutes} from "./posts-routes";
import {likesRoutes} from "./likes-routes";
import {commentsRoutes} from "./comments-routes";

export const allRoutes = new Hono();

allRoutes.use(logger());

allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likesRoutes);
allRoutes.route("/comments", commentsRoutes);


