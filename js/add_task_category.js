/**
 * inserts the category selector
 * 
 * @returns the html part of the category selector
 */
function insertCategorySelectorHTML() {
    return /*html*/ `
        <div class="add-task-category" id="addTaskCategory">
        <span>Category</span>
            <div onclick="toggleCategoryList()" class="add-task-category-form">
                <span id="selectedCategory">Select task category</span>
                <img class="rotate-arrow-90" id="addTaskCategoryListArrow" src="assets/img/dropdownicon.svg" alt="">
            </div>
        </div>
    `;
}

/**
 * "re"-insert the category selector if creating a new category is canceled.
 * 
 * @returns html for category selector
 */
function insertCategorySelectorFromInterruptHTML() {
    return /*html*/ `
        <span>Category</span>
            <div onclick="toggleCategoryList()" class="add-task-category-form">
                <span id="selectedCategory">Select task category</span>
                <img class="rotate-arrow-90" id="addTaskCategoryListArrow" src="assets/img/dropdownicon.svg" alt="">
            </div>
    `;
}

/**
 * inserts the category list
 * 
 * @returns  html part of the category list
 */
function insertCategoryListHTML() {
    return /*html*/ `
            <div id="addTaskCategoryList" class="add-task-category-list height-0 scrollbar scrollbar1">
                <input class="add-task-list-element" type="text" placeholder="New category" required minlength="1" maxlength="20">
            </div>
    `;
}

/**
 * inserts the category list
 * 
 */
function loadCategorylist() {
    document.getElementById('addTaskCategoryList').innerHTML = ``;
    document.getElementById('addTaskCategoryList').innerHTML += createCategoryInputHTML();
    for (i = 0; i < categoryList.length; i++) {
        document.getElementById('addTaskCategoryList').innerHTML += createCategoryListHTML(i);
    }
}

/**
 * inserts the category list
 * 
 * @returns the html part of a single category
 */
function createCategoryInputHTML() {
    return `
    <div class="add-task-create-new-category">
        <li class="add-task-list-element" onclick="createNewCategory()">New category</li>
    </div>
    `
}

/**
 * create category list item
 * 
 * @returns html part of the category list
 */
function createCategoryListHTML(i) {
    return `
    <li onclick="addCategoryToClipboard(${i})" class="add-task-list-element">${categoryList[i]['categoryName']}<div style="background-color:${categoryList[i]['categoryColor']}; height: 19px; width: 19px; border-radius:100%; border: 1px solid white"></div></li>
    `
}

/**
 *  build the surface to create a new category
 * 
 */
function createNewCategory() {
    toggleCategoryList();
    document.getElementById('addTaskCategory').innerHTML = ``;
    document.getElementById('addTaskCategory').innerHTML = createNewCategoryHTML();
    createNewCategoryColorSelectorHTML();
}

/**
 * create the input html and button html for creating a new category
 * 
 * @returns  html and button html for creating a new category
 */
function createNewCategoryHTML() {
    return /*html*/`
        <span>Category</span>
        <div class="add-task-create-new-category-container">
            <input class="add-task-list-element" id="newCategoryNameID" type="text" placeholder="New category name" required minlength="1" maxlength="20">
            <button class="interrupt-create-new-category" onclick="interruptCreateNewCategory()" style="border-right: solid 1px rgb(232,232,232)"><img src="assets/img/xblue.svg" alt=""></button> 
            <button class="confirm-create-new-category" onclick="confirmCreateNewCategory()"><img src="assets/img/check.svg" alt=""></button>
        </div>
    `
}

/**
 * button that interrupts the creation of a new category and returns it back to the category selecor
 * 
 */
function interruptCreateNewCategory() {
    document.getElementById('addTaskCategory').innerHTML = insertCategorySelectorFromInterruptHTML();
    document.getElementById('addTaskCreateNewCategoryColorSelector').innerHTML = ``;
}

/**
 * button function: create new category, load new category to backend, put new category to current task, return to category selecter surface, fill input with new category
 * 
 */
