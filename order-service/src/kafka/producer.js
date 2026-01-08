const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

const sendOrderEvent = async (order) => {
    await producer.connect()

    await producer.send({
        topic : 'order-created', 
        messages: [{ value: JSON.stringify(order)}]
    })
}

module.exports = { sendOrderEvent }