/**
 * Call the contacts-page
 */
function insertContacts() {
  markActiveNavElement("contacts");
  removeHelp();
  insertContentHTML();
  addTaskFillSlideInMenu();
  eventOnEditContact();
}

/**
 * remove classlist of ID help
 */
function removeHelp() {
  document.getElementById("help").classList.remove("help-none");
}

/**
 * Renders the contacts content
 * @returns The HTML part
 * */
function insertContentHTML() {
  contentDiv.innerHTML = /*html*/ `
    ${addTaskSlideInMenu()}
    <div class="contact-main">
      <div class="contact-left-fadeIn-bg" id="contact-left-fadeIn-bg"></div>
      <div class="contact-left-fadeIn" id="contact-left-fadeIn"></div>
          <div class="contact-left">${renderUserList()}</div>
          <div class="contact-right" id="contact-right"></div>
    </div>
      <div class="new-contact-button" onclick="openNewContact()">New contact
      <img class="new-contact-button-img" src="./assets/img/contact-member.svg" alt="">
      </div>
    <div class="newContactCreated" id="newContactCreated"><img src="./assets/img/contactCreated.svg"></div>`;
}
/**
 *
 * Call an event on editContact content
 */
function eventOnEditContact() {
  const editContactFadeInBg = document.getElementById("contact-left-fadeIn-bg");
  const editContactFadeIn = document.getElementById("contact-left-fadeIn");
  editContactFadeInBg.addEventListener("click", function () {
    editContactFadeInBg.classList.remove("show-left");
    editContactFadeIn.classList.remove("show-left");
  });
}

/**
 * renders the user list
 * 
 * @returns the html part
 */
function renderUserList() {
  const initialLetters = [...new Set(userList.map(user => user.firstName.charAt(0)))].sort();

  let userListHTML = "";
  for (const initialLetter of initialLetters) {
    const usersForLetterHTML = generateUsersForLetterHTML(userList, initialLetter);

    userListHTML += /*html*/ `
      <div class="contact-letter-main">
        <h4 class="contact-letter">${initialLetter}</h4>
        ${usersForLetterHTML}
      </div>`;
  }

  return userListHTML;
}

/**
 * Renders the contacts content with a sort the list of initial letters alphabetically
 * @returns The HTML part
 */
function generateUsersForLetterHTML(userList, initialLetter) {
  const usersForLetter = userList.filter(user => user.firstName.charAt(0) === initialLetter && user.lastName !== "");
  const usersForLetterHTML = usersForLetter.map(user => {
    const firstNameLetter = user.firstName.charAt(0);
    const lastNameLetter = user.lastName.charAt(0);
    const contactName = user.firstName + " " + user.lastName;
    return generateUsersForLetterReturnHTML(firstNameLetter, lastNameLetter, contactName, user);
  }).join("");

  return usersForLetterHTML;
}

/**
 * renders the contacts content with a sort the list of initial letters alphabetically
 * 
 * @param {*} firstNameLetter the first letter of the first name
 * @param {*} lastNameLetter the first letter of the last name
 * @param {*} contactName the contact name
 * @param {*} user the user
 * @returns the html part
 */
function generateUsersForLetterReturnHTML(firstNameLetter, lastNameLetter, contactName, user) {
  return /*html*/ `
  <div class="contact-child-div" onclick="contactRightSide(${userList.indexOf(user)})">
    <div class="contact-child-div">
      <div style="background-color: ${user.backgroundColor}" class="contact-child">
        <p>${firstNameLetter}${lastNameLetter}</p>
      </div>
      <div>
        <p class="contact-name">${contactName}</p>
        <p class="contact-email">${user.email}</p>
      </div>
    </div>
  </div>`;
}


/**
 * Call the renderContactSideScroll content and add show class for fade in from right
 *
 * @param {number} i The index of the user in the userList
 * */
function contactRightSide(i) {
  let rightSide = document.getElementById("contact-right");
  rightSide.classList.add("show");
  rightSide.innerHTML = renderContactSideScroll(i);
}

/**
 * Renders the contactSideScroll content
 *
 * @returns The HTML part
 */
