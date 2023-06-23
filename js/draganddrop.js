/**
 * Drag and Drop Lists
 * 
 */
const containers = [
    "toDoTasksContainer",
    "inProgressTasksContainer",
    "awaitFeedbackTasksContainer",
    "doneTasksContainer"
];

/**
 * for the drag and drop functionalities
 * 
 */
function loadDragAndDrop() {
    containers.forEach(container => {
        new Sortable(document.getElementById(container), {
            group: 'dropList',
            forceFallback: false,
            animation: 300,
            dragClass: "sortable-drag",
            ghostClass: "sortable-ghost",
            chosenClass: "sortable-chosen",
            onEnd: async function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement
                evt.to;    // target list
                evt.from;  // previous list
                evt.oldIndex;  // element's old index within old parent
                evt.newIndex;  // element's new index within new parent
                evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
                evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
                evt.clone // the clone element
                evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
                taskList[itemEl.id].taskStatus = evt.to.id.replace('TasksContainer', '');
                await backend.setItem('tasks', JSON.stringify(taskList));
                await initBackend()
            }
        });
    });
}

