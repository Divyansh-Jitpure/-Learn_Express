import { Router } from "express";

const router = Router();

// sub route
router.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "Quest 3", price: "54000" }]);
});

export default router;
