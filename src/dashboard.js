import { getProjects, addProject, addToDo, findToDo } from "./store.js"
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
const tasktName = document.getElementById("task-name");
const taskDescription = document.getElementById("task-description");
const taskDueDate = document.getElementById("task-due-date");
const taskPriority = document.querySelectorAll('input[name="task-priority"]');
let addToDoProjectId;
let editToDoTaskId;


//bind events
export function bindEvents() {
    newProjectButton.addEventListener("click", openProjectDialog);
    createProjectDialogButton.addEventListener("click", createProjectUI);
    cancelProjectDialogButton.addEventListener("click", closeProjectDialog);
    cancelTaskDialogButton.addEventListener("click", closeTaskDialog);
    createTaskDialogButton.addEventListener("click", createTaskUI);

    content.addEventListener("click", (event) => {


        if (event.target.classList.contains("addToDoButton")) {
            openTaskDialog();
            addToDoProjectId = event.target.id;
            return;
        } else if (event.target.id === "task-title") {
            showSaveAndCancel(event.target.closest("div"));
        } else if (event.target.id === "save-input") {
            const toDo = findToDo(event.target.closest(".item").id);
            if (event.target.closest("div").classList.contains("title-div")) {
                toDo.editTitle(event.target.parentElement.querySelector("input").value);
            }
            hideSaveAndCancel();
        } else if (event.target.id === "cancel-input") {
            hideSaveAndCancel();
        }
    })
    }

function showSaveAndCancel(divClicked) {

    //create save and cancel buttons
    const saveButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    saveButton.id = "save-input";
    cancelButton.id = "cancel-input"
    saveButton.innerText = "Save";
    cancelButton.innerText = "Cancel";
    divClicked.append(cancelButton, saveButton);
}

function hideSaveAndCancel() {
    const saveButton = document.getElementById("save-input");
    const cancelButton = document.getElementById("cancel-input");
    saveButton.remove();
    cancelButton.remove();
}

function openProjectDialog() {
    projectDialog.showModal();
}

function closeProjectDialog() {
    projectDialog.close();
}

function createProjectUI() {
    
    if (projectNameInput.value === '') {
        alert("Project name is required")
    } else {
        addProject(projectNameInput.value);
        projectNameInput.value = '';
        projectDialog.close();
        renderProjects();
    }
}

function openTaskDialog() {
    taskDialog.showModal();
}

function closeTaskDialog() {
    taskDialog.close();
}

function createTaskUI() {

    if (tasktName.value === '' || 
        taskDescription.value === '' ||
        taskDueDate.value === '' || 
        taskPriority.forEach(radio => radio.checked === false)
    ) {
        alert("Enter all values")

    } else {
        const taskPrioritySelected = document.querySelector('input[name="task-priority"]:checked').value;
        addToDo(tasktName.value, taskDescription.value, taskDueDate.value, taskPrioritySelected, addToDoProjectId);
        tasktName.value = '';
        taskDescription.value = '';
        taskDueDate.value = '';
        taskPriority.forEach(radio => radio.checked = false);
        taskDialog.close();
        renderProjects();
    }
}

//get projects & display on the UI
export function renderProjects() {
    const projects = getProjects();

    content.innerHTML = '';



    //for each project in the array
    projects.forEach(element => {
    
        //create project div & add class
        const newProjectDiv = document.createElement("div");
        newProjectDiv.classList.add("project");

        //add project details 
        newProjectDiv.innerText = element.name;
        content.appendChild(newProjectDiv);

        //for each item in the to do list array (each item is a task)
        element.toDoList.forEach(listItem => {

            //create new to do div and add class
            const newItemDiv = document.createElement("div");
            newItemDiv.classList.add("item");
            newItemDiv.id = listItem.id;
            newProjectDiv.appendChild(newItemDiv);

            //add item details -- title 
            const titleDiv = document.createElement("div");
            const titleLabel = document.createElement("label");
            const titleInput = document.createElement("input");
            titleLabel.textContent = "Title: ";
            titleInput.value = listItem.title;
            titleInput.id = "task-title"
            titleDiv.classList.add("title-div");
            titleDiv.append(titleLabel, titleInput);
            newItemDiv.appendChild(titleDiv);

            //add item details -- description 
            const descriptionDiv = document.createElement("div");
            const descriptionLabel = document.createElement("label");
            const descriptionInput = document.createElement("input");
            descriptionLabel.textContent = "Description: ";
            descriptionInput.value = listItem.description;
            descriptionInput.id = "description-title";
            descriptionDiv.classList.add("description-div");
            descriptionDiv.append(descriptionLabel, descriptionInput);
            newItemDiv.appendChild(descriptionDiv);

            //add item details -- due date 




            //newItemDiv.innerText = `Title: ${listItem.title} \n Description: ${listItem.description} \n Due Date: ${listItem.dueDate} \n Priority: ${listItem.priority}`
            
            

        })

        //add new todo button
        const newItemButton = document.createElement("button");
        newItemButton.innerText = "Add To Do";
        newItemButton.id = element.id;
        newItemButton.classList.add("addToDoButton");
        newProjectDiv.appendChild(newItemButton);

    });
}


//update line 164 and for hte other section to replace id with classlist