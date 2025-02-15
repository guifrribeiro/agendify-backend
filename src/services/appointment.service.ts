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
}