import express from "express";
import { codingQuotes } from "./codingQotes.mjs";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, userName: "divyansh", displayName: "DJ" },
  { id: 2, userName: "mj", displayName: "MJ" },
  { id: 3, userName: "sj", displayName: "SJ" },
  { id: 4, userName: "cj", displayName: "CJ" },
];

// Get request
// Route
app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello" });
});

// Query Params
app.get("/api/users", (request, response) => {
  const {
    query: { filter, value },
  } = request;

  if (!filter && !value) return response.send(mockUsers);

  if (filter && value) {
    const filteredUsers = mockUsers.filter((user) => {
      if (user[filter]) {
        return user[filter].includes(value);
      }
      return false;
    });

    if (filteredUsers.length === 0) {
      return response.status(404).send({ msg: "No users found" });
    }

    return response.send(filteredUsers);
  }

  return response
    .status(400)
    .send({ msg: "Bad Request: Missing filter or value" });
});

// Post request
app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

// Route Params
app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) return response.status(400).send({ msg: "Bad Request" });
  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

// sub route
app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "Quest 3", price: "54000" }]);
});

// Coding Quotes API
function getRandomNumber() {
  return Math.floor(Math.random() * 201);
}

app.get("/api/quotes", (request, response) => {
  const quote = codingQuotes[getRandomNumber()].quote;
  response.send({ quote });
});

// Put request
app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (NaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
