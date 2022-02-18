import { Router } from "express";
import { newTask, pending } from "../../controller/tasks/tasks";
import tags from "./tags";

const tasks = Router();

tasks.post('/new', newTask);
tasks.get('/pending', pending);
tasks.use('/tags', tags)

export default tasks;