import express from "express";
import handlers from "../handlers/index.js";
import verifyAuth from "../middleware/verifyAuth.js";
const userHandler = handlers.userHandler;

var router = express.Router();

router.post("/register", (req, res) => {
  userHandler.register(req, res);
});

router.post("/login", (req, res) => {
  userHandler.login(req, res);
});

router.post("/follow", verifyAuth, (req, res) => {
  userHandler.followUser(req, res);
});
export default router;
