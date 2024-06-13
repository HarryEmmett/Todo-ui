import { toggleModal, initialisePage, handlePageButton, handleFormSubmit } from "./domManipulation";

const currentTodos = {
    home: [
        {
            title: "Test Todo",
            description: "A Test Todo"
        }
    ],
    weekly: [],
    favourites: []
};

let currentPage = "home";

const closeModalButton = document.getElementById("close-button");
const createButton = document.getElementById("create-button");
const createTodoForm = document.getElementById("create-todo-form");
const pagebuttons = document.querySelectorAll(".page-buttons");

initialisePage(currentTodos.home);

pagebuttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const page = handlePageButton(button, currentTodos);
        currentPage = page;
    })
})

createButton.addEventListener("click", (e) => {
    toggleModal();
});

closeModalButton.addEventListener("click", (e) => {
    toggleModal(true);
});

createTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(currentTodos, "home");
});



