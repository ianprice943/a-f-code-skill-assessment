var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function(taskString, checked) {
  listItem = document.createElement("li");
  checkBox = document.createElement("input");
  label = document.createElement("label");
  editInput = document.createElement("input");
  editButton = document.createElement("button");
  deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  checkBox.checked = checked;
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function () {
  var taskInput = document.getElementById("new-task");
  var listItemName = taskInput.value;

  var errorText = document.getElementById("error-text");
  var tasks = retrieveLocalStorage();
  
  for(var i = 0; i < tasks.length; i++) {
    if(tasks[i].task === listItemName) {
      errorText.innerText = "You've already added this task.";
      return;
    }
  }

  if(listItemName === "") {
    errorText.innerText = "Please enter a task before clicking the add button.";
    return;
  }


  listItem = createNewTaskElement(listItemName, false)
  incompleteTasksHolder.appendChild(listItem)
  bindTaskEvents(listItem, taskCompleted)
  taskInput.value = "";
  errorText.innerText = "";
  addToLocalStorage(listItemName, false);
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelectorAll("input[type=text")[0];
  var label = listItem.querySelector("label");
  var button = listItem.getElementsByTagName("button")[0];

  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    var complete = listItem.children[0].checked;
    updateLocalStorage(label.innerText, editInput.value, complete);
    label.innerText = editInput.value
    button.innerText = "Edit";
  } else {
    editInput.value = label.innerText
    button.innerText = "Save";
  }
  
  listItem.classList.toggle("editMode");
};

var deleteTask = function (el) {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
  deleteFromLocalStorage(listItem.children[1].innerText);
};

var taskCompleted = function (el) {
  var listItem = this.parentNode;
  var label = listItem.querySelector("label");
  updateLocalStorage(label.innerText, label.innerText, true);
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
  var listItem = this.parentNode;
  var label = listItem.querySelector("label");
  updateLocalStorage(label.innerText, label.innerText, false);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler, cb) {
  var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
  var editButton = taskListItem.querySelectorAll("button.edit")[0];
  var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

var retrieveLocalStorage = function() {
  if(localStorage.getItem('tasks') !== null) {
    var tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);
    return tasks;
  } else {
    return null;
  }
}

var appendToTaskLists = function() {
  var tasks = retrieveLocalStorage();
  if(tasks !== null && tasks !== []) {
    for(var i = 0; i < tasks.length; i++) {
      var task;
      if(tasks[i].complete) {
        task = createNewTaskElement(tasks[i].task, true); 
        completedTasksHolder.append(task);
        bindTaskEvents(task, taskIncomplete)
      } else {
        task = createNewTaskElement(tasks[i].task, false);
        incompleteTasksHolder.append(task);
        bindTaskEvents(task, taskCompleted)
      }
    }
  }
}

var addToLocalStorage = function(task, complete) {
  var tasks = retrieveLocalStorage();
  if(tasks === null) {
    tasks = [];
  }
  tasks.push({"task": task, "complete": complete});
  tasks = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasks);
}

var deleteFromLocalStorage = function(task) {
  var tasks = retrieveLocalStorage();
  if(tasks !== null && tasks !== []) {
    for(var i = 0; i < tasks.length; i++) {
      if(tasks[i].task === task) {
        tasks.splice(i, 1);
        tasks = JSON.stringify(tasks);
        localStorage.setItem('tasks', tasks);
        return;
      }
    }
  }
}

var updateLocalStorage = function(prevTask, newTask, complete) {
  console.log(prevTask, newTask, complete);
  var tasks = retrieveLocalStorage();
  if(tasks !== null && tasks !== []) {
    for(var i = 0; i < tasks.length; i++) {
      if(tasks[i].task === prevTask) {
        tasks[i].task = newTask;
        tasks[i].complete = complete;
        tasks = JSON.stringify(tasks);
        localStorage.setItem('tasks', tasks);
        return;
      }
    }
  }
}

addButton.addEventListener("click", addTask);
appendToTaskLists();

// for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
//   bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
// }

// for (var i = 0; i < completedTasksHolder.children.length; i++) {
//   bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
// }