import { getProjects } from "./store.js"
import "./style.css"

//get html elements
const content = document.getElementById("content");

//get projects & display on the UI
export function renderProjects() {
    const projects = getProjects();
    projects.forEach(element => {
        console.log(element.name)
        //create div & add class
        const newDiv = document.createElement("div");
        newDiv.classList.add("project");

        //add project details 
        newDiv.innertext = element.name;
        content.appendChild(newDiv);

        


    });
}


//figure out why the text is not showing up in the UI on the project