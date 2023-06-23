
/**
 * toggles and inserts the board-task-slide-in-menu
 * 
 * @param {*} i the specific task
 */
function openTask(i) {
    pushBoardTaskToClipboard(i)
    toggleTaskBoardTask()
    insertOpenTaskSlideInHTML(i)
}

/**
 * toggles the board-task-slide-in-menu in or out
 * 
 */
function toggleTaskBoardTask() {
    clearTaskClipboard()
    let opacityDiv = document.getElementById('reduceOpacityBehindTask');
    let taskDiv = document.getElementById('boardTaskSlideInDiv');

    if (taskDiv.classList.contains('display-none')) {
        toggleTaskBoardTaskStyleDisplayNone(opacityDiv, taskDiv)
    } else {
        toggleTaskBoardTaskStyleReduceOpacity(opacityDiv, taskDiv)
    }
}

/**
 * toggles the classes for the board-task-slide-in-menu
 * 
 * @param {*} opacityDiv the div behind the board-task-slide-in-menu
 * @param {*} taskDiv the board-task-slide-in-div
 */
function toggleTaskBoardTaskStyleDisplayNone(opacityDiv, taskDiv) {
    taskDiv.classList.toggle('display-none');
    setTimeout(() => {
        opacityDiv.classList.toggle('reduce-opacity');
        taskDiv.classList.toggle('board-task-translate-y');
    }, 100);
}

/**
 * toggles the classes for the board-task-slide-in-menu 
 *
 * @param {*} opacityDiv the div behind the board-task-slide-in-menu
 * @param {*} taskDiv the board-task-slide-in-div
 */
function toggleTaskBoardTaskStyleReduceOpacity(opacityDiv, taskDiv) {
    opacityDiv.classList.toggle('reduce-opacity');
    taskDiv.classList.toggle('board-task-translate-y');
    setTimeout(() => {
        taskDiv.classList.toggle('display-none');
    }, 100);
}

/**
 * inserts the whole html part for the board-task-slide-in-menu
 * 
 * @param {*} i for the specific Task
 */
function insertOpenTaskSlideInHTML(i) {
    let taskSlideInDiv = document.getElementById('boardTaskSlideInDiv');

    taskSlideInDiv.innerHTML = /*html*/ `
        ${insertBoardTaskSlideInCategoryHTML(i)}
        ${insertBoardTaskSlideInTitleHTML(i)}
        ${insertBoardTaskSlideInDescriptionHTML(i)}
        ${insertBoardTaskSlideInDueDateHTML(i)}
        ${insertBoardTaskSlideInPriorityHTML(i)}
        ${boardTaskSlideInSubtaskHeaderHTML()}
        <div class="add-task-subtask-list" id="addTaskCreateSubtask${i}"></div>
        ${insertBoardTaskSlideInAssigned()}
    `;
    insertBoardTaskSlideInAssignedContactsIteration(i)
    boardTaskSlideInInsertSubtasks(i)
}

/**
 * inserts the the board-task-slide-in-category
 * 
 * @param {*} i for the specific task
 * @returns the html part
 */
function insertBoardTaskSlideInCategoryHTML(i) {
    return /*html*/ `
        <div class="board-task-slide-in-category">
            <img onclick="toggleTaskBoardTask()" src="assets/img/x.svg" alt="">
            <span class="board-task-category" style="background:${taskList[i].categoryColor};">${taskList[i].category}</span>
        </div>
    `;
}

/**
 * inserts the the board-task-slide-in-title
 * 
 * @param {*} i for the specific task
 * @returns the html part
 */
function insertBoardTaskSlideInTitleHTML(i) {
    return /*html*/ `
        <span class="board-task-slide-in-title">${taskList[i].title}</span>
    `;
}

/**
 * inserts the board-task-slide-in-description
 * 
 * @param {*} i for the specific task
 * @returns the html part
 */
function insertBoardTaskSlideInDescriptionHTML(i) {
    return /*html*/ `
    <span class="board-task-slide-in-description">${taskList[i].description}</span>
`;
}

/**
 * inserts the board-task-slide-in-due_date
 * 
 * @param {*} i for the specific task
 * @returns the html part
 */
function insertBoardTaskSlideInDueDateHTML(i) {
    return /*html*/ `
    <div class="board-task-slide-in-date-div">
        <span class="board-task-slide-in-datename">Due Date:</span>
        <span class="board-task-slide-in-datevalue">${taskList[i].dueDate}</span>
    </div>
`;
}

/**
 * inserts the board-task-slide-in-priority
 * 
 * @param {*} i for the specific task
 * @returns the html part of it
 */
function insertBoardTaskSlideInPriorityHTML(i) {
    return /*html*/ `
    <div class="board-task-slide-in-priority-div">
        <span class="board-task-slide-in-priorityname">Priority:</span>
        <span class="board-task-slide-in-priorityvalue board-task-slide-in-priority-${taskList[i].priority.toLowerCase()}">${taskList[i].priority} <img src="assets/img/priority${taskList[i].priority.toLowerCase()}.svg" alt=""></span>
    </div>
`;
}

