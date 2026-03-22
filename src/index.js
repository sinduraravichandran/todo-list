import { addProject, addToDo } from "./store.js"
import { renderProjects, bindEvents } from "./dashboard.js";


//create the default project and add it to the ui
addProject("Default Project");
addProject("Another Project");
renderProjects();
bindEvents();





//import from dashboard the UI interaction
//bind to events and call the functions
//import css