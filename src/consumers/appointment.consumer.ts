import { receiveMessage } from "../utils/messaging";

const processAppointmentCreated = (appointment: any) => {
  console.log("New appointment created", appointment);
};

const processAppointmentCanceled = (appointment: any) => {
  console.log("Appointment canceled", appointment);
};

receiveMessage("appointment_created", processAppointmentCreated);
receiveMessage("appointment_canceled", processAppointmentCanceled);