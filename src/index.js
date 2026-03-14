import { addProject, addToDo, getProjects } from "./store.js"
import { renderProjects } from "./dashboard.js";


//create the default project and add it to the ui
addProject("Default Project");
addProject("Another Project");
addToDo("title", 'description', 'duedate', 'priority','Another Project');
renderProjects();






//import from dashboard the UI interaction
//bind to events and call the functions
//import css