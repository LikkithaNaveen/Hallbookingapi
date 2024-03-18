const express = require('express');
const AppRoutes = require('./bookingdetails/routes/index')
const app = express();

app.use(express.json());
app.use('/',AppRoutes)


app.listen(8000, ()=> console.log("Server listening to port 8000"));