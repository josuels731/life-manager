import { Response, Request } from 'express'
import Joi from 'joi';
import TagsModel, { TagType } from '../../model/tasks/Tag';

interface RequestNewTags extends Request {
    body: {
        user: string,
        title: string
    }
}
interface ResponseNewTags {
    error?: string,
    created?: {
        title: string,
    }
}
const newTag = async (req: RequestNewTags, res: Response<ResponseNewTags>) => {

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

interface RequestPending extends Request {
    body: undefined
}
interface ResponsePending {
    error?: string,
    tags?: TagType[]
}
const existing = async (_req: RequestPending, res: Response<ResponsePending>) => {

    try {
        const tags = await TagsModel.find({ finished: false }).lean().exec();

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

export { newTag, existing }