/**
 * create forgot password section
 */
function forgotPassword() {
    changeBackgroundColor();
    changeLogoColor();
    createForgotPasswordHTML();
}

/**
 * create and change all the elements wich are needed for creating the forgot password section
 */
function createForgotPasswordHTML() {
    document.getElementById("registrationUpperRightInnerContainer").style.display = "none";
    document.getElementById("logInContainerHeadline").innerHTML = `I forgot my password`;
    document.getElementById("logInRememberMeForgotPasswordSection").style.display = "none";
    document.getElementById("logInInputContainer").innerHTML = forgotPasswordInputHTML();
    document.getElementById("logInContainer").innerHTML += addReturnButtonHTML();
    document.getElementById("forgotPasswordDescriptionContainer").style.display = "flex";
    document.getElementById("logInCommitGuestLogInSection").style.display = "none";
    if (!window.matchMedia('(max-width: 650px)').matches) {
        document.getElementById("logInContainer").style.width = "750px";
        document.getElementById("logInInputContainer").style.height = "50px";
    }
}

/**
 * create the html part for the form element in the forgot password section
 */
function forgotPasswordInputHTML() {
    let recipient = ``;

    return /*html*/ `
          <div >
              <form action="https://konrad-thiemann.developerakademie.net/Join/send_mail.php" method="POST" id="resetPassword">
              <div class="log-in-input-field"> 
                  <input type="email" placeholder="Email" required id="logInEmail" name="recipient" value="${recipient}">
                  <img src="./assets/img/login-email.svg">
              </div>
              <div class="wrong-password-container" id="wrongEmailAlert"></div>
                  <button class="log-in-commit-guest-log-in-section-button-log-in" id="sendEmailButton" type="button" onclick="sendEmail()" style="width:270px;">Send me the email</button>
              </form>
          </div>
      `;
}

/**
 * create html text element
 * @returns textelemt
 */
function addForgotPasswordHTML() {
    return /*html*/ `
      <span>Don't worry! We will send you an email with the instructions to reset your password.</span>
      `;
}

/**
 * check if email is valid/set to a user in the userList
 * send email for changing password
 * add animation that e mail was send
 */
function sendEmail() {
    let emailFromInput = document.getElementById("logInEmail").value;
    let emailExists = checkForExistingEmail(emailFromInput);
    let form = document.getElementById("resetPassword");

    if (emailExists) {
        form.submit();
        sendEmailAnimation();
    } else {
        document.getElementById(
            "wrongEmailAlert"
        ).innerHTML = `This email is not known, please try another one`;
        setTimeout(removeWrongEmailAlert, 2000);
    }
}

/**
 * check if email is set to a user in userList
 * @returns true or false depending on existing email
 */
function checkForExistingEmail(emailFromInput) {
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].email == emailFromInput) {
            return true;
        }
    }
    return false;
}

/**
 * create animation that shows that an email was send
 */
function sendEmailAnimation() {
    document.getElementById("emailSendMessageBackground").style.display = "flex";
    document.getElementById("emailSendMessage").style.display = "flex";
    document.getElementById("emailSendMessage").style.opacity = "1";
    document.getElementById("emailSendMessage").style.bottom = "50%";
    setTimeout(removeEmailAnimation, 1500);
}

/**
 * remove animation that shows that an email was send
 */
function removeEmailAnimation() {
    document.getElementById("emailSendMessageBackground").style.display = "none";
    document.getElementById("emailSendMessage").style.opacity = "0";
    document.getElementById("emailSendMessage").style.bottom = "100px";
    document.getElementById("emailSendMessage").style.display = "none";
}

/**
 * remove the alert if an email can not be found
 */
function removeWrongEmailAlert() {
    document.getElementById("wrongEmailAlert").innerHTML = ``;
}

//LOAD CHANGE PASSWORD PAGE

/**
 * create set new password section
 */
function loadChangePasswordPage() {
    setTimeout(createForgotPasswordAnimation, 300);
    createForgotPasswordNewURLHTML();
}

/**
 * create JOIN logo animation
 */
function createForgotPasswordAnimation() {
    changeLogoPosition();
    showLogInElements();
}

/**
 * create and change html elements for set new password section
 */
function createForgotPasswordNewURLHTML() {
    document.getElementById("logInContainer").innerHTML += addReturnButtonHTML();
    document.getElementById("forgotPasswordDescriptionContainer").style.display = "flex";
    document.getElementById("logInCommitGuestLogInSection").style.justifyContent = `center`;
    document.getElementById("logInContainer").style.justifyContent = "space-between";
    if (!window.matchMedia('(max-width: 650px)').matches) {
        document.getElementById("logInContainer").style.height = "540px";
        document.getElementById("logInContainer").style.width = "760px";
    }
}

/**
 * commits the input of both input fields
 */
function commitChangePassword() {
    checkForSameInput();
}

/**
 * check if both input fields have the same password set
 */
function checkForSameInput() {
    let passwordInput = document.getElementById("passwordInputOne").value;
    let passwordInputConfirm = document.getElementById("passwordInputTwo").value;

    if (passwordInput === passwordInputConfirm && passwordInput.length > 1) {
        updatePassword(passwordInput);
    } else {
        document.getElementById("wrongPasswordContainer").innerHTML = wrongPasswordHTML();
    }
}

/**
 * alert that both passwords entered are different
 * @returns text field
 */
function wrongPasswordHTML() {
    return /*html*/ `
      <span>Make sure the second password you typed matches the first and has more than one character.</span>
      `;
}

/**
 * update the password in userList
 */
async function updatePassword(password) {
    let emailFromURL = window.location.search.substring(1);
    let passwordUpdated;

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].email == emailFromURL) {
            userList[i].password = password;
            passwordUpdated = true;
            await saveEditContact();
            await initBackend();
            sendEmailAnimation();
        }
    }

    if (!passwordUpdated) {
        document.getElementById('wrongPasswordContainer').innerHTML = '<span>User not found!<span>';
    }
}
