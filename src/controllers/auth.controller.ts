import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("client", "professional", "admin").required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export class AuthController {
  static async register(req: Request, res: Response) {
    const { error } = registerSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    try {
      const { name, email, password, role } = req.body;
      const user = await AuthService.register(name, email, password, role);

      res.status(201).json({ message: "usuário registrado com sucesso!" });
      return
    } catch (error) {
      res.status(400).json({ error: error.message });
      return;
    }
  }

  static async login(req: Request, res: Response) {
    const { error } = loginSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);

      res.json({ token });
      return;
    } catch (error) {
      res.status(401).json({ error: error.message });
      return;
    }
  }
}