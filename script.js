// =========================================================
// TaskFlow - Beginner-Friendly To-Do List Application
// =========================================================

// --- DOM Element References ---
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const totalCountElement = document.getElementById("total-count");
const completedCountElement = document.getElementById("completed-count");
const filterButtons = document.querySelectorAll(".filter-btn");
const emptyState = document.getElementById("empty-state");

// --- Application State ---
// Key used for saving data in browser localStorage
const STORAGE_KEY = "taskflow_tasks";

// Load tasks from localStorage or initialize with an empty array
let tasks = loadTasksFromStorage();

// Current active filter: 'all', 'active', or 'completed'
let currentFilter = "all";

// =========================================================
// Local Storage Functions
// =========================================================

/**
 * Loads tasks from the browser's localStorage.
 * If no tasks are found or parsing fails, returns an empty array.
 */
function loadTasksFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
}

/**
 * Saves the current tasks array to localStorage as a JSON string.
 */
function saveTasksToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
}

// =========================================================
// Task Operations
// =========================================================

/**
 * Adds a new task object to the state and re-renders the UI.
 * Prevents adding empty or whitespace-only tasks.
 */
function addTask(text) {
  const trimmedText = text.trim();

  // Validate: do not allow empty tasks
  if (trimmedText === "") {
    return;
  }

  // Create a new task object with a unique timestamp ID
  const newTask = {
    id: Date.now().toString(),
    text: trimmedText,
    completed: false
  };

  // Add the new task to the top of the list
  tasks.unshift(newTask);

  // Persist changes and update the view
  saveTasksToStorage();
  renderTasks();
}

/**
 * Toggles the completed status of a task by its ID.
 */
function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasksToStorage();
  renderTasks();
}

/**
 * Deletes a task from the list by its ID.
 */
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);

  saveTasksToStorage();
  renderTasks();
}

// =========================================================
// UI Rendering Functions
// =========================================================

/**
 * Updates the total and completed task counter badges.
 */
function updateCounters() {
  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;

  totalCountElement.textContent = totalCount;
  completedCountElement.textContent = completedCount;
}

/**
 * Filters and renders tasks into the DOM according to the active filter.
 */
function renderTasks() {
  // 1. Filter tasks according to currentFilter
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true; // 'all'
  });

  // 2. Clear current list DOM
  taskList.innerHTML = "";

  // 3. Handle empty state display
  if (filteredTasks.length === 0) {
    emptyState.classList.add("visible");

    // Customize empty state message based on filter
    const emptyTitle = emptyState.querySelector("h3");
    const emptyDesc = emptyState.querySelector("p");

    if (tasks.length === 0) {
      emptyTitle.textContent = "No tasks yet";
      emptyDesc.textContent = "Add your first task above to kickstart your productivity!";
    } else if (currentFilter === "active") {
      emptyTitle.textContent = "All caught up!";
      emptyDesc.textContent = "You have no active tasks left to do.";
    } else if (currentFilter === "completed") {
      emptyTitle.textContent = "No completed tasks";
      emptyDesc.textContent = "Finish some tasks to see them marked here.";
    }
  } else {
    emptyState.classList.remove("visible");

    // 4. Build and append task list items
    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;
      li.dataset.id = task.id;

      // Left container: Checkbox and Label
      const leftContainer = document.createElement("label");
      leftContainer.className = "task-left";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Mark "${task.text}" as ${task.completed ? "incomplete" : "complete"}`);

      checkbox.addEventListener("change", () => {
        toggleTaskCompletion(task.id);
      });

      const textSpan = document.createElement("span");
      textSpan.className = "task-text";
      textSpan.textContent = task.text;

      leftContainer.appendChild(checkbox);
      leftContainer.appendChild(textSpan);

      // Right container: Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "delete-btn";
      deleteButton.innerHTML = "&times;";
      deleteButton.setAttribute("aria-label", `Delete task "${task.text}"`);
      deleteButton.title = "Delete task";

      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent label click
        deleteTask(task.id);
      });

      // Assemble list item
      li.appendChild(leftContainer);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }

  // 5. Update numerical counters
  updateCounters();
}

// =========================================================
// Event Listeners & Initialization
// =========================================================

// Form submission (handles both clicking 'Add Task' and pressing Enter)
todoForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop page reload
  addTask(taskInput.value);
  taskInput.value = ""; // Clear input field
  taskInput.focus(); // Re-focus for quick entry
});

// Filter button clicks
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active visual state
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Update filter and re-render
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Initial render when the page loads
renderTasks();