/**
 * inserts the board-task-slide-in-assigned-contacts-container
 * 
 * @returns the html part of it
 */
function insertBoardTaskSlideInAssigned() {
    return /*html*/ `
            <span class="board-task-slide-in-assignedto">Assigned to:</span>
    `;
}

/**
 * inserts the board-task-slide-in-assigned-contacts (iteration)
 * 
 * @param {*} i for the specific task
 */
function insertBoardTaskSlideInAssignedContactsIteration(i) {
    let contactContainer = document.getElementById('boardTaskSlideInDiv');
    insertBoardTaskSlideInAssignedContactsIterationHTML(i, contactContainer)

    contactContainer.innerHTML += /*html*/ `
        <div onclick="boardTaskSlideInEditTask(${i})" class="board-task-slide-in-editbutton">
            <img src="assets/img/edit_task.svg" alt="">
        </div>
        `;
}

/**
 * inserts the html part of the board-task-slide-in-assigned-contacts (iteration)
 * 
 * @param {*} i for the specific task
 * @param {*} contactContainer for the contact-container
 */
function insertBoardTaskSlideInAssignedContactsIterationHTML(i, contactContainer) {
    for (let j = 0; j < taskList[i].firstNames.length; j++) {
        let firstNameTask = taskList[i].firstNames[j];
        let lastNameTask = taskList[i].lastNames[j];
        for (let k = 0; k < userList.length; k++) {
            if (firstNameTask == userList[k].firstName && lastNameTask == userList[k].lastName) {
                let userBackgroundColor = userList[k].backgroundColor;
                contactContainer.innerHTML += /*html*/ `
                    <div class="board-task-slide-in-contact">
                        <div class="add-task-selected-contact" style="background:${userBackgroundColor}; margin:0;">${firstNameTask.charAt(0)}${lastNameTask.charAt(0)}</div><span class="board-task-slide-in-contact-name">${firstNameTask} ${lastNameTask}</span>
                    </div>    
                `;
            }
        }
    }
}

/**
 * inserts the subtask-header for the task-slide-in-menu
 * 
 * @returns the html part
 */
function boardTaskSlideInSubtaskHeaderHTML() {
    return /*html*/ `
        <span class="board-task-slide-in-edit-task-subtask">Subtasks:</span>
    `;
}

/**
 * inserts the assigned-to-header for the task-slide-in-menu
 * 
 * @returns the html part
 */
function boardTaskSlideInAssignedToHeaderHTML() {
    return /*html*/ `
    <span class="board-task-slide-in-edit-task-Assigned-to">Assigned to</span>
`;
}

/**
 * inserts the checkable subtasks for the task-slide-in-window 
 * 
 * @param {*} i for the specific task
 */
function boardTaskSlideInInsertSubtasks(i) {
    let subtaskContainer = document.getElementById('addTaskCreateSubtask' + i);

    for (let j = 0; j < taskList[i].subtasks.length; j++) {
        const subtask = taskList[i].subtasks[j];
        const subtaskState = taskList[i].subtasksState[j];
        if (subtaskState) {
            boardTaskSlideInInsertSubtasksChecked(i, j, subtaskContainer, subtask)
        } else {
            boardTaskSlideInInsertSubtasksUnChecked(i, j, subtaskContainer, subtask)
        }
    }
}

/**
 * inserts the checked subtasks for the task-slide-in-window
 * 
 * @param {*} i for the specific task
 * @param {*} j for the specific subtask
 * @param {*} subtaskContainer for the subtask-container
 * @param {*} subtask for the specific subtask of the specific task
 */
function boardTaskSlideInInsertSubtasksChecked(i, j, subtaskContainer, subtask) {
    subtaskContainer.innerHTML += /*html*/ `
    <div class="add-task-subtask-div">
        <input onclick="toggleSubtaskInlist(${i}, ${j})" checked class="add-task-subtask-checkbox" type="checkbox" name="${subtask}" id="editSubtask${i}-${j}">
        <span>${subtask}</span>
    </div>
`;
}

/**
 * inserts the unchecked subtasks for the task-slide-in-window
 * 
 * @param {*} i for the specific task
 * @param {*} j for the specific subtask
 * @param {*} subtaskContainer for the subtask-container
 * @param {*} subtask for the specific subtask of the specific task
 */
function boardTaskSlideInInsertSubtasksUnChecked(i, j, subtaskContainer, subtask) {
    subtaskContainer.innerHTML += /*html*/ `
    <div class="add-task-subtask-div">
        <input onclick="toggleSubtaskInlist(${i}, ${j})" class="add-task-subtask-checkbox" type="checkbox" name="${subtask}" id="editSubtask${i}-${j}">
        <span>${subtask}</span>
    </div>
`;
}