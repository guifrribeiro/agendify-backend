import { Router } from "express";
import { AuthController } from "../src/controllers/auth.controller";
import { AppointmentController } from "../src/controllers/appointment.controller";
import { ensureAuthenticated } from "../src/middlewares/auth.middleware";

const authRoutes = Router();
const appointmentRoutes = Router();

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);



export { authRoutes };