function confirmCreateNewCategory() {
    let newCategoryName = document.getElementById('newCategoryNameID').value;
    let newCategoryColor = getNewCategoryColor();

    addCategory({ "categoryName": newCategoryName, "categoryColor": newCategoryColor });
    initBackend();
    document.getElementById('addTaskCategory').innerHTML = insertCategorySelectorFromInterruptHTML();
    document.getElementById('addTaskCreateNewCategoryColorSelector').innerHTML = ``;
    addCategoryToClipboard(categoryList.length - 1);
}

/**
 *  connects selected color with new category name in the "create new category part"
 * iterate all radio buttons, check for selected radio button, get value if button is selected, return value
 * 
 * @returns the html part of the category list
 */
function getNewCategoryColor() {
    let newCategoryColor;
    let colors = document.getElementsByClassName('radio-color-picker');
    for (let i = 0; i < colors.length; i++) {
        if (colors[i].checked) {
            newCategoryColor = colors[i].value;
        }
    }
    return newCategoryColor;
}

/**
 * creates the container where all color selector radio buttons will be loaded in for the create new category section
 * 
 * @returns  the container where all color selector radio buttons will be loaded in for the create new category section
 */
function addTaskCreateNewCategoryColorSelector() {
    return /*html*/ `
        <div id="addTaskCreateNewCategoryColorSelector" class="add-task-create-new-category-color-selector"></div>
    `;
}

/**
 * creates the color selector html part for creating a new category
 * counting thew all available colors and creates a radio button for each color
 * 
 */
function createNewCategoryColorSelectorHTML() {
    for (let i = 0; i < categoryColors.length; i++) {
        document.getElementById('addTaskCreateNewCategoryColorSelector').innerHTML += createNewCategoryColorSelectorRadioButtonHTML(i);
    }
}

/**
 * returns the html part for each color picker radio button 
 * 
 * @returns  html part for each color picker radio button 
 */
function createNewCategoryColorSelectorRadioButtonHTML(i) {
    return /*html*/`
        <div class="radio-color-picker-container">
            <input type="radio" class="radio-color-picker" id="radioColorPicker${i}" value="${categoryColors[i]}" name="color">
            <label for="radioColorPicker${i}" class="radio-color-picker-label" style="background-color:${categoryColors[i]};">
        </div>
    `
}

/**
 *  add the created category values (name, color) to the clipboard and fill the input with new name and color
 * 
 */
function addCategoryToClipboard(i) {
    document.getElementById('selectedCategory').innerHTML = addCategoryToClipboardHTML(i);
    taskClipboard.category = categoryList[i]['categoryName'];
    taskClipboard.categoryColor = categoryList[i]['categoryColor'];
    toggleCategoryList();
}

/**
 * html part for filling the category input  
 * 
 * @returns html part for filling the category input 
 */
function addCategoryToClipboardHTML(i) {
    return `
    ${categoryList[i]['categoryName']}<div style="background-color:${categoryList[i]['categoryColor']}; height: 19px; width: 19px; border-radius:100%; border: 1px solid white; margin-left:10px;"></div>
    `
}

/**
 * toggles the categorylist while rotating the arrow by 90deg
 * 
 */
function toggleCategoryList() {
    hideContactList();
    let categoryList = document.getElementById('addTaskCategoryList');
    if (categoryList.classList.contains('height-1')) {
        closeCategoryList();
    } else {
        showCategoryList(); 
    }
}

/**
 * close the categorylist
 */
function closeCategoryList() {
    let expandArrow = document.getElementById('addTaskCategoryListArrow');
    let categoryList = document.getElementById('addTaskCategoryList');

    categoryList.classList.add('height-0')
    categoryList.classList.remove('height-1')
    expandArrow.classList.add('rotate-arrow-90');
    expandArrow.classList.remove('rotate-arrow-0');
}

/**
 * open the categorylist
 */
function showCategoryList() {
    let expandArrow = document.getElementById('addTaskCategoryListArrow');
    let categoryList = document.getElementById('addTaskCategoryList');

    categoryList.classList.add('height-1')
    categoryList.classList.remove('height-0')
    expandArrow.classList.add('rotate-arrow-0');
    expandArrow.classList.remove('rotate-arrow-90');
    loadCategorylist();
}