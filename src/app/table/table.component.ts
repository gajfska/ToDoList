import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskModel} from '../shared/task.model';
import {Subscription} from 'rxjs';
import {TaskService} from '../shared/task.service';

export enum SortOder {
    ascending,
    descending,
    none
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

    displayedColumnsKeys: string[] = ['taskName', 'priority', 'done'];

    displayedTasks: TaskModel[] = [];
    allAddedTasks: TaskModel[] = [];

    numberOfRowsToDisplay = 5;
    private currentPageDisplayed = 0;

    private subscription: Subscription;

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.subscription = this.taskService.tasksChangedSubject
            .subscribe(
                (tasks: TaskModel[]) => {
                    this.allAddedTasks = tasks;
                    this.updateDisplayedDataPage();
                }
            );

        this.taskService.initTasks();
    }

    // MARK: Sorting

    onSort(sortByType: string): void {
        this.taskService.updateSortingTypes(sortByType);
    }

    // MARK: Pagination

    goToPreviousPage(): void {
        if (this.currentPageDisplayed === 0) {
            return;
        }

        this.currentPageDisplayed = this.currentPageDisplayed - 1;
        this.updateDisplayedDataPage();
    }

    goToNextPage(): void {
        const pageEnd = this.currentPageDisplayed * this.numberOfRowsToDisplay + this.numberOfRowsToDisplay;
        if (pageEnd >= this.allAddedTasks.length) {
            return;
        }

        this.currentPageDisplayed = this.currentPageDisplayed + 1;
        this.updateDisplayedDataPage();

    }

    tasksPerPageChanged(): void {
        this.currentPageDisplayed = 0;
        this.updateDisplayedDataPage();
    }

    updateDisplayedDataPage(): void {
        this.displayedTasks = this.allAddedTasks.slice(this.pageStart(), this.pageEnd());
    }

    pageStart(): number {
        return this.currentPageDisplayed * this.numberOfRowsToDisplay;
    }

    pageEnd(): number {
        const maxPageEnd = this.pageStart() + this.numberOfRowsToDisplay;
        return Math.min(maxPageEnd, this.allAddedTasks.length);
    }

    // MARK: Header

    arrowSymbol(header): string {
        if (header === this.taskService.sortBy) {
            return this.taskService.sortOrder === SortOder.ascending ? '↓' : '↑';
        } else {
            return '';
        }
    }

    headerName(key: string): string {
        switch (key) {
            case 'taskName':
                return 'Task Name';
            case 'priority':
                return 'Priority';
            case 'done':
                return 'Done';
            default:
                return 'Unknown';
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
