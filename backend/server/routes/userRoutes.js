
import multer from "multer";
import express from "express"
import { register,login, setAvatar, getAllUsers,dp } from "../controller/usersController.js";
const router = express.Router();
const storage = multer.memoryStorage(); // You can also use diskStorage
const upload = multer({ storage });

router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar)
router.post("/upload/:id", upload.single("image"),dp)
router.get('/allUsers/:id',getAllUsers)

export default router;