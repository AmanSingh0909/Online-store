const Kafka = require('kafkajs')

const kafka = new Kafka({
    clientId: 'payment-service',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({
    groupId: 'payment-group'
})

const run = async (req, res) => {
    await consumer.connect()
    await consumer.sucscribe({
        topic: 'order-created'
    })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const order = JSON.parse(message.value.toString())
            console.log('Payment processing for order:', order.id)
        }
    })
}

run()