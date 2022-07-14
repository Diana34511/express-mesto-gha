const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.user = {
//     _id: "62d0452e6ffc4f883e578938", // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });
app.use("/users", usersRouter);

mongoose.connect(
  "mongodb://localhost:27017/mestodb",
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log("Connected to MongoDB");
  }
);

app.listen(PORT);
