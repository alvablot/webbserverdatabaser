let lista = [];
let whatTask = "";
function renderList() {
  app.innerHTML = "";
  lista.forEach((element, i) => {
    const container = document.createElement("div");
    const task = document.createElement("input");
    const fullfilled = document.createElement("button");
    const dButton = document.createElement("button");
    const uButton = document.createElement("button");
    const idButton = document.createElement("button");

    app.appendChild(container);
    let done;
    if (element.fullfilled === "true") {
      container.classList.add("done");
      fullfilled.textContent = "Undo";
      done = "false";
    } else {
      container.classList.add("undone");
      fullfilled.textContent = "Mark as done";
      done = "true";
    }
    task.value = element.task;
    let idText = element.id.toString().substring(0, 12);

    if (whatTask === "") idButton.textContent = ` Show ${idText}...`;
    else idButton.textContent = ` ${element.id}`;
    dButton.textContent = "Delete";
    dButton.setAttribute("id", `d_${element.id}`);
    uButton.textContent = "Update";
    dButton.setAttribute("id", `u_${element.id}`);

    container.appendChild(task);
    container.appendChild(uButton);
    container.appendChild(dButton);
    container.appendChild(idButton);
    container.appendChild(fullfilled);

    dButton.addEventListener("click", () => {
      fetchDelete(parseInt(element.id));
    });
    uButton.addEventListener("click", () => {
      fetchPatch(parseInt(element.id), task.value, element.fullfilled);
    });
    fullfilled.addEventListener("click", () => {
      fetchPatch(parseInt(element.id), task.value, done);
    });
    idButton.addEventListener("click", () => {
      getTask(parseInt(element.id));
      whatTask = element.id;
    });
  });
}
const getTask = async (id) => {
  const res = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "GET",
  });
  lista = await res.json();
  renderList();
};
const fetchPost = async (task) => {
  const res = await fetch(`http://localhost:4000/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: `${task}`, fullfilled: "false" }),
  });
  getTask(whatTask);
  renderList();
};

const fetchDelete = async (id) => {
  const res = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE",
  });
  whatTask = "";
  getTask(whatTask);
  renderList();
};

const fetchPatch = async (id, value, done) => {
  const res = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: `${value}`, fullfilled: `${done}` }),
  });

  getTask(whatTask);
  renderList();
};

const knapp = [
  document.getElementById("knapp2"),
  document.getElementById("knapp4"),
];
const app = document.getElementById("app");
const idText = document.getElementById("idText");
const newTask = document.getElementById("newTask");

knapp[0].addEventListener("click", () => {
  whatTask = "";
  getTask(whatTask);
});

knapp[1].addEventListener("click", () => {
  fetchPost(newTask.value);
  newTask.value = "";
});
getTask(whatTask);
