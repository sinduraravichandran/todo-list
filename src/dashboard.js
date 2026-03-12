import { getProjects, addProject } from "./store.js"
import "./style.css"

//get html elements
const content = document.getElementById("content");
const newProjectButton = document.getElementById("newProjectButton");
const dialog = document.getElementById("dialog");
const dialogButton = document.getElementById("close-dialog-btn");

//bind events
export function bindEvents() {
    newProjectButton.addEventListener("click", () => {
        dialog.showModal();

        //const projectName = 
       // addProject(projectName);

    })

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
