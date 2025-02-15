import { Router } from "express";
import { ensureAuthenticated } from "../src/middlewares/auth.middleware";
import { AppointmentController } from "../src/controllers/appointment.controller";

const appointmentRoutes = Router();

appointmentRoutes.post("/", ensureAuthenticated, AppointmentController.create);
appointmentRoutes.get("/", ensureAuthenticated, AppointmentController.listAppointments);

export { appointmentRoutes };