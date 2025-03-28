import { serve } from '@hono/node-server'
import "dotenv/config";
import { allRoutes } from "./routes/routes";

serve(allRoutes, (info) => {
  console.log(`Server is running @ http://localhost:${info.port}`);
});