function renderContactSideScroll(i) {
  let ContactSideScrollHTML;
  const firstNameLetter = userList[i].firstName.charAt(0);
  const lastNameLetter = userList[i].lastName.charAt(0);
  const contactNameLetter = firstNameLetter + lastNameLetter;
  const contactName = userList[i].firstName + " " + userList[i].lastName;

  ContactSideScrollHTML = /*html*/ `
  <div class="contact-right-side">
    <div class="show-contact">
      <div onclick="insertContacts()">
        <img class="help-arrow-edit" src="assets/img/help-arrow.svg" alt="">
      </div>
      <div id="contactdetails">
        <div class="contact-detail-main-side" id="0">
        </div>        
        <div class="contact-detail-head">
          <div style="background-color: ${userList[i]["backgroundColor"]
    }" class="contact-big-letter">${contactNameLetter}</div>
            <div class="contact-detail-name-task">
              <p class="contact-detail-big-name">${contactName}</p>
              <p class="contact-detail-add-task" onclick="toggleAddTaskMenuOffScreen()"><img src="./assets/img/blue-plus.svg" alt="">Add Task</p>
            </div>
          </div>
        </div>
        <div class="contact-detail-info-main">
          <p class="contact-detail-info">Contact Information</p>
          <p class="contact-detail-edit" onclick="editContact(${i})"><img class="icon-edit-contact" src="./assets/img/edit-contact.svg" alt=""><span class="edit-contact-text"> Edit Contact</span></p>
          <p class="contact-detail-edit" onclick="editContact(${i})"><img class="icon-edit-img-contact" src="./assets/img/pen.svg" alt=""></p>
        </div>              
        <div>
          <p class="contact-detail-email-number">Email</p>
          <a href="mailto:${userList[i].email}"><span>${userList[i].email
    }</span></a>
        </div>
        <div>
          <p class="contact-detail-email-number">Mobile</p>
          <p>${userList[i].phoneNumber || ""}</p> 
        </div>
      </div>
    </div>
  </div>`;
  return ContactSideScrollHTML;
}

/**
 * Call the editContact content
 *
 * @param {number} i The index of the user in the userList
 */
function editContact(i) {
  showEditContacts();
  showEditContactsHTML(i);
}
/**
 * show the editContact content
 * @param {number} i The index of the user in the userList
 */
function showEditContacts() {
  const editContactFadeIn = document.getElementById("contact-left-fadeIn");
  const editContactFadeInBg = document.getElementById("contact-left-fadeIn-bg");
  editContactFadeInBg.classList.add("show-left");
  editContactFadeIn.classList.add("show-left");
}
/**
 * show the editContact HMTMLcontent
 *
 */
function showEditContactsHTML(i) {
  const firstNameLetter = userList[i].firstName.charAt(0);
  const lastNameLetter = userList[i].lastName.charAt(0);
  const contactNameLetter = firstNameLetter + lastNameLetter;
  const editContactFadeIn = document.getElementById("contact-left-fadeIn");
  editContactFadeIn.innerHTML = /*html*/ `
<div class="edit-contact">
  <div class="edit-contact-head">
    <div class="edit-contact-cross">
      <img class="img-cross" src="./assets/img/theCross.svg" onclick="hideEditContacts()" alt="">
    </div>

    <div class="edit-contact-header-info">
      <div><img class="img-edit-contact" src="./assets/img/headerjoinlogo.svg" alt=""></div>
        <div class="edit-contact-h">Edit contact</div>
        <div class="edit-contact-text-edit">Tasks are better with a team!</div>                   
      </div>
    </div>
    <div class="edit-contact-main">
      <div style="background-color: ${userList[i]["backgroundColor"]}" class="contact-detail-big-letter">
        <p>${contactNameLetter}</p>
      </div>
      <div>
        <div class="input-contact-main">
          <div class="input-contact">
            <input required type="text" id="contactEditName" class="input-contact-name" value="${userList[i].firstName} ${userList[i].lastName}">
            <img src="./assets/img/signup-user.svg" alt="">
          </div>
          <div class="input-contact">
            <input required type="email" id="contactEditEmail" class="input-contact-email" value="${userList[i].email}">
              <img src="./assets/img/login-email.svg" alt="">
          </div>
          <div class="input-contact">
           <input required type="number" id="contactEditNumber" class="input-contact-name" value="${userList[i].phoneNumber || ''}">
            <img src="./assets/img/phone.svg" alt="">
         </div>   
                   
        </div>
          <div class="button-container">
          <button class="button-create" onclick="invEditContact(${i})" type="submit">Save</button>
          </div>
      </div>
  </div>
</div>`;
  return editContactFadeIn;
}

/**
 * edits the contact and saves it to the userList
 * 
 * @param {*} index the index of the user in the userList
 */
async function invEditContact(index) {
  const contactEditName = document.getElementById("contactEditName");
  const contactEditEmail = document.getElementById("contactEditEmail");
  const contactEditNumber = document.getElementById("contactEditNumber");
  const nameParts = contactEditName.value.split(" ");

  const validatedContact = validateNewContact(contactEditName, contactEditEmail, contactEditNumber, nameParts);
  if (validatedContact) {
    invEditContactVariables(contactEditEmail, contactEditNumber, index, validatedContact);
  }
}

/**
 * sets the variables for the editContact function
 * 
 * @param {*} contactEditEmail the email of the contact
 * @param {*} contactEditNumber the phone number of the contact
 * @param {*} index the index of the user in the userList
 * @param {*} validatedContact the validated contact
 */
