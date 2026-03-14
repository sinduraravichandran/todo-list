//should this be the file that just manages / stores all the game stuff? is this the main file? 
import { createProject } from "./project.js"
import { createToDo } from "./todo.js"


//this is the array that will hold project objects. project objects will hold to-do-lists
const toDoListProjects = [];

//call createToDo and add it to array
export function addToDo(title, description, dueDate, priority, project) {
    function returnProjectIndex(projectName) {
        return toDoListProjects.findIndex((item) => item.name === projectName);
    }

    const newToDo = createToDo(title, description, dueDate, priority, project);
    toDoListProjects[returnProjectIndex(project)].toDoList.push(newToDo)
}

//call createProject and add it to array
export function addProject(name) {
    const newProject = createProject(name);
    toDoListProjects.push(newProject);
    return newProject;
}

export function getProjects() {
    return toDoListProjects;
}


