let id = 0;

export function createToDo(title, description, dueDate, priority, project) {
    id++;
    return { 
        id, 
        title, 
        description, 
        dueDate, 
        priority, 
        project, 
        complete: false,

        markComplete() {
            this.complete = !this.complete;
        },

        editDueDate(newDate) {
            this.dueDate = date;
        },

        editPriority(newPriority) {
            this.priority = newPriority;
        }
    }
 }   





