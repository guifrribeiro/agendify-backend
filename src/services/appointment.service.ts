import { AppointmentRepository } from "../repositories/appointment.repository";
import { deleteCache, getCache, setCache } from "../utils/cache";
import { sendMessage } from "../utils/messaging";

export class AppointmentService {
  static async create(clientId: string, professionalId: string, date: Date) {
    const existingAppointment = await AppointmentRepository.findByDateAndProfessional(date, professionalId);
    
    if (existingAppointment) {
      throw new Error("Appointment already exists for this professional on this date");
    }

    const appointment = await AppointmentRepository.createAppointment(clientId, professionalId, date);
    await sendMessage("appointment_created", JSON.stringify(appointment));

    return appointment;
  }

  static async listAppointmentsForUser(userId: string, page: number = 1, limit: number = 10) {
    const cacheKey = `appointments_${userId}_${page}_${limit}`;
    const cachedAppointments = getCache(cacheKey);

    if (cachedAppointments) {
      return cachedAppointments;
    }
    
    const offset = (page - 1) * limit;
    const appointments = await AppointmentRepository.listAppointmentsForUser(userId, limit, offset);

    setCache(cacheKey, appointments);

    return appointments;
  }

  static async cancelAppointment(appointmentId: number, userId: string, userRole: string) {
    const appointment = await AppointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if ((userRole === "client" && appointment.clientId !== userId) || (userRole === "professional" && appointment.professionalId !== userId)) {
      throw new Error("You don't have permission to cancel this appointment");
    }

    const limitDateCancel = new Date(appointment.date);
    limitDateCancel.setHours(limitDateCancel.getHours() - 2);

    if (new Date() > limitDateCancel) {
      throw new Error("You can't cancel an appointment with less than 2 hours before it starts");
    }

    const updatedAppointment = await AppointmentRepository.updateStatusAppointment(appointmentId, "canceled");
    deleteCache(`aaappointments_${userId}_*`);
    await sendMessage("appointment_canceled", JSON.stringify(updatedAppointment));

    return updatedAppointment;
  }
}