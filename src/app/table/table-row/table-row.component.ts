import {Component, Input} from '@angular/core';
import {TaskModel} from '../../shared/task.model';
import {TaskService} from '../../shared/task.service';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent {

    @Input() task: TaskModel;
    @Input() index: number;

    deleteButtonVisible = false;

    constructor(private taskService: TaskService) {
    }

    checkboxChange(values: any): void {
        this.task.done = values.currentTarget.checked;
        this.taskService.updateTask(this.task);
    }

    priorityName(priority: number): string {
        return this.taskService.priorityName(priority);
    }

    onDelete(): void {
        this.taskService.deleteTask(this.task.id);
    }

    mouseEnter(): void {
        this.deleteButtonVisible = true;
    }

    mouseLeave(): void {
        this.deleteButtonVisible = false;
    }

}
