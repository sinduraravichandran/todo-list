import { createProject } from "./project.js"
import { createToDo } from "./todo.js"


//this is the array that will hold project objects. project objects will hold to-do-lists
const toDoListProjects = [];

//call createToDo and add it to array
export function addToDo(title, description, dueDate, priority, project) {
    function returnProjectIndex(projectId) {
        return toDoListProjects.findIndex((item) => item.id === projectId);
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

export function findToDo(id) {
    for (let i=0; i<toDoListProjects.length; i++) {
        for (let j=0; j<toDoListProjects[i].toDoList.length; j++) {
            if (toDoListProjects[i].toDoList[j].id === id) {
                return toDoListProjects[i].toDoList[j];
            }
        }
    }
}


export function deleteProject(id) {
    const deleteIndex = toDoListProjects.findIndex((project) => project.id === id);
    toDoListProjects.splice(deleteIndex, 1);

}

export function deleteTask(taskId, projectId) {

}

//working on the function to find and delete task 