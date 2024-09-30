import { Router } from "express";
import { mockUsers } from "../utils/constants.mjs";
import { resolveIndexByUId } from "../utils/middlewares.mjs";

const router = Router();

// Route Params
router.get("/api/users/:id", resolveIndexByUId, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

// Query Params
router.get("/api/users", (request, response) => {
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
router.post("/api/users", (req, res) => {
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

// Put request
router.put("/api/users/:id", resolveIndexByUId, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };

  return res.sendStatus(200);
});

// Patch Requests
router.patch("/api/users/:id", resolveIndexByUId, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return res.sendStatus(200);
});

// Delete Request
router.delete("/api/users/:id", resolveIndexByUId, (req, res) => {
  const { findUserIndex } = req;

  mockUsers.splice(findUserIndex, 1);

  return res.sendStatus(200);
});

export default router;
