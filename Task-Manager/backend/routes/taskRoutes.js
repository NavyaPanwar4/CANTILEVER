import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", createTask);       
router.get("/", getTasks);          
router.put("/:id", updateTask);     
router.delete("/:id", deleteTask); 

export default router;
