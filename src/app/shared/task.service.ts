import {TaskModel} from './task.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {SortOder} from '../table/table.component';


@Injectable({providedIn: 'root'})
export class TaskService {
    taskCreatedOnKey = 'createdOn';

    tasksChangedSubject = new Subject<TaskModel[]>();
    sortBy = this.taskCreatedOnKey;
    sortOrder: SortOder = SortOder.none;

    private tasksArray: TaskModel[] = [];
    private exampleArray: TaskModel[] = [
        new TaskModel('Feed turtle', 3, false),
        new TaskModel('Vacuum', 2, false),
        new TaskModel('Wash the dishes', 2, false),
        new TaskModel('Exercise', 1, false),
        new TaskModel('Make dinner', 3, false),
        new TaskModel('Do the laundry', 1, false),
        new TaskModel('Water the flowers', 1, false),
        new TaskModel('Do shopping', 1, false)
    ];

    private localStorageName = 'localStorageDB';

    priorityName(priority: number): string {
        switch (priority) {
            case 1:
                return 'Low';
            case 2:
                return 'Medium';
            case 3:
                return 'High';
            default:
                return 'Unknown';
        }
    }

    initTasks(): void {
        const retrievedObject = localStorage.getItem(this.localStorageName);
        const tasksLoadedFromMemory: Array<TaskModel> = JSON.parse(retrievedObject);
        this.tasksArray = tasksLoadedFromMemory || this.exampleArray;

        this.updateTasksList();
    }

    updateTask(task: TaskModel): void {
        const updateIndex = this.tasksArray.map((item) => {
            return item.id;
        }).indexOf(task.id);

        this.tasksArray[updateIndex].done = task.done;
        this.updateTasksList();
    }

    addTask(task: TaskModel): void {
        this.tasksArray.push(task);
        this.updateTasksList();
    }

    deleteTask(wantedId: string): void {
        const removeIndex = this.tasksArray.map((item) => {
            return item.id;
        }).indexOf(wantedId);

        this.tasksArray.splice(removeIndex, 1);
        this.updateTasksList();
    }

    updateTasksList(): void {
        const sortedArray = this.sortedData(this.sortBy, this.sortOrder);
        this.tasksChangedSubject.next(sortedArray.slice());

        localStorage.setItem(this.localStorageName, JSON.stringify(sortedArray));
    }

    // MARK: Sorting

    updateSortingTypes(sortByType: string): void {
        const shouldResetSortByType = sortByType !== this.sortBy;
        if (shouldResetSortByType) {
            this.sortOrder = SortOder.none;
        }

        this.sortBy = sortByType;
        this.changeSortingOrder();

        this.performSorting(this.sortBy, this.sortOrder);
    }

    changeSortingOrder(): void {
        switch (this.sortOrder) {
            case SortOder.none:
                this.sortOrder = SortOder.ascending;
                break;
            case SortOder.ascending:
                this.sortOrder = SortOder.descending;
                break;
            case SortOder.descending:
                this.sortOrder = SortOder.none;
                this.sortBy = null;
                break;
        }
    }

    performSorting(sortByType: string, sortOrder: SortOder): void {
        let sortedArray: TaskModel[] = [];
        if (sortOrder === SortOder.none) {
            sortedArray = this.sortedData(this.taskCreatedOnKey, sortOrder);
        } else {
            sortedArray = this.sortedData(sortByType, sortOrder);
        }

        this.tasksArray = sortedArray;
        localStorage.setItem('localObject', JSON.stringify(this.tasksArray));
        this.tasksChangedSubject.next(this.tasksArray);
    }

    sortedData(sortByType: string, sortOrder: SortOder): TaskModel[] {
        const currentArray = this.tasksArray.slice();
        return currentArray.sort((a, b) => {
            if (a[sortByType] > b[sortByType]) {
                return sortOrder === SortOder.ascending ? 1 : -1;
            } else {
                return sortOrder === SortOder.ascending ? -1 : 1;
            }
        });
    }
}
