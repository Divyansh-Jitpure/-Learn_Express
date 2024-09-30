import express from "express";
import usersRouter from "./routes/users.mjs";
import qotesAPIRouter from "./routes/quotesAPI.mjs";
import productsRouter from "./routes/products.mjs";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser("secret"));
app.use(usersRouter);
app.use(qotesAPIRouter);
app.use(productsRouter);

// Middleware Example
// const loggingMiddleware = (req, res, next) => {
//   console.log(`${req.method} - ${req.url}`);
//   next();
// };

// app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;

// Get request
// Route
app.get("/", (request, response) => {
  response.cookie("Hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
