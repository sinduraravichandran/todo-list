import { getProjects, addProject, addToDo, findToDo, deleteProject, deleteTask, populateStorage} from "./store.js"
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

    content.addEventListener("change", (event) => {
        if (event.target.id === "priority-select") {
            const toDo = findToDo(event.target.closest(".item").id);
            toDo.editPriority(event.target.value);
            populateStorage();
        } else if (event.target.id === "complete-select") {
            console.log(getProjects())
            const toDo = findToDo(event.target.closest(".item").id);
            toDo.markComplete();
            populateStorage();
            renderProjects();
        }
    })

    content.addEventListener("click", (event) => {

        if (event.target.classList.contains("addToDoButton")) {
            openTaskDialog();
            addToDoProjectId = event.target.id;
            return;
        } else if (event.target.classList.contains("delete-project")) {
            deleteProject(event.target.id);
            populateStorage();
            renderProjects();
            console.log(getProjects())
        }
        else if (event.target.classList.contains("task-input")) {
            if (document.getElementById("save-input")) {
                document.getElementById("save-input").remove();
                document.getElementById("cancel-input").remove();
            }
            showSaveAndCancel(event.target.closest("div"));
        } else if (event.target.id === "save-input") {
            const toDo = findToDo(event.target.closest(".item").id);
            if (event.target.closest("div").classList.contains("title-div")) {
                toDo.editTitle(event.target.parentElement.querySelector("input").value);
                populateStorage();
                renderProjects();
            } else if (event.target.closest("div").classList.contains("description-div")) {
                toDo.editDescription(event.target.parentElement.querySelector("input").value);
                populateStorage();
                renderProjects();
            } else if (event.target.closest("div").classList.contains("due-date-div")) {
                toDo.editDueDate(event.target.parentElement.querySelector("input").value);
                populateStorage();
                renderProjects();
            } 
        } else if (event.target.id === "cancel-input") {
            renderProjects();
        }  else if (event.target.classList.contains("delete-task")) {
            deleteTask(event.target.id);
            populateStorage();
            renderProjects();
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
        populateStorage();
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
        populateStorage();
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

    if (projects.length === 0) {
        addProject("My Project");
    }

    content.innerHTML = '';

    //for each project in the array
    projects.forEach(element => {
    
        //create project div & add class
        const newProjectDiv = document.createElement("div");
        newProjectDiv.classList.add("project");

        //add project details 
        newProjectDiv.innerText = element.name;
        content.appendChild(newProjectDiv);

        //add delete project button
        const deleteProject = document.createElement("button");
        deleteProject.innerText = "Delete";
        deleteProject.id = element.id;
        deleteProject.classList.add("delete-project")
        newProjectDiv.appendChild(deleteProject);

        //for each item in the to do list array (each item is a task)
        element.toDoList.forEach(listItem => {

            //render incomplete tiles first
            if (listItem.complete === "No") {
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
                titleInput.classList.add("task-input");
                titleDiv.classList.add("title-div");
                titleDiv.append(titleLabel, titleInput);
                newItemDiv.appendChild(titleDiv);

                //add item details -- description 
                const descriptionDiv = document.createElement("div");
                const descriptionLabel = document.createElement("label");
                const descriptionInput = document.createElement("input");
                descriptionLabel.textContent = "Description: ";
                descriptionInput.value = listItem.description;
                descriptionInput.classList.add("task-input");
                descriptionDiv.classList.add("description-div");
                descriptionDiv.append(descriptionLabel, descriptionInput);
                newItemDiv.appendChild(descriptionDiv);

                //add item details -- due date 
                const dueDateDiv = document.createElement("div");
                const dueDateLabel = document.createElement("label");
                const dueDateInput = document.createElement("input");
                dueDateLabel.textContent = "Due Date: ";
                dueDateInput.value = listItem.dueDate;
                dueDateInput.classList.add("task-input"); 
                dueDateDiv.classList.add("due-date-div");
                dueDateDiv.append(dueDateLabel, dueDateInput);
                newItemDiv.appendChild(dueDateDiv);

                //add item details -- priority
                const priorityDiv = document.createElement("div");
                const priorityLabel = document.createElement("label");
                const select = document.createElement("select");
                const data = ["High", "Medium", "Low"];

                priorityLabel.textContent = "Priority: "

                data.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item;
                    option.text = item;
                    select.appendChild(option);
                })            

                select.value = listItem.priority;
                select.id = "priority-select"
                priorityDiv.classList.add("priority-div");
                priorityDiv.append(priorityLabel, select);
                newItemDiv.appendChild(priorityDiv);
        
    
                //add item details - complete 
                const completeDiv = document.createElement("div");
                const completeLabel = document.createElement("label");
                const completeSelect = document.createElement("select");
                const completeData = ["Yes", "No"];

                completeLabel.textContent = "Complete: "

                completeData.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item;
                    option.text = item;
                    completeSelect.appendChild(option);
                })            

                completeSelect.value = listItem.complete;
                completeSelect.id = "complete-select"
                completeDiv.classList.add("complete-div");
                completeDiv.append(completeLabel, completeSelect);
                newItemDiv.appendChild(completeDiv);


                //add delete task item
                const deleteTask = document.createElement("button");
                deleteTask.innerText = "Delete To Do";
                deleteTask.classList.add("delete-task");
                deleteTask.id = listItem.id;
                newItemDiv.appendChild(deleteTask);
        } 
    }
    )

        //now render all the complete ones
        element.toDoList.forEach(listItem => {

            //render incomplete tiles first
            if (listItem.complete === "Yes") {
                //create new to do div and add class
                const newItemDiv = document.createElement("div");
                newItemDiv.classList.add("item");
                newItemDiv.classList.add("item-complete")
                newItemDiv.id = listItem.id; 
                newProjectDiv.appendChild(newItemDiv);

                //add item details -- title 
                const titleDiv = document.createElement("div");
                const titleLabel = document.createElement("label");
                const titleInput = document.createElement("input");
                titleLabel.textContent = "Title: ";
                titleInput.value = listItem.title;
                titleInput.classList.add("task-input");
                titleDiv.classList.add("title-div");
                titleDiv.append(titleLabel, titleInput);
                newItemDiv.appendChild(titleDiv);

                //add item details -- description 
                const descriptionDiv = document.createElement("div");
                const descriptionLabel = document.createElement("label");
                const descriptionInput = document.createElement("input");
                descriptionLabel.textContent = "Description: ";
                descriptionInput.value = listItem.description;
                descriptionInput.classList.add("task-input");
                descriptionDiv.classList.add("description-div");
                descriptionDiv.append(descriptionLabel, descriptionInput);
                newItemDiv.appendChild(descriptionDiv);

                //add item details -- due date 
                const dueDateDiv = document.createElement("div");
                const dueDateLabel = document.createElement("label");
                const dueDateInput = document.createElement("input");
                dueDateLabel.textContent = "Due Date: ";
                dueDateInput.value = listItem.dueDate;
                dueDateInput.classList.add("task-input"); 
                dueDateDiv.classList.add("due-date-div");
                dueDateDiv.append(dueDateLabel, dueDateInput);
                newItemDiv.appendChild(dueDateDiv);

                //add item details -- priority
                const priorityDiv = document.createElement("div");
                const priorityLabel = document.createElement("label");
                const select = document.createElement("select");
                const data = ["High", "Medium", "Low"];

                priorityLabel.textContent = "Priority: "

                data.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item;
                    option.text = item;
                    select.appendChild(option);
                })            

                select.value = listItem.priority;
                select.id = "priority-select"
                priorityDiv.classList.add("priority-div");
                priorityDiv.append(priorityLabel, select);
                newItemDiv.appendChild(priorityDiv);
        
    
                //add item details - complete 
                const completeDiv = document.createElement("div");
                const completeLabel = document.createElement("label");
                const completeSelect = document.createElement("select");
                const completeData = ["Yes", "No"];

                completeLabel.textContent = "Complete: "

                completeData.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item;
                    option.text = item;
                    completeSelect.appendChild(option);
                })            

                completeSelect.value = listItem.complete;
                completeSelect.id = "complete-select"
                completeDiv.classList.add("complete-div");
                completeDiv.append(completeLabel, completeSelect);
                newItemDiv.appendChild(completeDiv);

                //add delete task item
                const deleteTask = document.createElement("button");
                deleteTask.innerText = "Delete To Do";
                deleteTask.classList.add("delete-task");
                deleteTask.id = listItem.id;
                newItemDiv.appendChild(deleteTask);
        } 
    }
    )

        //add new todo button
        const newItemButton = document.createElement("button");
        newItemButton.innerText = "Add To Do";
        newItemButton.id = element.id;
        newItemButton.classList.add("addToDoButton");
        newProjectDiv.appendChild(newItemButton);


    });
}



//bugs
//create new project not working
//local storage is storing a lot of stuff 