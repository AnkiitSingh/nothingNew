require("dotenv").config();

const mongoose = require("mongoose"),
  express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  cors = require("cors");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes imported from router folder
const productRoutes = require("./routes/categoryRoutes");
const categoryRoutes = require("./routes/productRoutes");

//My Routes
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);

//PORT
const port = process.env.PORT || 8000;

//APP MOUNT POINT
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
