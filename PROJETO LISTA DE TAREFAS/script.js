document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return; 

        const taskItem = document.createElement("li");
        
        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;

        taskContent.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", () => {
            taskItem.remove(); 
        });

        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

        taskInput.value = ""; 
    }

    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
