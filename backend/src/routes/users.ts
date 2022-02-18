import { login, newUser } from "../controller/users";
import { Router } from "express";

const users = Router();

users.post('/login', login);
users.post('/new', newUser);

export default users;