# Hacker News BackEnd

## Assignment #008 - Major

This project replicates the core features of the "Hacker News" platform, implementing authentication, user management, posts, likes, and comments.

## Entities
The project includes the following entities:

- **User**
- **Post**
- **Like**
- **Comment**

## API Routes

### Authentication
- `GET /auth/sign-in` - Signs up a user (leverages JWT)
- `GET /auth/log-in` - Logs in a user (leverages JWT)

### Users
- `GET /users/me` - Returns the current user's details (based on JWT token)
- `GET /users` - Returns all users in alphabetical order of their names (paginated)

### Posts
- `GET /posts` - Returns all posts in reverse chronological order (paginated)
- `GET /posts/me` - Returns all posts in reverse chronological order of the current user (paginated)
- `POST /posts` - Creates a post (authored by the current user)
- `DELETE /posts/:postId` - Deletes a post (if owned by the current user)

### Likes
- `GET /likes/on/:postId` - Returns all likes on a post (reverse chronological order, paginated)
- `POST /likes/on/:postId` - Creates a like on a post (only one like per user per post)
- `DELETE /likes/on/:postId` - Deletes a like (if owned by the current user)

### Comments
- `GET /comments/on/:postId` - Returns all comments on a post (reverse chronological order, paginated)
- `POST /comments/on/:postId` - Creates a comment on a post
- `DELETE /comments/:commentId` - Deletes a comment (if owned by the current user)
- `PATCH /comments/:commentId` - Updates a comment's text (if owned by the current user)

