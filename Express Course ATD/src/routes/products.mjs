import { Router } from "express";

const router = Router();

// sub route
router.get("/api/products", (request, response) => {
  console.log(request.headers.cookie);
  console.log(request.cookies);
  console.log(request.signedCookies);
  if (request.signedCookies.Hello && request.signedCookies.Hello === "world")
    return response.send([{ id: 123, name: "Quest 3", price: "54000" }]);

  return response.status(403).send({ msg: "Send the Correct Cookies" });
});

export default router;
