const toDoInput = document.querySelector(".todo-input");
const toDoBtn = document.querySelector(".todo-btn");
const toDoList = document.querySelector(".todo-list");
const lightTheme = document.querySelector(".light-theme");
const darkerTheme = document.querySelector(".darker-theme");

toDoBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
lightTheme.addEventListener("click", () => changeTheme("light"));
darkerTheme.addEventListener("click", () => changeTheme("darker"));

let savedTheme = localStorage.getItem("savedTheme");
savedTheme === null
  ? changeTheme("standard")
  : changeTheme(localStorage.getItem("savedTheme"));

function addToDo(event) {
  event.preventDefault();

  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo", `${savedTheme}-todo`);

  const newToDo = document.createElement("li");
  if (toDoInput.value === "") {
    alert("Campo vazio");
  } else {
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    savelocal(toDoInput.value);

    const checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn", `${savedTheme}-button`);
    toDoDiv.appendChild(checked);
    const deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", `${savedTheme}-button`);
    toDoDiv.appendChild(deleted);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add("edit-btn", `${savedTheme}-button`);
    toDoDiv.appendChild(editBtn);

    toDoList.appendChild(toDoDiv);

    toDoInput.value = "";
  }
}

function deletecheck(event) {
  const item = event.target;

  if (item.classList[0] === "delete-btn") {
    item.parentElement.classList.add("fall");
    removeLocalTodos(item.parentElement);

    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();
    });
  }

  if (item.classList[0] === "check-btn") {
    item.parentElement.classList.toggle("completed");
  }

  if (item.classList[0] === "edit-btn") {
    editToDo(event);
  }
}

function savelocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach(function (todo) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo", `${savedTheme}-todo`);

    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    const checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn", `${savedTheme}-button`);
    toDoDiv.appendChild(checked);

    const deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn", `${savedTheme}-button`);
    toDoDiv.appendChild(deleted);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add("edit-btn", `${savedTheme}-button`);
    toDoDiv.appendChild(editBtn);

    toDoList.appendChild(toDoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todos.indexOf(todo.children[0].innerText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function editToDo(event) {
  const item = event.target;

  if (item.classList[0] === "edit-btn") {
    const todoDiv = item.parentElement;
    const todoText = todoDiv.querySelector(".todo-item");
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = todoText.innerText;
    inputField.classList.add("todo-input");

    todoDiv.insertBefore(inputField, todoText);
    todoDiv.removeChild(todoText);

    item.innerHTML = '<i class="fas fa-save"></i>';
    item.classList.remove("edit-btn");
    item.classList.add("save-btn");

    item.addEventListener("click", () => saveEdit(todoDiv, inputField, item));
  }
}

function saveEdit(todoDiv, inputField, item) {
  const newTodoText = inputField.value;

  const newToDo = document.createElement("li");
  newToDo.innerText = newTodoText;
  newToDo.classList.add("todo-item");

  todoDiv.replaceChild(newToDo, inputField);

  item.innerHTML = '<i class="fas fa-edit"></i>';
  item.classList.remove("save-btn");
  item.classList.add("edit-btn");

  updateLocalTodos(todoDiv, newTodoText);
}

function updateLocalTodos(todoDiv, newTodoText) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const oldTodoText = todoDiv.querySelector(".todo-item").innerText;
  const todoIndex = todos.indexOf(oldTodoText);

  if (todoIndex > -1) {
    todos[todoIndex] = newTodoText;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function changeTheme(color) {
  localStorage.setItem("savedTheme", color);
  savedTheme = localStorage.getItem("savedTheme");

  document.body.className = color;
  color === "darker"
    ? document.getElementById("title").classList.add("darker-title")
    : document.getElementById("title").classList.remove("darker-title");

  document.querySelector("input").className = `${color}-input`;
  document.querySelectorAll(".todo").forEach((todo) => {
    Array.from(todo.classList).some((item) => item === "completed")
      ? (todo.className = `todo ${color}-todo completed`)
      : (todo.className = `todo ${color}-todo`);
  });
  document.querySelectorAll("button").forEach((button) => {
    Array.from(button.classList).some((item) => {
      if (item === "check-btn") {
        button.className = `check-btn ${color}-button`;
      } else if (item === "delete-btn") {
        button.className = `delete-btn ${color}-button`;
      } else if (item === "todo-btn") {
        button.className = `todo-btn ${color}-button`;
      } else if (item === "edit-btn") {
        button.className = `edit-btn ${color}-button`;
      } else if (item === "save-btn") {
        button.className = `save-btn ${color}-button`;
      }
    });
  });
}
