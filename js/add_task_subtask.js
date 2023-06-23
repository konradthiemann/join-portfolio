/**
 * inserts the subtask and subtasklist
 * 
 * @returns the html part of it
 */
function insertSubtasksHTML() {
    return /*html*/ `
        <div class="add-task-subtasks">
            <span>Subtasks</span>
            <div class="add-task-subtasks-form">
                <input class="add-task-subtasks-input" id="addTaskSubtasksInput" placeholder="Add a new subtask" type="text" name="addTaskSubtask" id="" onclick=closeTaskList()>
                <img src="assets/img/plussubtask.svg" class="add-task-create-subtask"  onclick="createSubtask()">
            </div>
            <div class="add-task-subtask-list" id="addTaskCreateSubtask"></div>
        </div>
    `;
}

/**
 * creates and inserts the subtask, while validate the form (no empty string, no duplicates)
 * 
 * @returns the validation
 */
function createSubtask() {
    let subtaskContainer = document.getElementById('addTaskCreateSubtask');
    let subtaskInput = document.getElementById('addTaskSubtasksInput');

    if (subtaskInput.value.trim() === '') {
        subtaskInput.setCustomValidity('Your subtask is empty!');
        subtaskInput.reportValidity();
        return;
    }
    if (!taskClipboard.subtasks.includes(subtaskInput.value)) {
        createSubtaskHTML(subtaskContainer, subtaskInput);
    } else {
        subtaskInput.setCustomValidity('Subtask already exists');
        subtaskInput.reportValidity();
        return;
    }
}

/**
 * creates the html part of the subtask
 * 
 * @param {*} subtaskContainer the subtask container
 * @param {*} subtaskInput the subtask value
 */
function createSubtaskHTML(subtaskContainer, subtaskInput) {
    taskClipboard.subtasks.push(subtaskInput.value)
    taskClipboard.subtasksState.push(false);
    subtaskContainer.innerHTML += /*html*/ `
        <div class="add-task-subtask-div">
            <input onclick="addSubtaskToClipboard(this)" class="add-task-subtask-checkbox" type="checkbox" name="${subtaskInput.value}" id="">
            <span>${subtaskInput.value}</span>
        </div>
        `;
    subtaskInput.value = ``;
}

/**
 * checks the checked status of the checkboxes. pushes true or false to the subtaskState
 * 
 * @param {*} checkbox the specific checkbox clicked by the user
 */
function addSubtaskToClipboard(checkbox) {
    const subtaskIndex = taskClipboard.subtasks.indexOf(checkbox.name);
    if (subtaskIndex !== -1) {
        taskClipboard.subtasksState[subtaskIndex] = checkbox.checked;
    }
}