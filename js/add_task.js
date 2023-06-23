let categoryColors = ['#de493e', '#259b24', '#1e88e5', '#fbc02d', '#9c27b0', '#00897b'];
let contactListExpanded = false;

/**
 * calls the add-task-page
 * 
 */
function insertAddTask() {
    markActiveNavElement('addTask');
    clearTaskClipboard();
    contentDiv.innerHTML = insertTaskLeft();
    document.getElementById("help").classList.remove("help-none");
}

/**
 * inserts the add task content
 * 
 * @returns the html part of the page
 */
function insertTaskLeft() {
    return /*html*/ `
        <div class="task-main">
            <form class="task-left scrollbar1">
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
            </form>
            <div class="task-right">
                ${insertTaskRightHTML()}
            </div>
        </div>
        `;
}
/**
 * inserts the right side of the add-task page
 * 
 * @returns the html part of the right hand side add-task page
 */
function insertTaskRightHTML() {
    return /*html*/ `
        <button class="btn-clear" onclick="clearTask()">Clear
            <svg width="14" height="13" viewBox="0 0 14 13" fill="blue" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00106 6.50008L12.2441 11.7431M1.75806 11.7431L7.00106 6.50008L1.75806 11.7431ZM12.2441 1.25708L7.00006 6.50008L12.2441 1.25708ZM7.00006 6.50008L1.75806 1.25708L7.00006 6.50008Z" stroke="#647188" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <button class="btn-addTask" onclick="createTaskAddTaskSite()">Create Task</button>
    `;
}

/**
 * inserts the title of the add task page
 * 
 * @returns the html part of the title
 */
function insertTaskTitleHTML() {
    return /*html*/ `
        <input class="add-task-input-title" placeholder="Enter a title" required type="text" name="" id="addTaskInputTitle" onclick=closeTaskList()>
    `;
}

/**
 * inserts the contact list of the add task page
 * 
 * @returns the html part of the contact list
 */
function insertTaskContactlistHTML() {
    return /*html*/ `
        <div class="add-task-contacts-assign" id="taskContacts">
            <input required class="add-task-select-contacts" placeholder="Select Contacts to assign" onkeyup="searchContacts()" id="addContactToTaskInput" onclick=closeCategoryList()>
            <img class="rotate-arrow-90" id="addTaskExpandArrow" src="assets/img/dropdownicon.svg" onclick="openAndCloseContactList()">
        </div>
        <div id="addTaskContactList" class="add-task-contact-list scrollbar scrollbar1">
        </div>
    `;
}
/**
 * inserts the due date of the add task page
 * 
 * @returns the html part of the due date
 */
function insertDueDateHTML() {
    return /*html*/ `
        <div class="add-task-date">
            <span>Due Date</span>
            <div class="add-task-date-form">
               <input onclick=closeTaskList() class="add-task-input-date" id="addTaskInputDate" type="date" required minlength="10" maxlength="10" placeholder="dd-mm-yyyy" name="" id="">
            </div>
        </div>
    `;
}

/**
 * inserts the the description
 * 
 * @returns the html part of it
 */
function insertDescriptionHTML() {
    return /*html*/ `
        <div class="add-task-description">
            <span>Description</span>
            <textarea onclick=closeTaskList() class="add-task-description-textarea scrollbar1" name="description" id="addTaskDescription" placeholder="Enter a Description" cols="30" rows="10"></textarea>
        </div>
    `;
}



/**
 * pushes all remaining add-task-informations to the task clipboard
 * 
 * @returns validation information
 */
async function createTaskAddTaskSite() {
    let title = document.getElementById('addTaskInputTitle');
    let searchKey = 'title';
    let searchValue = title.value
    let valueIsPresent = taskList.some(obj => obj[searchKey] == searchValue);
    if (title.value.trim() === '') {
        titleValidation(title, titleIsEmpty);
    } else if (title.value.length >= 35) {
        titleValidation(title, titleLength);
    } else if (valueIsPresent) {
        titleValidation(title, titleDuplicate);
    } else if (taskClipboard.priority == '') {
        priorityValidation();
    } else {
        pushAddTaskValuesToClipboard(title);
    }
}

/**
 * validates the title of the task
 * 
 * @param {*} title the title of the task
 * @param {*} titleValidationType the type of the validation
 * @returns validation information
 */
function titleValidation(title, titleValidationType) {
    title.setCustomValidity(titleValidationType);
    title.reportValidity();
    return;
}

/**
 * validates the priority of the task if it is empty or not
 * 
 * @returns if the priority is empty
 */
function priorityValidation() {
    let priorityArea = document.getElementById('addTaskPriorityInputMedium');
    priorityArea.setCustomValidity('No Priority given yet!')
    priorityArea.reportValidity();
    return;
}

/**
 * pushes the values of the task to the taskClipboard and then to the backend
 * 
 * @param {*} title the title of the task
 */
async function pushAddTaskValuesToClipboard(title) {
    taskClipboard.title = title.value;
        taskClipboard.taskStatus = 'toDo';
        pushDueDateToTaskClipboard()
        pushDescriptionToTaskClipboard()
        await pushTaskToBackend()
        confirmAddedTaskToBoard()
        await initBackend()
        clearTask()
        insertAddTask();
}

/**
 * resets the add task window and clears the clipboard values
 * 
 */
function clearTask() {
    clearTaskClipboard()
    insertAddTask();
}

/**
 * clears the taskClipboard
 * 
 * if changes are made in this object, these changes must be made in the global_variables.js, too!! 
 */
function clearTaskClipboard() {
    taskClipboard = {
        'title': '',
        'firstNames': [],
        'lastNames': [],
        'dueDate': '',
        'category': '',
        'categoryColor': '',
        'priority': '',
        'description': '',
        'subtasks': [],
        'subtasksState': [],
        'taskStatus': ''
    }
}

/**
 * pushes the due date information to the task clipboard
 * 
 */
function pushDueDateToTaskClipboard() {
    let dueDate = document.getElementById('addTaskInputDate');
    taskClipboard.dueDate = dueDate.value;
}

/**
 * pushes the priority information to the task clipboard
 * 
 */
function pushPriorityToTaskClipboard(priority) {
    let taskPriority = document.querySelectorAll('.add-task-priority-input:checked');
    taskClipboard.priority = taskPriority[0].name;
}

/**
 * pushes the description information to the task clipboard
 * 
 */
function pushDescriptionToTaskClipboard() {
    let description = document.getElementById('addTaskDescription');
    taskClipboard.description = description.value;
}

/**
 * a slide-in of the added-task-to-board information
 * 
 */
function confirmAddedTaskToBoard() {
    let confirmInfo = document.getElementById('taskAddedToBoard');

    confirmInfo.classList.remove('display-none')
    setTimeout(function () {
        confirmInfo.classList.remove('translate-y-110');
    }, 0)
    setTimeout(function () {
        confirmInfo.classList.add('translate-y-110')
        setTimeout(function () {
            confirmInfo.classList.add('display-none')
        }, 80)
    }, 1500)
}

function closeTaskList(){
    let categoryList = document.getElementById('addTaskCategoryList');
    if (categoryList.classList.contains('height-1')) {
        closeCategoryList();
    }
    if (contactListExpanded) {
        hideContactList();
    }
    
}