/**
 * 
 * hide question mark on the top right side   * 
 * @param {string} helpHTML
 */
function help() {
    contentDiv.innerHTML = helpHTML();
    document.getElementById("help").classList.add("help-none");

}

/**
 * 
 * show content of the help page
 * @param {string} helpHTML 
 */ 
function helpHTML() {
    return /*html*/`
     <div onclick="insertSummary()"><img class="help-arrow" src="assets/img/help-arrow.svg" alt=""></div>
            <h1>HELP</h1>
            <h2>What is Join?</h2>
            <p class="help-p">Join is your project management tool of choice. It is a typical Kanban board for you and your team. Kanban boards visually depict work at various stages of a process using cards to represent work items and columns to represent each stage of the process. Cards are moved from left to right to show progress and to help coordinate teams performing the work.
            </p>
            <h2>How to use it</h2>
            <div class="how-to-container">
                <div class="help-container">
                    <p class="help-number">1.</p>
                    <p>Add a task with title, description and category. Assign the task to other team members of your contact list or invite new contacts.</p>
                </div>
                <div class="help-container">
                    <p class="help-number">2.</p>
                    <p>Check the current status of your tasks in the kanban-board. You can drag and drop your task to change the status. Also it is possible to edit the task details.</p>
                </div>
                <div class="help-container">
                    <p class="help-number">3.</p>
                    <p>Add team members to your contact list to communicate to them fastly. Also you can assign tasks directly to your contacts.</p>
                </div>
            </div>
        </div>
    `
}