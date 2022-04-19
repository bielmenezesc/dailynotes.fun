const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector("header p"),
    closeIcon = popupBox.querySelector("header i"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector(".btn-form");

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;
let currentColor = "#fff";
let btn1 = document.querySelector(`.btn1`),
    btn2 = document.querySelector(`.btn2`),
    btn3 = document.querySelector(`.btn3`),
    btn4 = document.querySelector(`.btn4`),
    btn5 = document.querySelector(`.btn5`);

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Nova Anotação";
    addBtn.innerText = "Nova Anotação";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if (window.innerWidth > 660) titleTag.focus();
    destacarBtnBorda(currentColor);
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
    if (!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note" id="note-${id}">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="updateNote(${id}, '${note.title}', '${filterDesc}', '${note.color}')" class="uil uil-pen"></i>
                                <i onclick="deleteNote(${id})" class="uil uil-trash"></i>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
        const currentNote = document.querySelector(`#note-${id}`);
        currentNote.style.setProperty("background", `${note.color}`);
        destacarBtnBorda("nenhum");

        // Segura e Arrasta

        function onDrag({ movementX, movementY }) {
            let getStyle = window.getComputedStyle(currentNote);
            let leftVal = parseInt(getStyle.left);
            let topVal = parseInt(getStyle.top);
            currentNote.style.setProperty("left", `${leftVal + movementX}px`);
            currentNote.style.setProperty("top", `${topVal + movementY}px`);
        }

        currentNote.addEventListener("mousedown", () => {
            currentNote.classList.add("active");
            currentNote.addEventListener("mousemove", onDrag);
        });

        document.addEventListener("mouseup", () => {
            currentNote.classList.remove("active");
            currentNote.removeEventListener("mousemove", onDrag);
        });
    });
    currentColor = "#fff";
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Tem certeza que quer deletar esta anotação?");
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, filterDesc, noteColor) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    currentColor = noteColor;
    popupTitle.innerText = "Atualizar Anotação";
    addBtn.innerText = "Atualizar Anotação";
    destacarBtnBorda(currentColor);
}

function destacarBtnBorda(btn) {
    if (btn == "nenhum") {
        btn1.style.setProperty("border", `3px solid #999`);
        btn2.style.setProperty("border", `3px solid #999`);
        btn3.style.setProperty("border", `3px solid #999`);
        btn4.style.setProperty("border", `3px solid #999`);
        btn5.style.setProperty("border", `3px solid #999`);
    } else if (btn == "#fff") {
        btn2.style.setProperty("border", `3px solid #999`);
        btn3.style.setProperty("border", `3px solid #999`);
        btn4.style.setProperty("border", `3px solid #999`);
        btn5.style.setProperty("border", `3px solid #999`);
        btn1.style.setProperty("border", `3px solid #696969`);
    } else if (btn == "#FFBDD6") {
        btn1.style.setProperty("border", `3px solid #999`);
        btn3.style.setProperty("border", `3px solid #999`);
        btn4.style.setProperty("border", `3px solid #999`);
        btn5.style.setProperty("border", `3px solid #999`);
        btn2.style.setProperty("border", `3px solid #696969`);
    } else if (btn == "#B0E0E6") {
        btn1.style.setProperty("border", `3px solid #999`);
        btn2.style.setProperty("border", `3px solid #999`);
        btn4.style.setProperty("border", `3px solid #999`);
        btn5.style.setProperty("border", `3px solid #999`);
        btn3.style.setProperty("border", `3px solid #696969`);
    } else if (btn == "#87CEFA") {
        btn2.style.setProperty("border", `3px solid #999`);
        btn3.style.setProperty("border", `3px solid #999`);
        btn1.style.setProperty("border", `3px solid #999`);
        btn5.style.setProperty("border", `3px solid #999`);
        btn4.style.setProperty("border", `3px solid #696969`);
    } else if (btn == "#FFEFD5") {
        btn2.style.setProperty("border", `3px solid #999`);
        btn3.style.setProperty("border", `3px solid #999`);
        btn4.style.setProperty("border", `3px solid #999`);
        btn1.style.setProperty("border", `3px solid #999`);
        btn5.style.setProperty("border", `3px solid #696969`);
    }

}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
        description = descTag.value.trim();

    if (title || description) {
        let currentDate = new Date(),
            month = months[currentDate.getMonth()],
            day = currentDate.getDate(),
            year = currentDate.getFullYear();

        let noteInfo = { title, description, date: `${month} ${day}, ${year}`, color: currentColor }
        if (!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});

// color card

const theme = document.querySelector(':root');
const btns = document.querySelectorAll('.btn');

btns.forEach(function (btn) {

    btn.addEventListener("click", function (e) {

        const color = e.currentTarget.classList;

        if (color.contains("btn1")) {
            currentColor = "#fff"; // branco
            destacarBtnBorda("#fff");
        }
        else if (color.contains("btn2")) {
            currentColor = "#FFBDD6"; // vermelho
            destacarBtnBorda("#FFBDD6");
        }
        else if (color.contains("btn3")) {
            currentColor = "#B0E0E6"; // verde
            destacarBtnBorda("#B0E0E6");
        }
        else if (color.contains("btn4")) {
            currentColor = "#87CEFA"; // azul
            destacarBtnBorda("#87CEFA");
        }
        else if (color.contains("btn5")) {
            currentColor = "#FFEFD5"; // amarelo
            destacarBtnBorda("#FFEFD5");
        }
    });
});

// To Do List

const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");

let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Editar</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Deletar</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>Você não tem nenhuma tarefa ainda</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});
