import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "divyansh", displayName: "DJ" },
  { id: 2, username: "mj", displayName: "MJ" },
  { id: 3, username: "sj", displayName: "SJ" },
  { id: 4, username: "cj", displayName: "CJ" },
];

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello" });
});

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

app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) return response.status(400).send({ msg: "Bad Request" });
  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "Quest 3", price: "54000" }]);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