async function invEditContactVariables(contactEditEmail, contactEditNumber, index, validatedContact) {
  userList[index].firstName = validatedContact.firstName;
  userList[index].lastName = validatedContact.lastName;
  userList[index].email = contactEditEmail.value;
  userList[index].phoneNumber = contactEditNumber.value;

  const contactName = `${userList[index].firstName} ${userList[index].lastName}`;
  const firstNameLetter = userList[index].firstName.charAt(0);
  const lastNameLetter = userList[index].lastName.charAt(0);
  const contactNameLetter = firstNameLetter + lastNameLetter;
  const contactDetailBigLetter = document.querySelector(".contact-detail-big-letter");
  const contactDetailBigName = document.querySelector(".contact-detail-big-name");

  contactDetailBigLetter.textContent = contactNameLetter;
  contactDetailBigName.textContent = contactName;

  await initEditContacts();
}

/**
 * saves the edited contact to the backend
 */
async function initEditContacts() {
  hideEditContacts();
  await saveEditContact();
  insertContacts();
  await initBackend();
}

/*
 * Hide the editContact content
 * @param {number} i The index of the user in the userList
 */
function hideEditContacts() {
  const editContactFadeInBg = document.getElementById("contact-left-fadeIn-bg");
  const editContactFadeIn = document.getElementById("contact-left-fadeIn");
  editContactFadeInBg.classList.remove("show-left");
  editContactFadeIn.classList.remove("show-left");
  bgHideRemove();
  removeAddContact();
}

/**
 *
 * Call the newContact content
 */
function openNewContact() {
  for (let i = 0; i < userList.length; i++) {
    showAddContact();
  }
}

/**
 *
 * Hide the content in gray background
 */
function bgHide() {
  const bgHide = document.getElementById("contact-left-fadeIn-bg");
  bgHide.classList.add("show-left");
}

/**
 *
 * remove the gray background from content
 */
function bgHideRemove() {
  removeAddContact();
  const bgHideRemove = document.getElementById("contact-left-fadeIn-bg");
  bgHideRemove.classList.remove("show-left");
}

/**
 *
 *  remove the Add contact content from the left Side
 */
function removeAddContact() {
  let newContactFadeIn = document.getElementById("contact-left-fadeIn");
  newContactFadeIn.classList.remove("show-left");
}

/**
 *
 * show the Add contact content from the left Side
 */
function showAddContact() {
  bgHide();
  let newContactFadeIn = document.getElementById("contact-left-fadeIn");
  newContactFadeIn.classList.add("show-left");
  newContactFadeIn.innerHTML = /*html*/ `

  <div class="new-contact">
  <div class="new-contact-head">
      <div class="new-contact-cross">
          <img class="img-cross" src="./assets/img/theCross.svg" onclick="bgHideRemove()" alt="">
      </div>
      <div class="new-contact-header-info">
          <div>
              <img class="img-edit-contact" src="./assets/img/headerjoinlogo.svg" alt="">
          </div>
          <div class="new-contact-h">Add contact</div>
          <div class="add-contact-text">
              Tasks are better with a team!
          </div>
          <div class="new-contact-main" >
            <div class="img_newContact">
              <img src="./assets/img/addNewContactProfil.svg">
            </div> 
              <div>
                  <div class="input-newContact-main">
                      <div class="input-contact">
                          <input required type="text" pattern="[A-Za-z]+" id="contactNewName" class="input-contact-name" placeholder="Name">
                              <img src="./assets/img/signup-user.svg" alt="">
                              </div>
                              <div class="input-contact">
                                  <input required="" type="email" id="contactNewEmail" class="input-contact-email" placeholder="Email">
                                      <img src="./assets/img/login-email.svg" alt="">
                                      </div>
                                      <div class="input-contact">
                                          <input required="" type="number" id="contactNewNumber" class="input-contact-name" placeholder="Phone">
                                              <img src="./assets/img/phone.svg" alt="">
                                              </div>
                                      </div>
                                      <div class="button-container">
                                          <button class="button-cancel" onclick="bgHideRemove()">Cancel
                                              <svg width="14" height="13" viewBox="0 0 14 13" fill="blue" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M7.00106 6.50008L12.2441 11.7431M1.75806 11.7431L7.00106 6.50008L1.75806 11.7431ZM12.2441 1.25708L7.00006 6.50008L12.2441 1.25708ZM7.00006 6.50008L1.75806 1.25708L7.00006 6.50008Z" stroke="#647188" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                              </svg>
                                          </button>
                                          <button class="button-create" onclick="addNewContact()">
                                              Create contact
                                              <img class="create-contact" src="./assets/img/akar-icons_check.svg" alt=""></button>
                                      </div>
                              </div>
                      </div>
                  </div>
              </div>   
      `;
  return newContactFadeIn;
}

