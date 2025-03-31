

import express from "express"
import { register,login, setAvatar, getAllUsers } from "../controller/usersController.js";
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar)
router.get('/allUsers/:id',getAllUsers)

export default router;