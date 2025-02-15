import { NextFunction, Request, Response } from "express";

export function ensureRole(role: "client" | "professional") {
  return (request: Request, response: Response, next: NextFunction) => {
    if (request.user_role !== role) {
      response.status(403).end(JSON.stringify({ error: "Acesso negado"}));
      return;
    }

    next();
  }
}