let input = document.getElementById('input-box');
let listco = document.getElementById('list-container');
let totalTasks = localStorage.getItem('totalTasks') ? parseInt(localStorage.getItem('totalTasks')) : 0;
let completedTasks = 0;

function addTask() {
    if (input.value === '') {
        alert('Write something, you freaking idiot!!');
    } else {
        let newX = document.createElement('li');
        newX.innerHTML = input.value;
        listco.appendChild(newX);
        let span = document.createElement("span");
        span.innerHTML = "\u00D7";
        newX.appendChild(span);
        addTask1(); // Call addTask1 here
    }
    input.value = '';
    store();
}

function addTask1() {
    totalTasks++;
    document.getElementById("total-tasks").textContent = totalTasks;
    localStorage.setItem('totalTasks', totalTasks);
}

function taskCompleted() {
    completedTasks++;
    document.getElementById("completed-tasks").textContent = completedTasks;
    localStorage.setItem('completedTasks', completedTasks);
}

function taskUncompleted() {
    completedTasks--;
    document.getElementById("completed-tasks").textContent = completedTasks;
    localStorage.setItem('completedTasks', completedTasks);
}

listco.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        store();
        showAlert(e.target.classList.contains("checked"));
        addAnimation(e.target);
        if (e.target.classList.contains("checked")) {
            taskCompleted(); // Call taskCompleted here
        } else {
            taskUncompleted(); // Call taskUncompleted here
        }
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        store();
        showAlert(false);
        totalTasks--; // Decrement total tasks when a task is deleted
        document.getElementById("total-tasks").textContent = totalTasks;
        localStorage.setItem('totalTasks', totalTasks);
    }
}, false);

function showAlert(isChecked) {
    if (listco.children.length === 0) {
        alert("that's it for today !! have some fun");
    } else if (isChecked) {
        alert("Good job ! ... keep going ");
    } else {
        alert("Great job ! ... keep going ! ");
    }
}

function addAnimation(element) {
    element.classList.add("happy-animation");
    setTimeout(() => {
        element.classList.remove("happy-animation");
    }, 1000);
}

function store() {
    localStorage.setItem('tasks', listco.innerHTML);
}

function display() {
    if (localStorage.getItem('tasks')) {
        listco.innerHTML = localStorage.getItem('tasks');
    }
    document.getElementById("total-tasks").textContent = totalTasks;
    document.getElementById("completed-tasks").textContent = completedTasks;
}

display();