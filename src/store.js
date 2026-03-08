//should this be the file that just manages / stores all the game stuff? is this the main file? 
import { createProject } from "./project.js"
import { createToDo } from "./todo.js"

//this is the array that will hold project objects. project objects will hold to-do-lists
const toDoListProjects = [];

//create the default project 
const defaultProject = createProject("My Project");
toDoListProjects.push(defaultProject);

export function addToDo(project) {
    const item = createToDo(title, description, dueDate, priority, project);
    toDoListProjects[project].toDoList.push(item)
    

}

//shoot rn it's only 1:1 relationship of project to list, but you should have many lists for a project so I need to fix that