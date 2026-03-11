import { getProjects } from "./store.js"
import "./style.css"

//get html elements
const content = document.getElementById("content");

//get projects & display on the UI
export function renderProjects() {
    const projects = getProjects();
    projects.forEach(element => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("project");
        content.appendChild(newDiv);
    
    });
}


