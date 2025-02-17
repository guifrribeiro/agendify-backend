import amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

export const sendMessage = async (queue: string, message: string) => {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  
  await channel.assertQueue(queue, { durable: true});
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  setTimeout(() => {
    connection.close();
  }, 500);
  
  await channel.close();
};

export const receiveMessage = async (queue: string, callback: (message: any) => void) => {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  
  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, (message) => {
    if (message) {
      callback(JSON.parse(message.content.toString()));
      channel.ack(message);
    }
  });
};