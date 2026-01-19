const express = require('express')
const proxy = require('express-http-proxy')

const gatewayAuth = require('./middleware/auth-middleware')

const app = express()

app.use('/orders', gatewayAuth);

// Forward user context + traceId to microservices
const forwardHeaders = (req, proxyReqOpts) => {
    proxyReqOpts.headers['x-user-id'] = req.user.userId;
    proxyReqOpts.headers['x-user-role'] = req.user.role;

    return proxyReqOpts;
};


app.use('/auth', proxy('http://localhost:5001'))
app.use('/orders', proxy('http://localhost:5003', {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) =>
        forwardHeaders(srcReq, proxyReqOpts)
}))

app.listen(3000, () => {
    console.log('API Gateway running on 3000')
})