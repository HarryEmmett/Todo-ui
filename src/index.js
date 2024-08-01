import { toggleModal, initialisePage, handlePageButton, handleFormSubmit, filterTodos } from "./todoFunctions";

const closeModalButton = document.getElementById("close-button");
const createButton = document.getElementById("create-button");
const createTodoForm = document.getElementById("create-todo-form");
const searchBar = document.getElementById("search-bar");
const pagebuttons = document.querySelectorAll(".page-buttons");

initialisePage();

pagebuttons.forEach((button) => {
    button.addEventListener("click", () => {
        searchBar.value = "";
        handlePageButton(button);
    })
})

createButton.addEventListener("click", () => {
    toggleModal();
});

closeModalButton.addEventListener("click", () => {
    toggleModal(true);
});

createTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit("home");
});

searchBar.addEventListener("input", (e) => {
    const { value } = e.target;
    filterTodos(value);
})

