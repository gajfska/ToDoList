import { v4 as uuidv4 } from 'uuid';

export class TaskModel {
    createdOn = new Date();
    id = uuidv4();

    taskName: string;
    priority: number;
    done: boolean;

    constructor(taskName: string, priority: number, done: boolean) {
        this.taskName = taskName;
        this.priority = priority;
        this.done = done;
    }
}
