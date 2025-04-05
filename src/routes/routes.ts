import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';

import { authenticationRoutes } from './authentication-routes';
import { usersRoutes } from './users-routes';
import { postsRoutes } from './posts-routes';
import { likesRoutes } from './likes-routes';
import { commentsRoutes } from './comments-routes';

const allRoutes = new Hono();
const openapiRoutes = new Hono();

allRoutes.get('/ui', swaggerUI({ url: '/openapi.json' }));

allRoutes.route('/auth', authenticationRoutes);
allRoutes.route('/users', usersRoutes);
allRoutes.route('/posts', postsRoutes);
allRoutes.route('/likes', likesRoutes);
allRoutes.route('/comments', commentsRoutes);


allRoutes.get('/hello', (c) => {
    return c.json({ message: 'Hello World!' });
  });
  
allRoutes.get('/openapi.json', (c) =>
    c.json({
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
      },
      paths: {
        '/hello': {
          get: {
            summary: 'Say Hello',
            responses: {
              '200': {
                description: 'Success',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
  );

export { allRoutes };
export default openapiRoutes;
