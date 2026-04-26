import { createProject } from "./project.js"
import { createToDo } from "./todo.js"


//this is the array that will hold project objects. project objects will hold to-do-lists
let toDoListProjects = [];
getLocalStorageValues();

function getLocalStorageValues() {
    let projectArray = JSON.parse(localStorage.getItem("projectArray"));
    console.log(projectArray);

    //rebuild the projects
    if (projectArray) {
        for (let i=0; i<projectArray.length; i++) {
            const recreatedProject = createProject(projectArray[i].name);
            recreatedProject.id = projectArray[i].id;
            toDoListProjects.push(recreatedProject);
        }
    }
    
   
    for (let i=0; i<projectArray.length; i++) {
        if (projectArray[i].toDoList.length > 0) {
            for (let j=0; j<projectArray[i].toDoList.length; j++) {
            const recreatedTask = createToDo(projectArray[i].toDoList[j].title,
                                projectArray[i].toDoList[j].description,
                                projectArray[i].toDoList[j].dueDate,
                                projectArray[i].toDoList[j].priority,
                                projectArray[i].id)
            recreatedTask.id = projectArray[i].toDoList[j].id;
        }
        }
    }
}

//call createToDo and add it to array
export function addToDo(title, description, dueDate, priority, project) {
    function returnProjectIndex(projectId) {
        return toDoListProjects.findIndex((item) => item.id === projectId);
    }
    const newToDo = createToDo(title, description, dueDate, priority, project);
        
    toDoListProjects[returnProjectIndex(project)].toDoList.push(newToDo);
    populateStorage();
}

//call createProject and add it to array
export function addProject(name) {
    const newProject = createProject(name);
    toDoListProjects.push(newProject);
    populateStorage();
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

export function deleteTask(id) {

    for (let i=0; i<toDoListProjects.length; i++) {
        for (let j=0; j<toDoListProjects[i].toDoList.length; j++) {
            if (toDoListProjects[i].toDoList[j].id === id) {
                toDoListProjects[i].toDoList.splice(j,1);
                populateStorage();
            }
        }
    }

}

export function populateStorage() {
    localStorage.setItem("projectArray", JSON.stringify(toDoListProjects));
}