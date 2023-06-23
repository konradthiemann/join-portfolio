/**
 * loading the Log In / Registration Page
 */
function loadRegistrationPage() {
  setTimeout(createAnimation, 300);
  setElementsFromLocalStorage();
}

//STARTING ANIMATION

/**
 * create the JOIN logo animation and create all elemets
 */
function createAnimation() {
  changeBackgroundColor();
  changeLogoColor();
  changeLogoPosition();
  showLogInElements();
}

/**
 * change background color between white and blue
 */
function changeBackgroundColor() {
  let backgroundColorLogin = document.getElementById("registrationContainer");
  if (backgroundColorLogin.style.backgroundColor == "rgb(255, 255, 255)") {
    backgroundColorLogin.style.backgroundColor = "rgb(69, 137, 255)";
  } else if (backgroundColorLogin.style.backgroundColor == "rgb(69, 137, 255)" || backgroundColorLogin.style.backgroundColor == "") {
    backgroundColorLogin.style.backgroundColor = "rgb(255, 255, 255)";
  }
}

/**
 * change logo color bwtween white and blue
 */
function changeLogoColor() {
  let paths = document.querySelectorAll(".join-logo-login-color");

  for (let i = 0; i < paths.length; i++) {
    if (paths[i].getAttribute("fill") == "rgb(69, 137, 255)") {
      paths[i].setAttribute("fill", "rgb(255, 255, 255)");
    } else {
      paths[i].setAttribute("fill", "rgb(69, 137, 255)");
    }
    paths[i].style.transition = "fill 300ms ease-in-out";
  }
}

/**
 * change JOIN logo position
 */
function changeLogoPosition() {
  document
    .getElementById("joinLogoLogin")
    .classList.add("join-logo-login-new-position");
}

/**
 * make log in elemets visible
 */
function showLogInElements() {
  document.getElementById("logInContainer").style.opacity = "1";
  if (document.getElementById("registrationUpperRightInnerContainer")) {
    document.getElementById(
      "registrationUpperRightInnerContainer"
    ).style.display = "flex";
  }
}

//PASSWORD

/**
 * check the number of letters in input field for chosing the right password icon
 * @param idNumber - the addon for identify the right ID
 */
function checkNumberOfLetters(idNumber) {
  let passwordInput = document.getElementById("passwordInput" + idNumber);
  let passwordToggle = document.getElementById("passwordToggle" + idNumber);

  if (passwordInput.value.length == 0) {
    passwordToggle.src = "./assets/img/password-icon.svg";
  } else {
    chooseRightPasswordImgage(idNumber);
  }
}

/**
 * chose right icon for the password input field
 * @param idNumber - the addon for identify the right ID
 */
function chooseRightPasswordImgage(idNumber) {
  let passwordInput = document.getElementById("passwordInput" + idNumber);
  let passwordToggle = document.getElementById("passwordToggle" + idNumber);

  if (passwordInput.type === "password") {
    passwordToggle.src = "./assets/img/passwordHide.svg";
  } else if (passwordInput.type === "text") {
    passwordToggle.src = "./assets/img/passwordShow.svg";
  }
}

/**
 * switch between visible and hidden password
 * change input type between text/password
 * @param idCount - the addon for identify the right ID
 */
function togglePasswordVisibility(idCount) {
  let passwordInput = document.getElementById("passwordInput" + idCount);
  let passwordToggle = document.getElementById("passwordToggle"+ idCount);
  if (passwordInput.value.length > 0) {
    if (passwordInput.type === "password") {
      // Show the password
      passwordInput.type = "text";
      passwordToggle.src = "./assets/img/passwordShow.svg";
    } else {
      // Hide the password
      passwordInput.type = "password";
      passwordToggle.src = "./assets/img/passwordHide.svg";
    }
  }
}

// GUEST LOGIN

/**
 * hide login screen and continue as guest
 */
function guestLogIn() {
  document.getElementById("registrationContainer").style.display = "none";
  document.body.innerHTML = loadContentHTML();
  contentDiv = document.getElementById('content');
  currentUser = "guest";
  insertSummary();
  showWelcomeUserMessage();
}

/**
 * inset the content - HTML part into the <body>
 * @returns content html
 */
