import { login, create } from "../../controller/users/users";
import { Router } from "express";

const users = Router();

users.post('/login', login);
users.post('/create', create);

export default users;