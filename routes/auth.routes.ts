import { Router } from "express";
import { AuthController } from "../src/controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", AuthController.register);

export { authRoutes };