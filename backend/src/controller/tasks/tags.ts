import { Response, Request } from 'express'
import Joi from 'joi';
import TagsModel, { TagType } from '../../model/tasks/Tag';

interface RequestCreate extends Request {
    body: {
        user: string,
        title: string
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
        title: Joi.string().required().max(25),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send({ error: validation.error.message });
        return;
    }

    try {
        const newTag = await new TagsModel({ ...req.body }).save();

        res.status(200).send({
            created: {
                title: newTag.title
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
    tags?: TagType[]
}
const read = async (_req: RequestRead, res: Response<ResponseRead>) => {
    try {
        const tags = await TagsModel.find().lean().exec();

        res.status(200).send({
            tags
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
    tags?: TagType[]
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
        await TagsModel.findByIdAndDelete(req.body.id);

        const tags = await TagsModel.find().lean().exec();

        res.status(200).send({
            tags
        });
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
        title?: string
    }
}
interface ResponseUpdate {
    error?: string,
}
const update = async (req: RequestUpdate, res: Response<ResponseUpdate>) => {

    const schema = Joi.object({
        id: Joi.string().required(),
        user: Joi.string(),
        title: Joi.string().max(25),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send({ error: validation.error.message });
        return;
    }

    try {
        await TagsModel.findByIdAndUpdate(req.body.id, { ...req.body });

        res.status(200).send({})
    } catch (e) {
        if (e instanceof Error)
            res.status(500).send({ error: `Internal Error: ${e.message}` })
        else
            res.status(500).send({ error: `Internal Error: Unknown` })
    }
}

export { create, read, remove, update }