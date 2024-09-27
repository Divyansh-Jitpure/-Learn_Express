import express from "express";
import usersRouter from "./routes/users.mjs";
import qotesAPIRouter from "./routes/quotesAPI.mjs";

const app = express();
app.use(express.json());
app.use(usersRouter);
app.use(qotesAPIRouter);

// const loggingMiddleware = (req, res, next) => {
//   console.log(`${req.method} - ${req.url}`);
//   next();
// };

// app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;

// Get request
// Route
app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello" });
});

// sub route
app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "Quest 3", price: "54000" }]);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
