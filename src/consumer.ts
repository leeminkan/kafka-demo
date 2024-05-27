require("dotenv").config();

import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "clientId",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVER_ENDPOINT ?? ""],
});

const consumer = kafka.consumer({ groupId: "test-group" });
const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "kandeptrai", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
    },
  });
};

run().catch(console.error);
