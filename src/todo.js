export function createToDo(title, description, dueDate, priority, project) {

    return { 
        id: crypto.randomUUID(), 
        title, 
        description, 
        dueDate, 
        priority, 
        project, 
        complete: "No",

        markComplete() {
            if (this.complete === "No") {
                this.complete = "Yes";
            } else {
                this.complete = "No";
            }
        },

        editDueDate(newDate) {
            this.dueDate = newDate;
        },

        editPriority(newPriority) {
            this.priority = newPriority;
        },

        editTitle(newTitle) {
            this.title = newTitle;
        },

        editDescription(newDescription) {
            this.description = newDescription;
        },
    }
 }  
 





