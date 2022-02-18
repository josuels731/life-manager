import { Response, Request } from 'express'
import Joi from 'joi';
import TaskModel from '../model/tasks/Task';

interface RequestNewTask extends Request {
    body: {
        user: string,
        parent?: string,
        title: string,
        description: string,
        tags: string[]
        priority: number,
        dueAt?: Date,
    }
}
interface ResponseNewTask {
    error?: string,
    created?: {
        title: string,
    }
}
const newTask = async (req: RequestNewTask, res: Response<ResponseNewTask>) => {

    const schema = Joi.object({
        user: Joi.string().required(),
        parent: Joi.string(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        priority: Joi.number().required(),
        dueAt: Joi.date().iso(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send({ error: validation.error.message });
        return;
    }

    try {
        const newTask = await new TaskModel({ ...req.body, createdAt: new Date(), finished: false }).save();

        res.status(200).send({
            created: {
                title: newTask.title
            }
        })
    } catch (e) {
        if (e instanceof Error)
            res.status(500).send({ error: `Internal Error: ${e.message}` })
        else
            res.status(500).send({ error: `Internal Error: Unknown` })
    }

}
export { newTask }