const express = require('express') 
const proxy = require('express-http-proxy')

const app = express()

app.use('/auth', proxy('http://localhost:5001'))
app.use('/orders', proxy('http://localhost:5003'))


app.listen(3000, () => {
    console.log('API Gateway running on 3000')
})