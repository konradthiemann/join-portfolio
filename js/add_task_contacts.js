/**
 * open contact list / load contacts 
 * search contact in the new task contact list
 */
function searchContacts() {
    expandContactList();
    let input = document.getElementById('addContactToTaskInput');
    let filter = input.value.toLowerCase();
    let contacts = document.getElementsByClassName('add-task-checkbox-container');
    let container = document.getElementsByClassName('add-task-contact-container');

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].innerText.toLowerCase().includes(filter)) {
            container[i].style.display = 'flex';
        } else {
            container[i].style.display = 'none';
        }
    }
}

/**
 * check if contact list is expanded or not and toggles current status
 * 
 */
function checkForExpandedContactList() {
    let expandArrow = document.getElementById('addTaskExpandArrow');
    if (!contactListExpanded) {
        expandArrow.classList.add('rotate-arrow-90');
        expandArrow.classList.remove('rotate-arrow-0');
    } else {
        expandArrow.classList.add('rotate-arrow-0');
        expandArrow.classList.remove('rotate-arrow-90');
        document.getElementById('addTaskContactList').classList.add('expand-contact-list');
    }
}

/**
 * open and close contact list in create new tast section
 * 
 */
function openAndCloseContactList() {
    if (!contactListExpanded) {
        closeCategoryList();
        expandContactList();
        searchContacts();
    } else {
        hideContactList();
    }
}

/**
 *  runs several functions for expanding contact list
 * 
 */
function expandContactList() {
    contactListExpanded = true;
    checkForExpandedContactList();
    loadContactList();
    checkCheckboxes();
    document.getElementById('addTaskContactList').classList.add('expand-contact-list');
}

/**
 * load all available contacts from userList and creates the html for them
 * 
 */
function loadContactList() {
    document.getElementById('addTaskContactList').innerHTML = ``;
    for (i = 0; i < userList.length; i++) {
        document.getElementById('addTaskContactList').innerHTML += createContactAddTaskHTML(i);
    }
}

/**
 * check each contact in contact list if its in the task and put it on checked=true if it is already in it
 * 
 */
function checkCheckboxes() {
    let nameStillInTask
    for (i = 0; i < userList.length; i++) {
        nameStillInTask = checkForContactInClipboard(i);

        if (nameStillInTask) {
            document.getElementById('checkBox' + userList[i].firstName + userList[i].lastName).checked = true;
        }
    }
}

/**
 *  hides the contact list 
 * 
 */
function hideContactList() {
    contactListExpanded = false
    checkForExpandedContactList()
    document.getElementById('addTaskContactList').classList.remove('expand-contact-list');
}

/**
 * returns the html list element for each contact
 * 
 * @returns  html list element for each contact
 * @param {*} i
 */
function createContactAddTaskHTML(i) {
    return /*html*/ `
    <li class="add-task-contact-container" onclick="toggleContactTask(${i})">
        <input class="add-task-contact-checkbox" type="checkbox" id="checkBox${userList[i].firstName}${userList[i].lastName}">
        <label for="confirm" class="add-task-checkbox-container">${userList[i].firstName} ${userList[i].lastName}</label>
    </li>
 `
}

/**
 *  removes/add contact to task
 * 
 */
function toggleContactTask(i) {
    let nameStillInTask = checkForContactInClipboard(i);

    if (nameStillInTask) {
        removeContactFromTask(i);
    } else {
        addContactToTask(i);
    }
}

/**
 *  checks if contact is in task or not
 * 
 * @returns if contact is in task or not
 * @param {*} i for the specific contact
 */
function checkForContactInClipboard(i) {
    let nameStillInTask = false;
    for (k = 0; k < taskClipboard.firstNames.length; k++) {
        if (userList[i].firstName == taskClipboard.firstNames[k] && userList[i].lastName == taskClipboard.lastNames[k]) {
            nameStillInTask = true;
        }
    }
    return nameStillInTask;
}

/**
 *  removes contact from task
 * 
 * @param {*} i for the specific task
 */
function removeContactFromTask(i) {
    for (j = 0; j < taskClipboard.firstNames.length; j++) {
        if (taskClipboard.firstNames[j] == userList[i].firstName && taskClipboard.lastNames[j] == userList[i].lastName) {
            taskClipboard.firstNames.splice(j, 1);
            taskClipboard.lastNames.splice(j, 1);
        }
    }
    createSelectedContactIcons();
}

/**
 *  adds contact to task
 * 
 */
function addContactToTask(i) {
    let newFirstNameForTask = userList[i].firstName;
    let newLastNameForTask = userList[i].lastName;
    taskClipboard.firstNames.push(newFirstNameForTask);
    taskClipboard.lastNames.push(newLastNameForTask);
    createSelectedContactIcons();
}

/**
 *  returns html code that creates a div where the selected contacts for the task gets shown as icon 
 * 
 * @returns  html code that creates a div where the selected contacts for the task gets shown as icon
 */
function createSelectedContactIconsDivHTML() {
    return /*html*/ `
        <div class="add-task-selected-contacts-icons" id="boardTaskAssignedContacts"></div>
    `;
}

/**
 *  creates the contact icons from selected contacts for a task
 * 
 */
function createSelectedContactIcons() {
    let contactContainer = document.getElementById('boardTaskAssignedContacts');
    let firstNameFirstLetter;
    let lastNameFirstLetter;
    let backgroundcolor;

    contactContainer.innerHTML = ``;
    for (let i = 0; i < taskClipboard.firstNames.length; i++) {
        firstNameFirstLetter = taskClipboard.firstNames[i].charAt(0);
        lastNameFirstLetter = taskClipboard.lastNames[i].charAt(0);

        for (let j = 0; j < userList.length; j++) {
            if (taskClipboard.firstNames[i] == userList[j]['firstName'] && taskClipboard.lastNames[i] == userList[j]['lastName']) {
                backgroundcolor = userList[j]['backgroundColor'];
            }
        }
        contactContainer.innerHTML += `
        <div class="add-task-selected-contact" style="background-color:${backgroundcolor};">${firstNameFirstLetter}${lastNameFirstLetter}</div>
        `;
    }
}
