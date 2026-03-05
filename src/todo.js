const toDoList = [];
let id = 0;

function itemIndex(id) {
    return toDoList.findIndex((item) => item.id ===id);
}

function createToDo(title, description, dueDate, priority, project) {
    id++;
    const newToDo = { id, title, description, dueDate, priority, project, complete: false};
    toDoList.push(newToDo);
}

function deleteToDo(id) {
    toDoList.splice(itemIndex(id), 1);

}

function markAsComplete(id) {
    toDoList[itemIndex(id)].complete = true;

}

function editToDo(id, property, newValue) {
    toDoList[itemIndex(id)][property] = newValue;

}

export { createToDo, deleteToDo, markAsComplete, editToDo }