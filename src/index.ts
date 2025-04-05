import { serve } from '@hono/node-server'
//import "dotenv/config";
import { allRoutes } from "./routes/routes";
import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';

const app = new Hono();

app.get('/ui', swaggerUI({ url: '/doc' }))
export default app

serve(allRoutes, (info) => {
  console.log(`Server is running @ http://localhost:${info.port}`);
});

