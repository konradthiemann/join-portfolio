/**
 * adds a new contact to the userList
 */
function addNewContact() {
  const contactEditName = document.getElementById("contactNewName");
  const contactEditEmail = document.getElementById("contactNewEmail");
  const contactEditNumber = document.getElementById("contactNewNumber");
  let nameParts = contactEditName.value.split(" ");
  let firstName;
  let lastName;
  let validatedContact = validateNewContact(contactEditName, contactEditEmail, contactEditNumber, nameParts);
  if (validatedContact) {
    addNewContactValidation(contactEditEmail, contactEditNumber, firstName, lastName, validatedContact)
  }
}

/**
 * validates the new contact and adds it to the userList
 * 
 * @param {*} contactEditEmail the email of the new contact
 * @param {*} contactEditNumber the phone number of the new contact
 * @param {*} firstName the first name of the new contact
 * @param {*} lastName the last name of the new contact
 * @param {*} validatedContact the validated contact
 */
function addNewContactValidation(contactEditEmail, contactEditNumber, firstName, lastName, validatedContact) {
  firstName = validatedContact.firstName;
    lastName = validatedContact.lastName;
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: contactEditEmail.value,
      phoneNumber: contactEditNumber.value,
      backgroundColor: `${getRandomColor()}`,
    };
    addUser(newUser);
    hideEditContacts();
    insertContacts();
    showNewContactMessage();
}

/**
 * validates the new contact
 * 
 * @param {*} contactEditName the name of the new contact
 * @param {*} contactEditEmail the email of the new contact
 * @param {*} contactEditNumber the phone number of the new contact
 * @param {*} nameParts the name parts of the new contact (first and last name)
 * @returns the validated contact
 */
function validateNewContact(contactEditName, contactEditEmail, contactEditNumber, nameParts) {
  if ((nameParts.length < 2) || (nameParts[0].trim() === "") || (nameParts[1].trim() === "") || (nameParts.length > 2)) {
    contactValidation(contactEditName, contactNameCheck)
  } else if (contactEditEmail.value === "" || !contactEditEmail.value.includes('@') || !contactEditEmail.value.includes('.')) {
    contactValidation(contactEditEmail, contactEmailCheck)
  } else if (contactEditNumber.value === "") {
    contactValidation(contactEditNumber, contactNumberCheck)
  } else {
    let firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
    let lastName = nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1);
    return {
      firstName: firstName,
      lastName: lastName
    };
  }
}

/**
 * validates the contact
 * 
 * @param {*} contactEditName the name of the contact
 * @param {*} value validation message
 * @returns return
 */
function contactValidation(contactEditName, value) {
  contactEditName.setCustomValidity(value);
  contactEditName.reportValidity();
  return;
}

/**
 * show new contact created message
 *
 */
function showNewContactMessage() {
  if (document.getElementById("newContactCreated")) {
    const newContactMessage = document.getElementById("newContactCreated");

    newContactMessage.classList.add("showNewContactFadeIn");
    setTimeout(() => {
      newContactMessage.classList.remove("showNewContactFadeIn");
    }, 3000);
  }
}

/**
 *
 * Load the editContact content
 */
async function loadEditContact() {
  // userList aus dem Backend laden
  const userList = await backend.getItem("users", JSON.stringify(userList));
  return userList;
}

/**
 *
 * Prevent the editContact content from closing when clicking inside the content
 */
function doNotClose() {
  const editContactFadeIn = document.getElementById("contact-left-fadeIn");
  editContactFadeIn.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

/**
 * returns a random hex color code but not white
 *
 * @returns a string representing a hex color code
 */
function getRandomColor() {
  const colors = [
    "#F8D030",
    "#78C850",
    "#3899E6",
    "#E0306A",
    "#007030",
    "#1C6BA0",
    "#64C8F0",
    "#FF9BCB",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
