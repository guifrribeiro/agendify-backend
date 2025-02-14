import { NextFunction, Request, response, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, reponse: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    response.status(401).end({ error: "Token não fornecido "});
    return;
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "7d939c306a1c22d7eaccab5ad1be6fcf") as IPayload;
    request.user_id = sub;

    return next();
  } catch (error) {
    response.status(401).end({ error: "Token não fornecido "});
    return;
  }
}