function loadContentHTML(){
  return /*html*/ `
    <header>
        <img class="header-left" src="assets/img/headerjoinlogo.svg" alt="">
        <div class="header-right">
            <span>Kanban Project Management Tool</span>
            <div id="help" class="help" onclick="help()"><img src="assets/img/question.svg" alt=""></div>
            <img onclick="openLogOutButton()" src="assets/img/headeruserimage.png" alt="">
        </div>
    </header>
    <div class="nav-and-content">
        <nav>
            <div class="nav-top">
                <div onclick="insertSummary();" class="nav-element" id="summaryNavElement"><img
                        src="assets/img/summaryicon.svg" alt=""><span>Summary</span></div>
                <div onclick="insertBoard()" class="nav-element" id="boardNavElement"><img
                        src="assets/img/boardicon.svg" alt=""><span>Board</span></div>
                <div onclick="insertAddTask()" class="nav-element" id="addTaskNavElement"><img
                        src="assets/img/addtaskicon.svg" alt=""><span>Add
                        Task</span></div>
                <div onclick="insertContacts()" class="nav-element" id="contactsNavElement"><img
                        src="assets/img/contacticon.svg" alt=""><span>Contacts</span></div>
            </div>
            <div class="nav-bottom">
                <div onclick="insertLegalNotice()" class="nav-element" id="legalNoticeNavElement">
                    <img src="assets/img/infoicon.svg" alt="">
                    <span class="notice-link">Legal notice</span>
                </div>
                <div onclick="insertPrivacy()" class="nav-element" id="privacyNavElement">
                    <img src="assets/img/privacyicon.svg" alt="">
                    <span class="privacy-link">privacy</span>
                </div>
            </div>
        </nav>
        <!-- Content -->
        <div class="content scrollbar1" id="content"></div>
    </div>
    <div class="task-added-to-board translate-y-110 display-none" id="taskAddedToBoard">
        <span>Task added to board</span>
        <img src="assets/img/taskaddedtoboard.svg" alt="">
    </div>
    <div onclick="toggleAddTaskMenuOffScreen()" class="" id="reduceOpacity"></div>
    <div class="board-task-slide-in-div board-task-translate-y display-none" id="boardTaskSlideInDiv"></div>
    <div onclick="toggleTaskBoardTask()" class="" id="reduceOpacityBehindTask"></div>
    <div class="log-out-background" id="logOutBackground" onclick="closeLogout()">
    <button class="log-out-button" onclick="logOut()">Log out</button>
  `;
}

/**
 * show welcome User message
 *
 */
function showWelcomeUserMessage() {
  const userMessageEarly = document.getElementById("summary-top");
  if (userMessageEarly) {
    userMessageEarly.classList.add("welcome-user-message");
    setTimeout(() => {
      userMessageEarly.classList.remove("welcome-user-message");
    }, 1500);
  }
}

/**
 * set the Fade in animation for the welcome message User later
 *
 */
function summaryTopLater() {
  const userMessageLater = document.getElementById("summary-top-later");
  if (userMessageLater) {
    userMessageLater.classList.add("summary-top-later");
    setTimeout(() => {
      userMessageLater.classList.remove("summary-top-later");
    }, 1);
  }
}

/**
 * check for correct inputs and continue as user
 */
function logIn() {
  let inputElementPassword = document.getElementById("passwordInputZero");
  let emailFromInput = document.getElementById("logInEmail").value.toLowerCase();

  rememberMe();
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].password == inputElementPassword.value && userList[i].email == emailFromInput) {
      currentUser = userList[i].firstName;
      document.body.innerHTML = loadContentHTML();
      contentDiv = document.getElementById('content');
      insertSummary();
      showWelcomeUserMessage();
    } else if (userList[i].password !== inputElementPassword.value && inputElementPassword.placeholder == `Password`) {
      toggleWrongPasswordAlert();
      togglePasswordPlaceholder();
      setElementsFromLocalStorage();
    } 
  }
  inputElementPassword.value = ``;
}

/**
 * alert if password doesnt match to email adress
 */
function toggleWrongPasswordAlert() {
  const divElement = document.getElementById("wrongPasswordContainer");

  if (divElement.innerHTML.trim() === "") {
    divElement.innerHTML = `Wrong password or email`;
  } else {
    divElement.innerHTML = ``;
  }
}

/**
 * toggle password input placeholder if password was entered wrong
 */
function togglePasswordPlaceholder() {
  const inputElement = document.getElementById("passwordInputZero");

  if (inputElement.placeholder.trim() === "Password") {
    inputElement.placeholder = `Ups! Try again`;
  } else {
    inputElement.placeholder = `Password`;
  }
}

//REMEMBER ME

/**
 * save login date in local storage if remember me box is checked
 */
