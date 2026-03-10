import { getProjects } from "./store.js"
import "./style.css"

const body = document.body;

//get projects & display on the UI
const projects = getProjects();
projects.array.forEach(element => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("project")
    body.appendChild(newDiv);
    
});


//I think the error is that we are calling foreach when the store.js hasn't run and stuff hasn't been added to the array
//best course of action is to prob put this in a function that's used to render on screen
//and only call it when there's stuff 