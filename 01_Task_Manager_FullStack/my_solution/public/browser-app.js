const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const response = await axios.get("/api/v1/tasks");
    const {data: { tasks } } = response;

    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }

    const allTasks = tasks.map((task) => {
        return `
          <div class="single-task ${task.completed && "task-completed"}">
              <h5><span><i class="far fa-check-circle"></i></span>${task.name}</h5>
              <div class="task-links">

                  <!-- edit link -->
                  <a href="task.html?id=${task._id}" class="edit-link">
                      <i class="fas fa-edit"></i>
                  </a>

                  <!-- delete btn -->
                  <button type="button" class="delete-btn" data-id="${task._id}">
                      <i class="fas fa-trash"></i>
                  </button>
              </div>
          </div>`;
      })
      .join("");

    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML = `<h5 class="empty-list">${error.message}</h5>`;
  }
  loadingDOM.style.visibility = "hidden";
};

showTasks();

// delete task /api/tasks/:id

tasksDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// form

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks", { name });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.visibility = "visible";
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  
  setTimeout(() => {
    formAlertDOM.style.visibility = "hidden";
    formAlertDOM.classList.remove("text-success");
  }, 2000);
});
