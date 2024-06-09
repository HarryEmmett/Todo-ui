const toggleModal = (forceClose) => {
    const modal = document.getElementById("modal");
    const currentStyle = modal.style.display;

    if (forceClose) {
        modal.style.display = "none";
    } else {
        currentStyle === "none" || !currentStyle ? modal.style.display = "flex" : modal.style.display = "none";
    }

}

const updateTodoList = (todos) => {
    document.getElementById("displayed-todos-container").innerHTML = todos.map((e) => e.title).join(",");
}

const getFormData = (currentTodos) => {
    const title = document.getElementById("modal-title").value;
    const alreadyCreated = currentTodos.map((todo) => todo.title).includes(title);

    if (alreadyCreated) {
        alert("already created");
    } else {
        const formData = {
            title: document.getElementById("modal-title").value,
            description: document.getElementById("modal-textarea").value
        }

        document.getElementById("create-todo-form").reset();

        return formData;
    }
}

export { toggleModal, updateTodoList, getFormData };