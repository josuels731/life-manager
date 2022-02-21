import { Router } from "express";
import { create, read, readFinished, readNotFinished, remove, update } from "../../controller/tasks/tasks";
import tags from "./tags";

const tasks = Router();

tasks.post('/create', create);
tasks.get('/read', read);
tasks.get('/read/finished', readFinished);
tasks.get('/read/not-finished', readNotFinished);
tasks.get('/remove', remove);
tasks.get('/update', update);
tasks.use('/tags', tags)

export default tasks;