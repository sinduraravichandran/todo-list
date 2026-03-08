export function createToDo(title, description, dueDate, priority, project) {

    return { 
        id: crypto.randomUUID(), 
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
            this.dueDate = newDate;
        },

        editPriority(newPriority) {
            this.priority = newPriority;
        }
    }
 }  
 





