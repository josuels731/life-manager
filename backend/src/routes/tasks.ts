import { Router } from "express";
import { newTask } from "../controller/tasks";

const tasks = Router();

tasks.post('/new', newTask);

export default tasks;