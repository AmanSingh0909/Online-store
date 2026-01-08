const { sendOrderEvent } = require("../kafka/producer")

const createOrder = async (req, res) => {
    try {
        const order = {
            id: Date.now(),
            userId: req.body.userId,
            amount: req.body.amount
        }

        await sendOrderEvent(order)

        res.status(201).json({
            message: 'Order created successfully',
            order
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createOrder }