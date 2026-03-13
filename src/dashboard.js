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
    projects.forEach(element => {
        console.log(element.name)
        //create div & add class
        const newDiv = document.createElement("div");
        newDiv.classList.add("project");

        //add project details 
        newDiv.innerText = element.name;
        content.appendChild(newDiv);

        //add new todo item button


    });
}
