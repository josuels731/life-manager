import { Router } from "express";
import { create, read, remove, update } from "../../controller/tasks/tags";

const tags = Router();

tags.post('/create', create);
tags.get('/read', read);
tags.get('/remove', remove);
tags.get('/update', update);

export default tags;