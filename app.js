require("dotenv").config();

const mongoose = require("mongoose"),
  express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  cors = require("cors"),
  Category = require("./models/categorySchema"),
  Product = require("./models/productSchema");
User = require("./models/userSchema");
//view endine Set
app.set("view engine", "ejs");

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

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

//Middlewares
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes imported from router folder
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes")
//My Routes
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);

//Home Page

app.get("/", async (req, res) => {
  const categories = await Category.find();
  const products = await Product.find();
  res.render("index.ejs", { categories });
});

//PORT
const port = process.env.PORT || 8000;

//APP MOUNT POINT
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
