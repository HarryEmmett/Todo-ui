const handleModal = (open) => {
    const modal = document.getElementById("modal");
    const backdrop = document.getElementById("modal-backdrop");

    if (open) {
        modal.style.display = "flex";
        backdrop.style.display = "block";
    } else {
        modal.style.display = "none";
        backdrop.style.display = "none";
    }
}

const toggleModal = (forceClose) => {
    const currentStyle = modal.style.display;
    const openModal = currentStyle === "none" || !currentStyle || !forceClose;
    openModal ? handleModal(true) : handleModal();
}

const updateTodoList = (todos, page) => {
    let paragraphs = "";
    todos.forEach((todo) => {
        paragraphs += `<p>${todo.title}</p>`;
    })

    document.getElementById("displayed-todos-container").innerHTML = `
    <h3>${page.toUpperCase()}</h3>
    <div>${paragraphs}</div
    }
    `
}

const getFormData = (currentTodos) => {
    const title = document.getElementById("modal-title").value;
    const alreadyCreated = currentTodos.home.map((todo) => todo.title).includes(title);

    if (alreadyCreated) {
        alert("already created");
    } else {
        const formData = {
            title: document.getElementById("modal-title").value,
            description: document.getElementById("modal-textarea").value,
            date: new Date(document.getElementById("date-input").value)
        }

        document.getElementById("create-todo-form").reset();
        return formData;
    }
}

const changePage = (page, todos) => {
    updateTodoList(todos[page], page);
}

const setMinDate = () => {
    const date = new Date();
    document.getElementById("date-input").min = date.toISOString().split("T")[0];
}

const initialisePage = (todos) => {
    document.addEventListener("DOMContentLoaded", () => {
        setMinDate();
        updateTodoList(todos, "home")
    })
}

const handlePageButton = (button, currentTodos) => {
    const page = button.id.split("-button")[0];
    changePage(page, currentTodos);
    return page;
}

const handleFormSubmit = (currentTodos, currentPage) => {
    const data = getFormData(currentTodos);
    if (data) {
        currentTodos.home.push(data);

        const date = new Date();

        const diffenceInTime = data.date.getTime() - date.getTime();
        const differenceDays = diffenceInTime / (1000 * 3600 * 24);

        if (differenceDays < 7) {
            currentTodos.weekly.push(data);
        }

        updateTodoList(currentTodos[currentPage], currentPage);
        toggleModal(true);
    }
}

export { toggleModal, updateTodoList, changePage, initialisePage, handlePageButton, handleFormSubmit };