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
    content.addEventListener("click", (event) => {
        console.log(event.target)
    })
    newProjectButton.addEventListener("click", openProjectDialog);
    cancelDialogButton.addEventListener("click", closeProjectDialog);
    createDialogButton.addEventListener("click", createProjectUI)
    }

function openProjectDialog() {
    dialog.showModal();
}

function closeProjectDialog() {
    dialog.close();
}

function createProjectUI() {
    addProject(projectNameInput.value);
    projectNameInput.innerText = '';
    dialog.close();
    renderProjects();
}

function addToDoUI() {

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
            newItemDiv.innerText = `Title: ${listItem.title} \n Description: ${listItem.description} \n Due Date: ${listItem.dueDate} \n Priority: ${listItem.priority}`
            newProjectDiv.appendChild(newItemDiv);

        })

        //add new todo button
        const newItemButton = document.createElement("button");
        newItemButton.innerText = "Add To Do";
        newProjectDiv.appendChild(newItemButton);


    });
}

//refactor eventListeners so they only fire at the top, for now, just add one for 
//content so that i can add it to the new addItem button

//next up is to make the add item button functional. Create a modal to HTML