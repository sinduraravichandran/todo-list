let id = 0;

export function createToDo(title, description, dueDate, priority, project) {
    id++;
    const toDoItem = { id, title, description, dueDate, priority, project, complete: false };

    function markAsComplete() {
       this.complete = true;

        }

    function editToDo(property, newValue) {
        this[property] = newValue;
        }
        
    return { toDoItem, markAsComplete, editToDo }
    
    }   





