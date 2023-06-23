/**
 * continue to Sign Up section
 */
function signUp() {
  changeBackgroundColor();
  changeLogoColor();
  changeLogInInputHTML();
  addReturnButtonHTML();
}

/**
 * change all nessessary html elements
 */
function changeLogInInputHTML() {
  document.getElementById("logInContainerHeadline").innerHTML = `Sign in`;
  document.getElementById("logInInputContainer").innerHTML = SignUpInputHTML();
  document.getElementById("logInRememberMeForgotPasswordSection").innerHTML = ``;
  document.getElementById("logInCommitGuestLogInSection").innerHTML = SignUpButtonHTML();
  document.getElementById("logInContainer").innerHTML += addReturnButtonHTML();
  document.getElementById("registrationUpperRightInnerContainer").style.display = "none";
  document.getElementById("logInCommitGuestLogInSection").style.justifyContent = `center`;
  document.getElementById("logInRememberMeForgotPasswordSection").style.display = "none";
  document.getElementById("logInHeadlineContainer").style.height = "90px";
}

/**
 * create html parts for sign up page
 * @returns the html part of input fields
 */
function SignUpInputHTML() {
  return /*html*/ `
      <div class="log-in-input-field">
          <input type="text" placeholder="First and last name" id="logInName">
          <img src="./assets/img/signup-user.svg">
      </div>
      <div class="log-in-input-field">
          <input type="email" placeholder="Email" id="logInEmail">
          <img src="./assets/img/login-email.svg">
      </div>
      <div class="log-in-input-field" >
          <input type="password" placeholder="Password" id="passwordInputZero" onkeyup="checkNumberOfLetters('Zero')">
          <img class="cursor-pointer" src="./assets/img/password-icon.svg" id="passwordToggleZero" onclick="togglePasswordVisibility('Zero')">
      </div>
      `;
}

/**
 * create html for sign up section
 * @returns the html part of sign up button
 */
function SignUpButtonHTML() {
  return /*html*/ `
      <button class="log-in-commit-guest-log-in-section-button-log-in" onclick="signUpNewUser()">Sign Up</button>
      `;
}

/**
 * create new user and set some values in userList for the new user
 */
function signUpNewUser() {
  const newContactName = document.getElementById("logInName");
  const newContactEmail = document.getElementById("logInEmail");
  const newContactPassword = document.getElementById("passwordInputZero");

  if (newContactName.value === "" || newContactName.value.split(" ").length < 2) {
    signUpNewUserValidateName(newContactName)
    return
  }
  if (newContactEmail.value === "" || !newContactEmail.value.includes("@") || !newContactEmail.value.includes(".")) {
    signUpNewUserValidateEmail(newContactEmail)
    return
  }
  if (newContactPassword.value === "") {
    signUpNewUserValidatePassword(newContactPassword)
    return
  }
  signUpSetsUser(newContactName, newContactEmail, newContactPassword);
}

/**
 * validates the name
 * 
 * @param {*} newContactName the new contact name
 */
function signUpNewUserValidateName(newContactName) {
  newContactName.setCustomValidity("Please enter your first and last name.");
  newContactName.reportValidity();
}

/**
 * validates the email
 * 
 * @param {*} newContactEmail the new contact email
 */
function signUpNewUserValidateEmail(newContactEmail) {
  newContactEmail.setCustomValidity("Please enter your email.");
  newContactEmail.reportValidity();
}

/**
 * validates the password
 * 
 * @param {*} newContactPassword the new contact password
 */
function signUpNewUserValidatePassword(newContactPassword) {
  newContactPassword.setCustomValidity("Please enter your password.");
  newContactPassword.reportValidity();
}

/**
 * initialize the new user
 * 
 * @param {*} newContactName the new contact name
 * @param {*} newContactEmail the new contact email
 * @param {*} newContactPassword the new contact password
 */
function signUpSetsUser(newContactName, newContactEmail, newContactPassword) {
  let nameParts = newContactName.value.split(" ");
  let firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
  let lastName = nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1);
  let newUser = {
    firstName: firstName,
    lastName: lastName,
    email: newContactEmail.value.toLowerCase(),
    password: newContactPassword.value,
    backgroundColor: `${getRandomColor()}`,
  };
  addUser(newUser);
  returnToLoginPage();
  showNewContactMessage();
}