function rememberMe() {
  let emailFromInput = document.getElementById("logInEmail").value;

  if (document.getElementById("rememberMe").checked) {
    localStorage.setItem("rememberCheckbox", "true");
    localStorage.setItem("rememberEmail", emailFromInput);
  } else {
    localStorage.setItem("rememberCheckbox", "");
    localStorage.setItem("rememberEmail", "");
  }
}

/**
 * set input fields if remember me checkbox was checked
 */
function setElementsFromLocalStorage() {
  let checkboxStatus = localStorage.getItem("rememberCheckbox");
  let emailFromLocalStorage = localStorage.getItem("rememberEmail");
  let emailFromInput = document.getElementById("logInEmail");

  if (!emailFromLocalStorage || emailFromLocalStorage === "") {
    emailFromInput.value = ``;
  } else {
    emailFromInput.value = localStorage.getItem("rememberEmail");
  }

  if (checkboxStatus == "true") {
    document.getElementById("rememberMe").checked = true;
  } else {
    document.getElementById("rememberMe").checked = false;
  }
}

//Return to Login page

/**
 * create button who returns to log in page
 * @returns the html part of return to log in page button
 */
function addReturnButtonHTML() {
  return /*html*/ `
    <button onclick="returnToLoginPage()" class="return-to-log-in-page-button"><img src="assets/img/arrow-left.svg" alt=""></button>
    `;
}

/**
 * return to log in page from same and different URL
 */
function returnToLoginPage() {
  if (window.location.href.includes("change_password.html")) {
    window.location.href = "index.html";
  } else if (window.location.href.includes("index.html")) {
    returnToLoginPageCSSHTML();
    setElementsFromLocalStorage();
  }
}

/**
 * create and change all html elemts wich are needed for returning back to log in page
 */
function returnToLoginPageCSSHTML() {
  changeBackgroundColor();
  changeLogoColor();
  showLogInElements();
  document.getElementById("registrationUpperRightInnerContainer").style.display = "flex";
  document.getElementById("logInContainer").innerHTML = createLogInElementsHTML();
  addEventListenerLogInInput();
  document.getElementById("logInCommitGuestLogInSection").style.justifyContent = `space-between`;
  document.getElementById("logInRememberMeForgotPasswordSection").style.display = "flex";
  document.getElementById("forgotPasswordDescriptionContainer").style.display = "none";
  document.getElementById("logInCommitGuestLogInSection").style.display = "flex";
  if (!window.matchMedia('(max-width: 650px)').matches) {
    document.getElementById("logInContainer").style.width = "652px";
    document.getElementById("logInInputContainer").style.height = "130px";
  }
}

/**
 * create html log in elements
 */
function createLogInElementsHTML() {
  return /*html*/ `
    <div class="log-in-headline-container" id="logInHeadlineContainer">
        <div class="log-in-headline-and-border-container">
            <span id="logInContainerHeadline" class="log-in-container-headline">Log in</span>
        </div>
    </div>
    <div class="forgot-password-description-container" id="forgotPasswordDescriptionContainer">
                <span class="forgot-password-description" id="forgotPasswordDescription">Don't worry! We will send you an email with the instructions to reset your password.</span>
            </div>
    <div class="log-in-input-container" id="logInInputContainer">
      <form id="logInForm">
        <div class="log-in-input-field">
            <input type="email" placeholder="Email" id="logInEmail">
            <img src="./assets/img/login-email.svg">
        </div>
        <div class="log-in-input-field" >
            <input type="password" placeholder="Password" id="passwordInputZero" onkeyup="checkNumberOfLetters('Zero')">
            <img class="cursor-pointer" src="./assets/img/password-icon.svg" id="passwordToggleZero" onclick="togglePasswordVisibility('Zero')">
        </div>
      </form>  
        <div class="wrong-password-container" id="wrongPasswordContainer"></div>
    </div>
    <div class="log-in-remember-me-forgot-password-section" id="logInRememberMeForgotPasswordSection">
        <div class="log-in-remember-me-input-label">
            <input type="checkbox" name="rememberMe" id="rememberMe" class="remember-me-checkbox">
            <span>Remember me</span>
        </div>
        <a onclick="forgotPassword()">Forgot my password</a>
    </div>
    <div class="log-in-commit-guest-log-in-section" id="logInCommitGuestLogInSection">
        <button class="log-in-commit-guest-log-in-section-button-log-in" onclick="logIn()">Log in</button>
        <button class="log-in-commit-guest-log-in-section-button-guest" onclick="guestLogIn()">Guest log in</button>
    </div>
    `;
}