import { model, Schema } from "mongoose";

type UserType = {
    name: string,
    email: string,
    username: string,
    password: string,
    birth: Date,
    joinedAt: Date
};

const UserModel = model<UserType>(
    'User',
    new Schema<UserType>({
        name: {
            required: true,
            type: String,
        },
        email: {
            required: true,
            type: String,
            unique: true
        },
        username: {
            required: true,
            type: String,
            unique: true
        },
        password: {
            required: true,
            type: String
        },
        birth: {
            required: true,
            type: Date
        },
        joinedAt: {
            required: true,
            type: Date
        },
    }, {})
);
export default UserModel;
export type { UserType };