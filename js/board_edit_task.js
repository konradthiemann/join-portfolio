/**
 * inserts the edit window of the board area (klick on task -> edit)
 * 
 * @param {*} i for the specific task
 */
function boardTaskSlideInEditTask(i) {
    pushBoardTaskToClipboard(i)
    document.getElementById('addTaskSlideInMenu').innerHTML = ``;
    let slideInTask = document.getElementById('boardTaskSlideInDiv');
    slideInTask.innerHTML = boardTaskFillSlideInEditTaskHTML(i);
    boardTaskEditSlideInInsertValues(i)
    createSelectedContactIcons();
}

/**
 * 
 * @param {*} i for the specific task
 * @returns returns the html part for the slideInTask
 */
function boardTaskFillSlideInEditTaskHTML(i) {
    return /*html*/ `
    <div class="board-task-slide-in-edit-div">
        <img onclick="toggleTaskBoardTask()" src="assets/img/x.svg" alt="">
        ${insertTaskTitleHTML()}
        <div style="margin-bottom: 25px"></div>
        ${insertDescriptionHTML()}
        ${insertDueDateHTML()}
        ${insertPriorityHTML()}
        <div style="margin-bottom: 25px"></div>
        ${boardTaskSlideInAssignedToHeaderHTML()}
        ${insertTaskContactlistHTML()}
        ${createSelectedContactIconsDivHTML()} 
        ${boardTaskSlideInOkButton(i)}
    </div>
    `;
}

/**
 * pushes the board-task-values to the clipboard
 * 
 * @param {*} i for the specific task
 */
function pushBoardTaskToClipboard(i) {
    taskClipboard.title = taskList[i].title
    taskClipboard.firstNames = taskList[i].firstNames
    taskClipboard.lastNames = taskList[i].lastNames
    taskClipboard.dueDate = taskList[i].dueDate
    taskClipboard.category = taskList[i].category
    taskClipboard.categoryColor = taskList[i].categoryColor
    taskClipboard.priority = taskList[i].priority
    taskClipboard.description = taskList[i].description
    taskClipboard.subtasks = taskList[i].subtasks
    taskClipboard.subtasksState = taskList[i].subtasksState
}

/**
 * inserts the taskvalues for the edit-task-window
 * 
 */
function boardTaskEditSlideInInsertValues() {
    boardTaskEditSlideInInsertTitle()
    boardTaskEditSlideInInsertDescription()
    boardTaskEditSlideInInsertDueDate()
    boardTaskEditSlideInInsertPriority()
}

/**
 * inserts the task title for the edit-window
 * 
 */
function boardTaskEditSlideInInsertTitle() {
    let title = document.getElementById('addTaskInputTitle');
    title.value = taskClipboard.title
}

/**
 * inserts the description fot the edit-task-window
 * 
 */
function boardTaskEditSlideInInsertDescription() {
    let description = document.getElementById('addTaskDescription');
    description.value = taskClipboard.description
}

/**
 * inserts the due-date for the edit-task-window
 * 
 */
function boardTaskEditSlideInInsertDueDate() {
    let dueDate = document.getElementById('addTaskInputDate');
    dueDate.value = taskClipboard.dueDate
}

/**
 * inserts and checks the task-priority for the edit-task-window
 * 
 */
function boardTaskEditSlideInInsertPriority() {
    let priorityValue = taskClipboard.priority
    let priorityDocument = document.getElementById('addTaskPriorityInput' + priorityValue);
    priorityDocument.checked = true;
    let urgentBox = document.getElementById('addTaskPriorityLabelUrgent');
    let mediumBox = document.getElementById('addTaskPriorityLabelMedium');
    let lowBox = document.getElementById('addTaskPriorityLabelLow');

    urgentBox.classList.remove('add-task-priority-urgent');
    mediumBox.classList.remove('add-task-priority-medium');
    lowBox.classList.remove('add-task-priority-low');

    checkBoardTaskEditSlideInInsertPriority(priorityValue, urgentBox, mediumBox, lowBox)
}

/**
 * checks the priority-value and sets the class for the edit-task-window
 * 
 * @param {*} priorityValue the priority-value of the task 
 * @param {*} urgentBox the urgent-box of the edit-task-window
 * @param {*} mediumBox the medium-box of the edit-task-window 
 * @param {*} lowBox the low-box of the edit-task-window
 */
function checkBoardTaskEditSlideInInsertPriority(priorityValue, urgentBox, mediumBox, lowBox) {
    if (priorityValue === 'Urgent') {
        urgentBox.classList.add('add-task-priority-urgent');
    } else if (priorityValue === 'Medium') {
        mediumBox.classList.add('add-task-priority-medium');
    } else if (priorityValue === 'Low') {
        lowBox.classList.add('add-task-priority-low');
    }
}

/**
 * inserts the ok-button for the edit-task-window
 * 
 * @param {*} i for the specific task
 * @returns the html part
 */
function boardTaskSlideInOkButton(i) {
    return /*html*/ `
        <div onclick="boardTaskSaveEditTaskTolist(${i})" class="board-task-slide-in-edit-task-ok-Button">Ok <img src="assets/img/checkicon.svg" alt=""></div>
    `;
}

/**
 * validates the inputs for the edited task and initializes the task
 *  
 * @param {*} i for the specific task
 * @returns validation information
 */
async function boardTaskSaveEditTaskTolist(i) {
    let title = document.getElementById('addTaskInputTitle');
    let searchKey = 'title';
    let searchValue = title.value
    let valueIsPresent = taskList.some(obj => obj[searchKey] == searchValue);
    if (title.value.trim() === '') {
        titleValidation(title, titleIsEmpty);
    } else if (title.value.length >= 35) {
        titleValidation(title, titleLength);
    } else if (!(title.value == taskClipboard.title) && (valueIsPresent)) {
        titleValidation(title, titleDuplicate);
    } else {
        initializeEditedTask(i);
    }
}

/**
 * pushes the edited task to the task-list, then to the backend and reiterates the task-list
 * 
 * @param {*} i for the specific task
 */
async function initializeEditedTask(i) {
    pushEditedTaskTolist(i)
    await backend.setItem('tasks', JSON.stringify(taskList));
    insertTaskTolistHTML()
    insertOpenTaskSlideInHTML(i)
    clearTaskClipboard()
}

/**
 * pushes the edited task to the task-list
 * 
 * @param {*} i for the specific task
 */
function pushEditedTaskTolist(i) {
    taskList[i].title = document.getElementById('addTaskInputTitle').value;
    taskList[i].firstNames = taskClipboard.firstNames
    taskList[i].lastNames = taskClipboard.lastNames
    taskList[i].dueDate = document.getElementById('addTaskInputDate').value;
    taskList[i].category = taskClipboard.category
    taskList[i].categoryColor = taskClipboard.categoryColor
    taskList[i].priority = taskClipboard.priority
    taskList[i].description = document.getElementById('addTaskDescription').value
    taskList[i].subtasks = taskClipboard.subtasks
    taskList[i].subtasksState = taskClipboard.subtasksState
}
