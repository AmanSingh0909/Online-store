const express = require('express');
const orderRoutes = require('./routes/order.routes');

const app = express();

app.use(express.json());
app.use('/orders', orderRoutes);

app.listen(5003, () => {
  console.log('Order Service running on port 5003');
});
