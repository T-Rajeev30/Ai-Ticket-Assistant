import express from "express";
import {
  getUser,
  login,
  logout,
  signup,
  updateUser,
} from "../controller/user.controller.js";
import { authentication } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/update-user", authentication, updateUser);
router.get("/users", authentication, getUser);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
