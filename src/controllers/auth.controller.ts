import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const user = await AuthService.register(name, email, password, role);

      res.status(201).json({ message: "usuário registrado com sucesso!" });
      return
    } catch (error) {
      res.status(400).json({ error: error });
      return;
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);

      res.json({ token });
      return;
    } catch (error) {
      res.status(401).json({ error: error });
      return;
    }
  }
}