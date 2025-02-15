import { AppointmentRepository } from "../repositories/appointment.repository";

export class AppointmentService {
  static async create(clientId: string, professionalId: string, date: Date) {
    const existingAppointment = await AppointmentRepository.findByDateAndProfessional(date, professionalId);
    
    if (existingAppointment) {
      throw new Error("Appointment already exists for this professional on this date");
    }

    return await AppointmentRepository.createAppointment(clientId, professionalId, date);
  }

  static async listAppointmentsForUser(userId: string) {
    return await AppointmentRepository.listAppointmentsForUser(userId);
  }

  static async cancelAppointment(appointmentId: number) {
    const appointment = await AppointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    const limitDateCancel = new Date(appointment.date);
    limitDateCancel.setHours(limitDateCancel.getHours() - 2);

    if (new Date() > limitDateCancel) {
      throw new Error("You can't cancel an appointment with less than 2 hours before it starts");
    }

    return await AppointmentRepository.updateStatusAppointment(appointmentId, "canceled");
  }
}