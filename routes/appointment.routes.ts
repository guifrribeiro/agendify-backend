import { Router } from "express";
import { ensureAuthenticated } from "../src/middlewares/auth.middleware";
import { AppointmentController } from "../src/controllers/appointment.controller";
import { ensureRole } from "../src/middlewares/user.middleware";

const appointmentRoutes = Router();

appointmentRoutes.post("/", ensureAuthenticated, ensureRole("client"), AppointmentController.create);
appointmentRoutes.get("/", ensureAuthenticated, AppointmentController.listAppointments);
appointmentRoutes.put("/cancel/:appointmentId", ensureAuthenticated, AppointmentController.cancelAppointment);

export { appointmentRoutes };