import express from "express";
import { addMessage, getAllMessage} from "../controller/messagesController.js";
const router = express.Router();

router.post("/addmsg/",addMessage);
router.post("/getmsg/",getAllMessage);


export default router;