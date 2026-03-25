import { getProjects, addProject, addToDo } from "./store.js"
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
        } else if (event.target.classList.contains("editToDoButton")) {
            //edit todo

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

            //add item details
            newItemDiv.innerText = `Title: ${listItem.title} \n Description: ${listItem.description} \n Due Date: ${listItem.dueDate} \n Priority: ${listItem.priority}`
            newProjectDiv.appendChild(newItemDiv);

            //add edit to do button 
            const editTaskButton = document.createElement("button");
            editTaskButton.innerText = 'Edit Task';
            editTaskButton.classList.add("editToDoButton")
            newItemDiv.appendChild(editTaskButton);
            

        })

        //add new todo button
        const newItemButton = document.createElement("button");
        newItemButton.innerText = "Add To Do";
        newItemButton.id = element.id;
        newItemButton.classList.add("addToDoButton");
        newProjectDiv.appendChild(newItemButton);

    });
}


