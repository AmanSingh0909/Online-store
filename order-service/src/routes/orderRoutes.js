const express = require('express')
const { createOrder } = require('../controller/orderController')
const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router()

router.post('/',authMiddleware , createOrder)

module.exports = router