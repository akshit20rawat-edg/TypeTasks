// app.ts
import { type Task, type TaskStatus, addTask, filterByStatus } from "./model.js";

let tasks: Task[] = [];
let filter: "all" | TaskStatus = "all";

// Grab elements — cast so tsc knows exactly what they are.
const titleInput = document.getElementById("title") as HTMLInputElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const listEl = document.getElementById("list") as HTMLUListElement;

addBtn.onclick = () => {
  const title = titleInput.value.trim();   // .value is known & typed
  if (!title) return;
  tasks = addTask(tasks, title);           // returns a fresh Task[]
  titleInput.value = "";                   // clear the input
  render();
};

// Filter buttons — update the current filter and re-render.
const filterButtons = document.querySelectorAll<HTMLButtonElement>("[data-filter]");
filterButtons.forEach((btn) => {
  btn.onclick = () => {
    filter = btn.dataset.filter as "all" | TaskStatus;
    render();
  };
});

// Render the visible tasks (respecting the filter) into the <ul id="list">.
function render(): void {
  listEl.innerHTML = "";
  const visible = filter === "all" ? tasks : filterByStatus(tasks, filter);
  for (const task of visible) {
    const li = document.createElement("li");
    li.className = "task";
    li.textContent = task.title;
    listEl.appendChild(li);
  }

  // Highlight the active filter chip.
  document.querySelectorAll<HTMLElement>(".chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.filter === filter);
  });
}