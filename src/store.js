const toDoList = [];

function itemIndex(id) {
    return toDoList.findIndex((item) => item.id ===id);
}



function deleteToDo(itemIndex) {
    toDoList.splice(itemIndex, 1);

}