import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config";
//import { jwtSecretKey } from '../environment';
//const app = new Hono()
//import jwt from "jsonwebtoken";
import { allRoutes } from "./routes/routes";

//console.log("JWT Secret Key:", jwtSecretKey);


/*
const payload: jwt.JwtPayload = {
  iss: "https://purpleshorts.co.in",
  sub: "Sharadamanikn",
};
const token = jwt.sign(payload, jwtSecretKey, {
  algorithm: "HS256",
  expiresIn: "30d", 
});
console.log("Token: ",token);
try {
  const decoded = jwt.verify(token, jwtSecretKey);
  console.log("Decoded Payload", decoded);
} catch (e) {
  console.log("Error", e);
}
*/

serve(allRoutes, (info) => {
  console.log(`Server is running @ http://localhost:${info.port}`);
});

