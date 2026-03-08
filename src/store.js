//should this be the file that just manages / stores all the game stuff? is this the main file? 
import { createProject } from "./project.js"
import { createToDo } from "./todo.js"

//this is the array that will hold project objects. project objects will hold to-do-lists
const toDoListProjects = [];

//create the default project 
const defaultProject = createProject("My Project");
toDoListProjects.push(defaultProject);

export function addToDo(title, description, dueDate, priority, project) {

    function returnProjectIndex(projectName) {
        return toDoListProjects.findIndex((item) => item.name === projectName);
    }

    const newToDo = createToDo(title, description, dueDate, priority, project);
    toDoListProjects[returnProjectIndex(project)].toDoList.push(newToDo)
}


addToDo("hi", "desc", "10/2", "high", "My Project")  
console.log(toDoListProjects[0].toDoList)

//do we need to let user create new projects
