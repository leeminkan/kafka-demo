require("dotenv").config();

import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: "clientId",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVER_ENDPOINT ?? ""],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: "kandeptrai",
    messages: [
      {
        key: "a3333",
        value: "Chắc chắn là như vậy rồi - 2!",
      },
    ],
  });
};

run().catch(console.error);
