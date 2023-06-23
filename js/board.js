/**
 * variable for the addTaskOffScreenMenu() function.
 * so the function is able to push the task to the specific column in the board
 */
let boardTaskStatus;

/**
 * calls the board-page and loads drag-and-drop functionality
 * 
 */
function insertBoard() {
    markActiveNavElement('board');
    removeHelp();
    contentDiv.innerHTML = insertBoardHTML();
    insertTaskTolistHTML()
    loadDragAndDrop()
}

/**
 * inserts the board content
 * 
 * @returns the html part
 */
function insertBoardHTML() {
    return /*html*/ `
        ${insertBoardHeaderHTML()}
        ${insertBoardTasks()}
        ${addTaskSlideInMenu()}
    `;
}

/**
 * inserts board header
 * 
 * @returns board header content
 */
function insertBoardHeaderHTML() {
    return /*html*/ `
            <div class="board-header">
            <div class="task-form" action="" >
                <input onkeyup="event.preventDefault(); insertTaskTolistHTML()" class="search-task-input-field" id="searchTaskInputField" type="text" placeholder="Find Task">
                <img src="assets/img/barrier.svg" alt="">
                <img class="search-glass" onclick="insertTaskTolistHTML()" src="assets/img/searchglass.svg" alt="">
            </div>
            <button class="add-task-button" onclick="addTaskOffScreenMenu('toDo')">Add task <img src="assets/img/plus.svg" alt=""></button>
        </div>`;
}

/**
 * inserts board task status header
 * 
 * @returns board task content
 */
function insertBoardTasks() {
    return /*html*/ `
    <div class="board-tasks">
     ${insertTodoTasksHeaderHTML()}
     ${insertInProgressTasksHeaderHTML()}
     ${insertAwaitFeedbackTasksHeaderHTML()}
     ${insertDoneTasksHeaderHTML()}
    </div>
    `;
}

/**
 * inserts to-do tasks header
 * 
 * @returns the html part
 */
function insertTodoTasksHeaderHTML() {
    return/*html*/ `
        <div class="to-do-tasks">
            <div class="to-do-header">
                <span>To do</span>
                <img class="board-add-task-plus-icon" onclick="addTaskOffScreenMenu('toDo')" src="assets/img/plusbutton.svg" alt="">
            </div>
            <div class="to-do-tasks-container" id="toDoTasksContainer">
                <!-- tasks here -->
            </div>
        </div>
        `;
}

/**
 * inserts in progress tasks header
 * 
 * @returns the html part
 */
function insertInProgressTasksHeaderHTML() {
    return /*html*/ `
        <div class="in-progress-tasks">
            <div class="in-progress-header">
                <span>In progress</span>
                <img class="board-add-task-plus-icon" onclick="addTaskOffScreenMenu('inProgress')" src="assets/img/plusbutton.svg" alt="">
            </div>
            <div class="in-progress-tasks-container" id="inProgressTasksContainer">
                <!-- tasks here -->
            </div>
        </div>
    `;
}

/**
 * inserts await feedback tasks header
 * 
 * @returns the html part
 */
function insertAwaitFeedbackTasksHeaderHTML() {
    return /* html */ `
        <div class="await-feedback-tasks">
            <div class="await-feedback-header">
                <span>Await feedback</span>
                <img class="board-add-task-plus-icon" onclick="addTaskOffScreenMenu('awaitFeedback')" src="assets/img/plusbutton.svg" alt="">
            </div>
            <div class="await-feedback-tasks-container" id="awaitFeedbackTasksContainer">
                <!-- tasks here -->
            </div>
        </div>
    `;
}

/**
 * inserts the done tasks header
 * 
 * @returns the html part
 */
