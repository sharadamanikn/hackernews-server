import { serve } from '@hono/node-server';
import { allRoutes } from "./routes/routes";
import openapiRoutes from './routes/routes';
import { Hono } from 'hono';

const app = new Hono();

app.route('/', allRoutes);
app.route('/', openapiRoutes);



serve(app, (info) => {
  console.log(`Server is running @ http://localhost:${info.port}`);
});
