import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TaskService} from '../shared/task.service';
import {TaskModel} from '../shared/task.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

    @ViewChild('f', { static: false }) slForm: NgForm;

    priority;

    constructor(private taskService: TaskService) {}

    onSubmit(form: NgForm): void {
        const value = form.value;
        const nameTask = this.capitalizeFirstLetter(value.name.trim());
        const priority: number = Number(value.priority);
        const newTask = new TaskModel(nameTask, priority, false);

        this.taskService.addTask(newTask);
        form.resetForm();
    }

    priorityName(priority: number): string {
        return this.taskService.priorityName(priority);
    }

    capitalizeFirstLetter(name: string): string {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

}
