import { Response, Request } from 'express'
import Joi from 'joi';
import { Types } from 'mongoose';
import UserModel from '../model/users/User';

interface RequestLogin extends Request {
    body: {
        username: string,
        password: string
    }
}
interface ResponseLogin {
    error?: string,
    authorized?: boolean
}
const login = async (req: RequestLogin, res: Response<ResponseLogin>) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send({ error: validation.error.message });
        return;
    }

    try {
        const exists = await UserModel.exists(req.body);
        if (!exists) {
            res.status(401).send({ error: '"username" or "password" incorrects' })
            return;
        }

        res.status(200).send({ authorized: true })
        return;
    } catch (e) {
        if (e instanceof Error)
            res.status(500).send({ error: `Internal Error: ${e.message}` })
        else
            res.status(500).send({ error: `Internal Error: Unknown` })
    }

}

interface RequestNewUser extends Request {
    body: {
        name: string,
        email: string,
        username: string,
        password: string,
        birth: Date,
    }
}
interface ResponseNewUser {
    error?: string,
    created?: {
        username: string,
        id: Types.ObjectId
    }
}
const newUser = async (req: RequestNewUser, res: Response<ResponseNewUser>) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        username: Joi.string().required().min(5).max(50),
        password: Joi.string().required().min(8).max(24).regex(/[A-Z]/).regex(/[a-z]/).regex(/\d/).regex(/\W/),
        birth: Joi.date().required().iso()
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send({ error: validation.error.message });
        return;
    }

    try {
        const emailExists = await UserModel.exists({ email: req.body.email });
        if (emailExists) {
            res.status(401).send({ error: '"email" already exists' });
            return;
        }

        const username = await UserModel.exists({ username: req.body.username });
        if (username) {
            res.status(401).send({ error: '"username" already exists' });
            return;
        }

        const newUser = await new UserModel({ ...req.body, joinedAt: new Date() }).save();

        res.status(200).send({
            created: {
                id: newUser._id,
                username: newUser.username
            }
        })
    } catch (e) {
        if (e instanceof Error)
            res.status(500).send({ error: `Internal Error: ${e.message}` })
        else
            res.status(500).send({ error: `Internal Error: Unknown` })
    }

}
export { login, newUser }