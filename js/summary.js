
/**
 * 
 * calls the summary-page
 */
function insertSummary() {
    markActiveNavElement('summary');
    contentDiv.innerHTML = summaryHTML();
    summaryTopLater();
    getDeadlineAndAmountOfUrgetTasks();
    getAmountofTasks();
    removeHelp();
    
}

/**
 * 
 * display right amount of urgent tasks and show nearest upcoming deadline
 */
function getDeadlineAndAmountOfUrgetTasks(){
    let numberOfUrgentTasks = 0;
    let upcomingDeadline = 0;

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].priority == 'Urgent') {
            numberOfUrgentTasks++;
            upcomingDeadline = compareDates(taskList[i].dueDate, upcomingDeadline);
        }
    }

    if (upcomingDeadline > 0) {
        let date = new Date(upcomingDeadline * 1000);
        upcomingDeadline = date.toLocaleString('en-us', { month: 'long' , day: 'numeric' ,  year: 'numeric'});
    }else{
        upcomingDeadline = 'No upcoming deadline';
    }

    document.getElementById('upcomingDeadline').innerHTML = upcomingDeadline;
    document.getElementById('urgentTasksAmount').innerHTML = numberOfUrgentTasks;
}

/**
 * 
 * compares all deadlines with urgent status
 * @returns nearest deadline from today with urgent status
 */
function compareDates(taskListDate, upcomingDeadline){
    let date = new Date(taskListDate);
    let currentDate = new Date();
    let taskListunixTimestamp = date.getTime() / 1000;
    let unixTimestampCurrentDate = currentDate.getTime() / 1000;

    if (upcomingDeadline == 0 && taskListunixTimestamp >= unixTimestampCurrentDate) {
        return taskListunixTimestamp;
    }
    else if (taskListunixTimestamp < upcomingDeadline && taskListunixTimestamp >= unixTimestampCurrentDate) {
        return taskListunixTimestamp;
    }
    else{
        return upcomingDeadline;
    }
}

/**
 * 
 * runs the function getAmountofTaskInStatus() with each variable of taskStatusNames array as parameter 
 */
function getAmountofTasks(){
    let taskStatusNames = ['toDo','inProgress', 'awaitFeedback', 'done'];
    for (let i = 0; i < taskStatusNames.length; i++) {
        getAmountofTasksInStatus(taskStatusNames[i]);    
    }
}

/**
 * 
 * count the amount of tasks for each task status name from parameter
 * @param {*} taskStatusName for the specific status name
 */
function getAmountofTasksInStatus(taskStatusName){
    let amountofTasks = 0;

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].taskStatus == taskStatusName) {
            amountofTasks++;
        }
    }
    document.getElementById(taskStatusName + 'Amount').innerHTML = `${amountofTasks}`;
}

/**
 * renders the summary content
 * 
 * @returns the html part
 */
function summaryHTML() {
    return /*html*/ `
    <div class="summary-div">
        <div class="summary-top" id="summary-top">
            ${summaryTopHTML()}
        </div>
        <div class="summary-bottom" id="summary-bottom">
            ${summaryBottomHTML()}
        </div>
    </div>
    `
}

/**
 * renders the top part of the summary page
 * 
 * @returns the html part
 */
function summaryTopHTML() {
    if (currentUser === 'guest') {
        return /*html*/ `Good morning,` + `<span> &nbsp; guest &nbsp;</span>`;
    } else {
        return /*html*/ `Good morning,` + `<div><span>&nbsp;${currentUser}&nbsp;</span></div>`;
    }
}

/**
 * renders the bottom part of the summary page
 * 
 * @returns the html part
 */
function summaryBottomHTML() {
    return /*html*/ `
    <div class="task-box-deadline" onclick="insertBoard()">
        <div class="task-box-deadline-left">
            <div class="task-picture-and-count">
                <img src="assets/img/tasksurgent.svg" alt="">
                <span class="task-number" style="color:white;" id="urgentTasksAmount">1</span>
            </div>
            <span>
                Tasks Urgent
            </span>
        </div>
        <div class="date-and-upcoming-deadline">
            <div>
                <span style="font-size:33px; font-weight:700;" id="upcomingDeadline">October 16, 2022</span> 
            </div>
            <div>
                <span>Upcoming Deadline</span> 
            </div>
        </div>
    </div>
    <div class="task-box-to-do" id="taskBoxToDo" onclick="insertBoard()">
        <div class="task-picture-and-count">
            <img src="assets/img/taskstodo.svg" alt="">
            <span class="task-number" id="toDoAmount"></span>
        </div>
        <span class="biggerTask">
            Tasks <br> To-do
        </span>
    </div>
    <div class="task-box" id="taskBoxTaskInBoard" onclick="insertBoard()">
        <div class="task-picture-and-count">
            <img src="assets/img/tasksinboard.svg" alt="">
            <span class="task-number">${taskList.length}</span>
        </div>
        <span>
            Tasks in <br> Board
        </span>
    </div>
    <div class="task-box" id="taskBoxTaskInProgress" onclick="insertBoard()">
        <div class="task-picture-and-count">
            <img src="assets/img/tasksinprogress.svg" alt="">
            <span class="task-number" id="inProgressAmount"></span>
        </div>
        <span>
            Tasks in <br> Progress
        </span>
    </div>
    <div class="task-box" id="TaskBoxAwaitingFeedback" onclick="insertBoard()">
        <div class="task-picture-and-count">
            <img src="assets/img/tasksawaitingfeedback.svg" alt="">
            <span class="task-number" id="awaitFeedbackAmount"></span>
        </div>
        <span>
            Awaiting <br> Feedback
        </span>
    </div>
    <div class="task-box" id="TaskBoxTaskDone" onclick="insertBoard()">
        <div class="task-picture-and-count">
            <img src="assets/img/tasksdone.svg" alt="">
            <span class="task-number" id="doneAmount"></span>
        </div>
        <span>
            Tasks <br> Done
        </span>
    </div>
    `
}