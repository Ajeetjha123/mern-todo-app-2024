import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller.js";
import authanticate from "../middleware/authorize.js";
const router = Router();
router.post("/create", authanticate, createTodo);
router.get("/fetch", authanticate, getTodos);
router.put("/update/:id", authanticate, updateTodo);
router.delete("/delete/:id", authanticate, deleteTodo);

export default router;
