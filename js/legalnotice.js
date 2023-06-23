/**
 * remove class help-none to show the question mark on the top right side
 * @param {string} contentDivId
 */
function insertLegalNotice(){
    markActiveNavElement('legalNotice')
    contentDiv.innerHTML = legalNoticeHTML();
    document.getElementById("help").classList.remove("help-none");
}

/**
 * 
 * show content of the legal notice page
 * @returns the html part
 */
function legalNoticeHTML(){
    return /*html*/`
    <div class="legal-notice-div">
        <h1 style="margin-top: 0;">Legal Notice</h1>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>Patrizio M.</p>
        <h2>Kontakt: </h2>
        <p>Telefon: </p>
    </div>
    `
}