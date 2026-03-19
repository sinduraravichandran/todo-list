import { getProjects, addProject } from "./store.js"
import "./style.css"

//get html elements
const content = document.getElementById("content");
const newProjectButton = document.getElementById("newProjectButton");
const projectDialog = document.getElementById("project-dialog");
const createProjectDialogButton = document.getElementById("create-project-dialog-btn");
const cancelProjectDialogButton = document.getElementById("cancel-project-dialog-btn");
const projectNameInput = document.getElementById("project-name");
const taskDialog = document.getElementById("task-dialog");
const createTaskDialogButton = document.getElementById("create-task-dialog-btn");
const cancelTaskDialogButton = document.getElementById("cancel-task-dialog-btn");
const tasktNameInput = document.getElementById("task-name");
const taskDescription = document.getElementById("task-description");
const taskDueDate = document.getElementById("task-due-date");
const taskPriority = document.querySelectorAll('input[name="task-priority"]');


//bind events
export function bindEvents() {
    newProjectButton.addEventListener("click", openProjectDialog);
    createProjectDialogButton.addEventListener("click", createProjectUI);
    cancelProjectDialogButton.addEventListener("click", closeProjectDialog);
    cancelTaskDialogButton.addEventListener("click", closeTaskDialog);


    content.addEventListener("click", (event) => {
        console.log(event.target)
        if (event.target.classList.contains("addToDoButton")) {
            openTaskDialog();
            return;
        } 
    })
    }

function openProjectDialog() {
    projectDialog.showModal();
}

function closeProjectDialog() {
    projectDialog.close();
}

function createProjectUI() {
    addProject(projectNameInput.value);
    projectNameInput.innerText = '';
    projectDialog.close();
    renderProjects();
}

function openTaskDialog() {
    taskDialog.showModal();
}

function closeTaskDialog() {
    taskDialog.close();
}

function createTaskUI() {

    addToDo()
    addProject(projectNameInput.value);
    projectNameInput.innerText = '';
    projectDialog.close();
    renderProjects();
}

bindEvents();

//get projects & display on the UI
export function renderProjects() {
    const projects = getProjects();

    content.innerHTML = '';

    projects.forEach(element => {
    
        //create project div & add class
        const newProjectDiv = document.createElement("div");
        newProjectDiv.classList.add("project");

        //add project details 
        newProjectDiv.innerText = element.name;
        content.appendChild(newProjectDiv);

        //for each item in the to do list array
        element.toDoList.forEach(listItem => {

            //create new to do div and add class
            const newItemDiv = document.createElement("div");
            newItemDiv.classList.add("item");

            //add item details
            newItemDiv.innerText = `Title: ${listItem.title} \n Description: ${listItem.description} \n Due Date: ${listItem.dueDate} \n Priority: ${listItem.priority}`
            newProjectDiv.appendChild(newItemDiv);

        })

        //add new todo button
        const newItemButton = document.createElement("button");
        newItemButton.innerText = "Add To Do";
        newItemButton.id = element.id;
        newItemButton.classList.add("addToDoButton");
        newProjectDiv.appendChild(newItemButton);

    });
}

//refactor eventListeners so they only fire at the top, for now, just add one for 
//content so that i can add it to the new addItem button

//next up is to make the add item button functional. Create a modal to HTML