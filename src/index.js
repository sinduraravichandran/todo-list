import { addProject, addToDo,getProjects } from "./store.js"
import { renderProjects, bindEvents } from "./dashboard.js";


//create the default project and add it to the ui
const defaultProject = addProject("Default Project");
addProject("Another Project");
console.log(getProjects())
addToDo("call doctor", "call dr palma", "10/31/1994", "High", defaultProject.id)
addToDo("call dentist", "call tooth", "10/3/1994", "Low", defaultProject.id)
renderProjects();
bindEvents();





//import from dashboard the UI interaction
//bind to events and call the functions
//import css