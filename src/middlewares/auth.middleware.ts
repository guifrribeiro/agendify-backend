import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;
  
  if (!authToken) {
    response.status(401).end(JSON.stringify({ error: "Token não fornecido "}));
    return;
  }

  const [, token] = authToken.split(" ");

  try {
    const decoded = verify(token, JWT_SECRET) as JwtPayload;

    request.user_id = decoded.sub;
    request.user_role = decoded.role;

    next();
  } catch (error) {
    console.log("ERRO: ", error.message);
    response.status(401).end(JSON.stringify({ message: "Token inválido"}));
    return;
  }
}