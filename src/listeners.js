import { setMinDate, addToFavourites, deleteTodo, toggleModal, handlePageButton, filterTodos, handleFormSubmit, currentTodos, createTodoCard } from "./todoFunctions";

const initialisePage = () => {
    document.addEventListener("DOMContentLoaded", () => {
        setMinDate();
        updateTodoList(currentTodos, "home");
        document.getElementById("todo-count").innerHTML = `Todo count: ${currentTodos.length}`

        const closeModalButton = document.getElementById("close-button");
        const createButton = document.getElementById("create-button");
        const createTodoForm = document.getElementById("create-todo-form");
        const searchBar = document.getElementById("search-bar");
        const pagebuttons = document.querySelectorAll(".page-buttons");

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
    })
}

const updateTodoList = (todos, page) => {
    const todosContainer = document.getElementById("displayed-todos-container");
    todosContainer.innerHTML = "";

    const todosContainerHeader = document.createElement("h3");
    todosContainerHeader.innerText = page.toUpperCase();

    todosContainer.appendChild(todosContainerHeader);

    const todoCardDiv = document.createElement("div");
    todoCardDiv.className = "todo-card-container";
    
    todos.forEach((todo, i) => {
        todoCardDiv.appendChild(createTodoCard(todo.description, todo.title, i));
    })

    todosContainer.appendChild(todoCardDiv);

    const favouriteButton = document.querySelectorAll(".favourite-button");
    const removeTodoButton = document.querySelectorAll(".close-button-todo");

    favouriteButton.forEach((button) => {
        button.addEventListener("click", (e) => {
            addToFavourites(e.target.id);
        })
    })

    removeTodoButton.forEach((button) => {
        button.addEventListener("click", (e) => {
            deleteTodo(e.target.id);
        })
    })
}

export { initialisePage, updateTodoList };