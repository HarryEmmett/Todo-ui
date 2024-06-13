import { toggleModal, updateTodoList, getFormData, changePage, initialisePage } from "./domManipulation";

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
        const page = button.id.split("-button")[0];
        changePage(page, currentTodos);
        currentPage = page;
    });
})

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
        currentTodos.home.push(data);

        const date = new Date();
       
        const diffenceInTime = data.date.getTime() - date.getTime();
        const differenceDays = diffenceInTime / ( 1000 * 3600 * 24);
       
        if (differenceDays < 7) {
            currentTodos.weekly.push(data);
        }
        updateTodoList(currentTodos[currentPage], currentPage);
        toggleModal(true);
    }
});



