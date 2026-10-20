const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector(".task-list");
const taskCount = document.querySelector(".task-count");
const emptyMessage = document.querySelector(".empty-message");

let tasks = JSON.parse(localStorage.getItem("my-tasks")) || [];

function saveTasks() {
  localStorage.setItem("my-tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = task.completed ? "task-item completed" : "task-item";

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark "${task.text}" as complete`);

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    label.append(checkbox, text);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete "${task.text}"`);

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((savedTask) => savedTask.id !== task.id);
      saveTasks();
      renderTasks();
    });

    item.append(label, deleteButton);
    taskList.append(item);
  });

  const remaining = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = `${remaining} task${remaining === 1 ? "" : "s"} remaining`;
  emptyMessage.hidden = tasks.length > 0;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
});

renderTasks();