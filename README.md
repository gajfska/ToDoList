# To Do List - Version using a custom implementation of the table

This version of the application is based on a custom implementation of mechanisms that were provided by material design in the other project. The main idea was to present an advantage of re-usable components, in this example used to create table rows.

Also, it consists of the implementation of sorting and pagination, which is based on dividing data into allAddedTasks and displayedTasks, as well as managing the state of sortBy and sortOrder.

As this implementation seems more complex it allows logic to be better divided and encapsulated, for example, hover detection and showing or hiding delete button is done per table row, instead of the main table view.

## Tech/framework used

- HTML
- Angular 9.1.3 
- CSS
- Material Design

## Installation
To run the project you first need to set up NPM and Angular CLI tool.

NPM you can get from https://www.npmjs.com/get-npm
Angular CLI can be installed by calling:
`npm install -g @angular/cli`

After downloading the repository you need to download all dependencies using NPM:
```sh
$ npm install
```
Next run `ng serve` to start the app locally. In the browsers of your selection navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Please remember that if you are running another app on the same port already, you need to choose a different one when starting a local server by calling `ng serve --port 4401` for example.
   
