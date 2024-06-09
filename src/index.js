import { toggleModal, updateTodoList, getFormData } from "./domManipulation";

const currentTodos = [];

const createButton = document.getElementById("create-button");
const closeModalButton = document.getElementById("close-modal-button");
const createTodoForm = document.getElementById("create-todo-form");

createButton.addEventListener("click", (e) => {
    toggleModal();
});

closeModalButton.addEventListener("click", (e) => {
    toggleModal(true);
});

createTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = getFormData(currentTodos);
    if (data) {
        currentTodos.push(data);
        updateTodoList(currentTodos);
        toggleModal(true);
    }
});



