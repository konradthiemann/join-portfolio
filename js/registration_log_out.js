/**
 * create clickable background when log out button is shown
 */
function openLogOutButton() {
    document.getElementById("logOutBackground").style.display = "flex";
  }
  
  /**
   * reload main mage and reset current user
   */
  function logOut() {
    currentUser = "";
    location.reload();
  }
  
  /**
   * close log out button
   */
  function closeLogout() {
    document.getElementById("logOutBackground").style.display = "none";
  }
  
  /**
   * adds event listener to log in input field on enter
   */
  function addEventListenerLogInInput(){
  let logInForm = document.getElementById('logInForm');
  
    logInForm.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        logIn(); 
    }
  });
  }