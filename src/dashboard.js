import { getProjects, addProject } from "./store.js"
import "./style.css"

//get html elements
const content = document.getElementById("content");
const newProjectButton = document.getElementById("newProjectButton");
const dialog = document.getElementById("dialog");
const createDialogButton = document.getElementById("close-dialog-btn");
const cancelDialogButton = document.getElementById("cancel-dialog-btn");
const projectNameInput = document.getElementById("projectName");

//bind events
export function bindEvents() {
    newProjectButton.addEventListener("click", openDialog);
    cancelDialogButton.addEventListener("click", closeDialog);
    createDialogButton.addEventListener("click", createProjectUI)
    }

function openDialog() {
    dialog.showModal();
}

function closeDialog() {
    dialog.close();
}

function createProjectUI() {
    addProject(projectNameInput.value);
    projectNameInput.innerText = '';
    dialog.close();
    renderProjects();
}

bindEvents()

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
            newItemDiv.innerText = listItem.title;
            newProjectDiv.appendChild(newItemDiv);

        })

    });
}

