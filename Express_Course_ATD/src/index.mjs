import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import { query } from "express-validator";

const app = express();
app.use(express.json());
app.use(cookieParser("secret"));
app.use(routes);

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

