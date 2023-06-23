/**
 * creates a task at the board while considering the searchinput
 * 
 */
function insertTaskTolistHTML() {
    document.getElementById('toDoTasksContainer').innerHTML = ``;
    document.getElementById('inProgressTasksContainer').innerHTML = ``;
    document.getElementById('awaitFeedbackTasksContainer').innerHTML = ``;
    document.getElementById('doneTasksContainer').innerHTML = ``;
    let lists;
    let searchInput = document.getElementById('searchTaskInputField').value;

    for (let i = 0; i < taskList.length; i++) {
        lists = document.getElementById(taskList[i].taskStatus + 'TasksContainer');
        const task = taskList[i];

        if (task.title.toLowerCase().includes(searchInput.toLowerCase()) || task.description.toLowerCase().includes(searchInput.toLowerCase())) {
            lists.innerHTML += taskToListHTML(i, task);
        }
    }
    insertAssignedContactsToTaskHTML()
}

/**
 * inserts the html part of a task
 * 
 * @param {*} i for the specific task
 * @param {*} task for the task values
 * @returns the html part
 */
function taskToListHTML(i, task) {
    return /*html*/ `
    <div class="task-wrapper" id="${i}">
        <div onclick="openTask(${i})" class="board-task" id="boardTask${i}">
            <div class="board-task-category-div">
                <span style="background: ${task.categoryColor};" class="board-task-category">${task.category}</span>
            </div>
            <div class="board-task-title-and-description">
                <span class="board-task-title">${task.title}</span>
                <span class="board-task-description">${task.description}</span>
            </div>
            <div class="board-task-subtask-status" id="boardTaskSubtaskStatus${i}">
                ${insertSubtaskProgress(i)}
            </div>
            <div class="board-task-assigned-contacts-and-prority">
                <div class="board-task-assigned-contacts" id="boardTaskAssignedContacts${task.title}"></div>
                <img src="assets/img/priority${task.priority.toLowerCase()}.svg">
            </div>
        </div>
    </div>
    `;
}

/**
 * checks if subtasks exist, if the exist, the subtaskstatus gets implemented
 * 
 * @param {*} i for the specific task
 * @returns the html part
 */
function insertSubtaskProgress(i) {
    const task = taskList[i]
    if (task.subtasks.length > 0) {
        return /*html*/ `
            <div class="board-task-subtask-statusbar">
                <div class="board-task-subtask-filled-statusbar" id="boardTaskSubtaskFilledStatusbar" style="width:${fillSubtaskStatusbar(i) / task.subtasksState.length * 100}%;"></div>
            </div>
            <span class="board-task-subtask-status-info">
                    ${fillSubtaskStatusbar(i)} / ${task.subtasksState.length} Done
            </span>
        `;
    } else {
        return /*html*/ `
            <div class="board-task-subtask-filled-statusbar"></div>
        `;
    }
}

/**
 * fills the subtask-statusbar and sets the status-count on the board-tasks
 * 
 * @param {*} i for the specific task
 * @returns the checked subtask-count
 */
function fillSubtaskStatusbar(i) {
    const task = taskList[i];
    let checkedSubtaskCount = 0;

    for (let j = 0; j < task.subtasksState.length; j++) {
        const state = task.subtasksState[j];
        if (state === true) {
            checkedSubtaskCount++;
        }
    }
    return checkedSubtaskCount;
}

/**
 * inserts the assigned contacts to the tasks
 * 
 */
function insertAssignedContactsToTaskHTML() {
    for (let i = 0; i < taskList.length; i++) {
        let contactContainer = document.getElementById('boardTaskAssignedContacts' + taskList[i].title);
        let task = taskList[i];
        if (contactContainer !== null) {
            if (!(task.firstNames.length > 2)) {
                insertAssignedContactsToTaskGreaterThanTwoHTML(contactContainer, task)
            } else {
                insertAssignedContactsToTaskLowerThanTwoHTML(contactContainer, task)
                contactContainer.innerHTML += /*html*/ `
                <div class="add-task-assigned-contact-overflow">+${task.firstNames.length - 2}</div>
                `;
            }
        }
    }
}

/**
 * inserts the assigned contacts to the tasks with more than 2 assigned contacts
 * 
 * @param {*} contactContainer the container for the assigned contacts
 * @param {*} task the specific task
 */
function insertAssignedContactsToTaskGreaterThanTwoHTML(contactContainer, task) {
    for (let j = 0; j < task.firstNames.length; j++) {
        let firstNameTask = task.firstNames[j];
        let lastNameTask = task.lastNames[j];
        for (let k = 0; k < userList.length; k++) {
            if (firstNameTask == userList[k].firstName && lastNameTask == userList[k].lastName) {
                let userBackgroundColor = userList[k].backgroundColor;
                contactContainer.innerHTML += /*html*/ `
            <div class="add-task-selected-contact" style="background:${userBackgroundColor};">${firstNameTask.charAt(0)}${lastNameTask.charAt(0)}</div>
            `;
            }
        }
    }
}

/**
 * inserts the assigned contacts to the tasks with less or equal than 2 assigned contacts
 * 
 * @param {*} contactContainer the container for the assigned contacts
 * @param {*} task for the specific task
 */
function insertAssignedContactsToTaskLowerThanTwoHTML(contactContainer, task) {
    for (let j = 0; j < 2; j++) {
        let firstNameTask = task.firstNames[j];
        let lastNameTask = task.lastNames[j];
        for (let k = 0; k < userList.length; k++) {
            if (firstNameTask == userList[k].firstName && lastNameTask == userList[k].lastName) {
                let userBackgroundColor = userList[k].backgroundColor;
                contactContainer.innerHTML += /*html*/ `
            <div class="add-task-selected-contact" style="background:${userBackgroundColor};">${firstNameTask.charAt(0)}${lastNameTask.charAt(0)}</div>
            `;
            }
        }
    }
}

/**
 * inserts the specific header and buttons to the add-task-slide-in-menu
 * 
 * @returns the html part
 */
function insertTaskSlideInHeader() {
    return /*html*/ `
        <div class="add-task-slide-in-header">
            <span>Add Task</span>
            <button class="add-task-slide-in-create-task-button" onclick="createTaskBoardSite()">Create Task<img class="add-task-slide-in-check-icon" src="assets/img/checkicon.svg" alt=""></button>
            </button>
            <img onclick="toggleAddTaskMenuOffScreen()" src="assets/img/x.svg" alt="">
        </div>
    `;
}