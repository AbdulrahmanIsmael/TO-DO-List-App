const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filterInput = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear");
const taskList = document.querySelector(".tasks-list");

taskForm.addEventListener("submit", addNewTask);
document.addEventListener("DOMContentLoaded", loadItems);
taskList.addEventListener("click", deleteTask);
clearBtn.addEventListener("click", clearAllTasks);
filterInput.addEventListener("keyup", filterTasks);

function loadItems() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    var liTask = document.createElement("li");
    liTask.className = "task-item";
    liTask.appendChild(document.createTextNode(task));
    var clearLink = document.createElement("a");
    clearLink.className = "clear-task";
    clearLink.setAttribute("href", "#");
    clearLink.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    liTask.appendChild(clearLink);
    taskList.appendChild(liTask);
  });
}

function addNewTask(e) {
  if (taskInput.value === "") {
    alert("فين التاسك يا عم ؟");
  } else {
    var liTask = document.createElement("li");
    liTask.className = "task-item";
    liTask.appendChild(document.createTextNode(taskInput.value));
    var clearLink = document.createElement("a");
    clearLink.className = "clear-task";
    clearLink.setAttribute("href", "#");
    clearLink.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    liTask.appendChild(clearLink);
    taskList.appendChild(liTask);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";
  }

  function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  e.preventDefault();
}

function deleteTask(e) {
  if (e.target.parentElement.classList.contains("clear-task")) {
    if (confirm("Are you sure ?")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(liTask) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    tasks.splice(index, 1);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAllTasks(e) {
  taskList.innerHTML = "";

  deleteAllTasksFromLocalStorage();
  e.preventDefault();
}

function deleteAllTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  var text = e.target.value.toLowerCase();

  document.querySelectorAll(".task-item").forEach(function (item) {
    if (item.firstChild.textContent.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