function insertDoneTasksHeaderHTML() {
    return /*html*/ `
        <div class="done-tasks">
            <div class="done-header">
                <span>Done</span>
                <img class="board-add-task-plus-icon" onclick="addTaskOffScreenMenu('done')" src="assets/img/plusbutton.svg" alt="">
            </div>
            <div class="done-tasks-container" id="doneTasksContainer">
                <!-- tasks here -->
            </div>
        </div>
    `;
}

/**
 * calls the add-task-slide-in-menu from the side,
 * and sets the div for it
 *
 */
function addTaskOffScreenMenu(taskStatus) {
    boardTaskStatus = taskStatus;
    clearTaskClipboard()
    addTaskFillSlideInMenu()
    toggleAddTaskMenuOffScreen()
}

/**
 * inserts the div for the add-task-slide-in-menu
 * 
 * @returns the html part
 */
function addTaskSlideInMenu() {
    return /*html*/ `
        <div class="add-task-slide-in-menu transform-x-off-screen scrollbar1" id="addTaskSlideInMenu">
        </div>
    `;
}

/**
 * inserts the whole html part of the slide-in-menu
 * 
 */
function addTaskFillSlideInMenu() {
    document.getElementById('addTaskSlideInMenu').innerHTML = /*html*/ `
        ${insertTaskSlideInHeader()}
        ${insertTaskTitleHTML()}
        ${insertTaskContactlistHTML()}
        ${createSelectedContactIconsDivHTML()} 
        ${insertDueDateHTML()}
        ${insertCategorySelectorHTML()}
        ${insertCategoryListHTML()}
        ${addTaskCreateNewCategoryColorSelector()}
        ${insertPriorityHTML()}
        ${insertDescriptionHTML()}
        ${insertSubtasksHTML()}
        `;
}

/**
 * toggles the add-task-slide-in-menu in or out
 * 
 */
function toggleAddTaskMenuOffScreen() {
    let slideInMenu = document.getElementById('addTaskSlideInMenu');
    slideInMenu.classList.toggle('transform-x-off-screen');
    let opacityDiv = document.getElementById('reduceOpacity');
    opacityDiv.classList.toggle('reduce-opacity');
}



/**
 * checks/unchecks the subtask of the specific task. changes are made in real time at the task list for the specific task
 * 
 * @param {*} i for the specific task
 * @param {*} j for the specific subtask
 */
async function toggleSubtaskInlist(i, j) {
    let subtaskCheckbox = document.getElementById('editSubtask' + i + `-` + j)
    if (subtaskCheckbox.checked) {
        taskList[i].subtasksState.splice(j, 1, true)
    } else {
        taskList[i].subtasksState.splice(j, 1, false)
    }
    await backend.setItem('tasks', JSON.stringify(taskList));
    await initBackend()
    insertTaskTolistHTML()
}

/**
 * creates the task and adds it to the board
 * 
 * @returns the validation
 */
async function createTaskBoardSite() {
    let title = document.getElementById('addTaskInputTitle');
    let searchKey = 'title';
    let searchValue = title.value
    let valueIsPresent = taskList.some(obj => obj[searchKey] == searchValue);
    if (title.value.trim() === '') {
        titleValidation(title, titleIsEmpty);
    } else if (title.value.length >= 35) {
        titleValidation(title, titleLength);v
    } else if (valueIsPresent) {
        titleValidation(title, titleDuplicate);
    } else if (taskClipboard.priority == '') {
        priorityValidation();
    } else {
        pushBoardTaskValuesToClipboard(title);
    }
}

/**
 * pushes the values of the task to the clipboard, then to the backend and then reiterates the board
 * 
 * @param {*} title task title
 */
async function pushBoardTaskValuesToClipboard(title) {
    taskClipboard.title = title.value;
    taskClipboard.taskStatus = boardTaskStatus;
    pushDueDateToTaskClipboard()
    pushDescriptionToTaskClipboard()
    await pushTaskToBackend()
    confirmAddedTaskToBoard()
    await initBackend()
    insertTaskTolistHTML()
    addTaskFillSlideInMenu()
    clearTaskClipboard()
}