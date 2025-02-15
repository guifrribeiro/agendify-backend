import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";

export class AppointmentController {
  static async create(request: Request, response: Response) {
    try {
      const { professionalId, date } = request.body;

      if (!professionalId || !date) {
        response.status(400).json({ message: "Missing required fields" });
        return;
      }

      const appointment = await AppointmentService.create(request.user_id, professionalId, new Date(date));

      response.status(201).json({ message: "Appointment created", appointment });
      return;
    } catch (error) {
      response.status(400).json({ message: error.message });
      return;
    }
  }

  static async listAppointments(request: Request, response: Response) {
    try {
      const appointments = await AppointmentService.listAppointmentsForUser(request.user_id);
      response.status(200).json(appointments);
      return;
    } catch (error) {
      response.status(400).json({ message: error.message });
      return;
    }
  }

  static async cancelAppointment(request: Request, response: Response) {
    try {
      const { appointmentId } = request.params;

      if (!appointmentId) {
        response.status(400).json({ message: "Missing required fields" });
        return;
      }

      await AppointmentService.cancelAppointment(parseInt(appointmentId));

      response.status(200).json({ message: "Appointment canceled" });
      return;
    } catch (error) {
      response.status(400).json({ message: error.message });
      return;
    }
  }
}