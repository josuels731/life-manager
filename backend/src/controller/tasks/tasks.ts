import { Response, Request } from 'express'
import Joi from 'joi';
import TaskModel, { TaskType } from '../../model/tasks/Task';

interface RequestCreate extends Request {
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
interface ResponseCreate {
    error?: string,
    created?: {
        title: string,
    }
}
const create = async (req: RequestCreate, res: Response<ResponseCreate>) => {

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

interface RequestRead extends Request {
    body: undefined
}
interface ResponseRead {
    error?: string,
    tasks?: TaskType[]
}
const read = async (_req: RequestRead, res: Response<ResponseRead>) => {

    try {
        const pending = await TaskModel.find().lean().exec();

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

interface RequestReadNotFinished extends Request {
    body: undefined
}
interface ResponseReadNotFinished {
    error?: string,
    tasks?: TaskType[]
}
const readNotFinished = async (_req: RequestReadNotFinished, res: Response<ResponseReadNotFinished>) => {

    try {
        const notFinished = await TaskModel.find({ finished: false }).lean().exec();

        res.status(200).send({
            tasks: notFinished
        })
    } catch (e) {
        if (e instanceof Error)
            res.status(500).send({ error: `Internal Error: ${e.message}` })
        else
            res.status(500).send({ error: `Internal Error: Unknown` })
    }
}

interface RequestReadFinished extends Request {
    body: undefined
}
interface ResponseReadFinished {
    error?: string,
    tasks?: TaskType[]
}
const readFinished = async (_req: RequestReadFinished, res: Response<ResponseReadFinished>) => {

    try {
        const finished = await TaskModel.find({ finished: true }).lean().exec();

        res.status(200).send({
            tasks: finished
        })
    } catch (e) {
        if (e instanceof Error)
            res.status(500).send({ error: `Internal Error: ${e.message}` })
        else
            res.status(500).send({ error: `Internal Error: Unknown` })
    }
}


interface RequestRemove extends Request {
    body: {
        id: string
    }
}
interface ResponseRemove {
    error?: string,
}
const remove = async (req: RequestRemove, res: Response<ResponseRemove>) => {

    const schema = Joi.object({
        id: Joi.string().required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send({ error: validation.error.message });
        return;
    }

    try {
        await TaskModel.findByIdAndDelete(req.body.id);

        res.status(200).send({});
    } catch (e) {
        if (e instanceof Error)
            res.status(500).send({ error: `Internal Error: ${e.message}` })
        else
            res.status(500).send({ error: `Internal Error: Unknown` })
    }
}

interface RequestUpdate extends Request {
    body: {
        id: string,
        user?: string,
        parent?: string,
        finished?: boolean,
        title?: string,
        description?: string,
        tags?: string[]
        priority?: number,
        createdAt?: Date
        finishedAt?: Date,
        dueAt?: Date,
    }
}
interface ResponseUpdate {
    error?: string,
}
const update = async (req: RequestUpdate, res: Response<ResponseUpdate>) => {

    const schema = Joi.object({
        id: Joi.string().required(),
        user: Joi.string(),
        parent: Joi.string(),
        finiched: Joi.boolean(),
        title: Joi.string(),
        description: Joi.string(),
        tags: Joi.array().items(Joi.string()),
        priority: Joi.number(),
        createdAt: Joi.date().iso(),
        finishedAt: Joi.date().iso(),
        dueAt: Joi.date().iso(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send({ error: validation.error.message });
        return;
    }

    try {
        await TaskModel.findByIdAndUpdate(req.body.id, { ...req.body });

        res.status(200).send({})
    } catch (e) {
        if (e instanceof Error)
            res.status(500).send({ error: `Internal Error: ${e.message}` })
        else
            res.status(500).send({ error: `Internal Error: Unknown` })
    }
}

export { create, read, readNotFinished, readFinished, remove, update }