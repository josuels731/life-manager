import { model, Schema } from "mongoose";

type TagType = {
    user: Schema.Types.ObjectId,
    title: string
};

const TagModel = model<TagType>(
    'Tag',
    new Schema<TagType>({
        user: {
            required: true,
            type: Schema.Types.ObjectId,
            index: true
        },
        title: {
            required: true,
            type: String
        }
    }, {})
);

export default TagModel;
export type { TagType };