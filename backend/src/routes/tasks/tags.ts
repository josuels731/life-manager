import { Router } from "express";
import { newTag, existing } from "../../controller/tasks/tags";

const tags = Router();

tags.post('/new', newTag);
tags.get('/existing', existing);

export default tags;