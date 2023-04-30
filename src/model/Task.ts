import { model, Schema } from 'mongoose';

interface Task {
  description: string,
  priority: number,
  dueDate: number,
  scheduledDate: number,
  category: string,
}

const TaskSchema = new Schema<Task>({
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Number,
    required: true,
  },
  scheduledDate: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
});

export default model<Task>('Tasks', TaskSchema);

export type { Task }