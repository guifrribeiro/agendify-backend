import { prisma } from "../prisma";

export class AppointmentRepository {
  static async createAppointment(clientId: string, professionalId: string, date: Date) {
    return await prisma.appointment.create({
      data: { clientId, professionalId, date }
    });
  }

  static async findByDateAndProfessional(date: Date, professionalId: string) {
    return prisma.appointment.findFirst({ where: { date, professionalId } });
  }

  static async listAppointmentsForUser(userId: string, limit: number, offset: number) {
    return prisma.appointment.findMany({
      where: {
        OR: [{ clientId: userId }, { professionalId: userId }],
      },
      orderBy: { date: "asc" },
      take: limit,
      skip: offset,
    });
  }

  static async findById(appointmentId: number) {
    return prisma.appointment.findFirst({ where: { id: appointmentId } });
  }

  static async updateStatusAppointment(appointmentId: number, status: string) {
    return prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: status },
    })
  }
}