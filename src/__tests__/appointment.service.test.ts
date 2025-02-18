import { AppointmentService } from "../services/appointment.service";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { describe, expect, it, jest } from '@jest/globals';
import { beforeEach } from "node:test";

jest.mock("../repositories/appointment.repository", () => {
  return {
    AppointmentRepository: {
      createAppointment: jest.fn(),
      listAppointmentsForUser: jest.fn(),
      findByDateAndProfessional: jest.fn(),
    },
  };
});

const mockedAppointmentRepository = AppointmentRepository as jest.Mocked<typeof AppointmentRepository>;

describe("AppointmentService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an appointment", async () => {
    const mockAppointment = { id: 999, professionalId: "prof1", clientId: "prof1", date: new Date(), status: "PENDING" };
    mockedAppointmentRepository.createAppointment.mockResolvedValue(mockAppointment);
    mockedAppointmentRepository.findByDateAndProfessional.mockResolvedValue(null);

    const appointment = await AppointmentService.create("client1", "prof1", new Date());

    expect(appointment).toEqual(mockAppointment);
    expect(AppointmentRepository.createAppointment).toHaveBeenCalledWith("client1", "prof1", expect.any(Date));
  });

  it("should list appointments for a user", async () => {
    const mockAppointments = [{ id: 1, clientId: "client1", professionalId: "prof1", date: new Date(), status: "PENDING" }];
    mockedAppointmentRepository.listAppointmentsForUser.mockResolvedValue(mockAppointments);

    const appointments = await AppointmentService.listAppointmentsForUser("client1");

    expect(appointments).toEqual(mockAppointments);
    expect(AppointmentRepository.listAppointmentsForUser).toHaveBeenCalledWith("client1", 10, 0);
  });

});