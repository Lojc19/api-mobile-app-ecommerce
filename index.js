const bodyParser = require("body-parser");
const express = require('express')
const db = require('./src/config/db/connect');
const app = express()
const dotenv = require("dotenv").config()
const port = process.env.PORT || 4000
const userRouter = require('./src/app/routes/user.route')
const productRouter = require('./src/app/routes/product.route');
const roomRouter = require('./src/app/routes/room.route');
const cateRouter = require('./src/app/routes/category.route');


const { errorHandler, notFound } = require('./src/app/middlewares/errorHandler');

//conect
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/room", roomRouter);
app.use("/api/category", cateRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})