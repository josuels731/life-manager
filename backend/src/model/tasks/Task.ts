import { model, Schema } from "mongoose";

type TaskType = {
    user: Schema.Types.ObjectId,
    parent?: Schema.Types.ObjectId,
    finished: boolean,
    title: string,
    description: string,
    tags: Schema.Types.ObjectId[]
    priority: number,
    createdAt: Date
    finishedAt?: Date,
    dueAt?: Date,
};

const TaskModel = model<TaskType>(
    'Task',
    new Schema<TaskType>({
        user: {
            required: true,
            type: Schema.Types.ObjectId,
            index: true
        },
        parent: {
            required: false,
            type: Schema.Types.ObjectId,
            index: true
        },
        finished: {
            required: true,
            type: Boolean
        },
        title: {
            required: true,
            type: String
        },
        description: {
            required: true,
            type: String
        },
        tags: {
            required: true,
            type: [Schema.Types.ObjectId],
            index: true
        },
        priority: {
            required: true,
            type: Number
        },
        createdAt: {
            required: true,
            type: Date
        },
        finishedAt: {
            required: false,
            type: Date
        },
        dueAt: {
            required: false,
            type: Date
        }
    }, {})
);

export default TaskModel
export type { TaskType }