import { Response, Request } from 'express'
import Joi from 'joi';
import TaskModel, { TaskType } from '../../model/tasks/Task';

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

interface RequestPending extends Request {
    body: undefined
}
interface ResponsePending {
    error?: string,
    tasks?: TaskType[]
}
const pending = async (_req: RequestPending, res: Response<ResponsePending>) => {

    try {
        const pending = await TaskModel.find({ finished: false }).lean().exec();

        res.status(200).send({
            tasks: pending
        })
    } catch (e) {
        if (e instanceof Error)
            res.status(500).send({ error: `Internal Error: ${e.message}` })
        else
            res.status(500).send({ error: `Internal Error: Unknown` })
    }

}

export { newTask, pending }