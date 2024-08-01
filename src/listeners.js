import { setMinDate, addToFavourites, deleteTodo, toggleModal, handlePageButton, filterTodos, handleFormSubmit, currentTodos } from "./todoFunctions";

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
    let todoCard = "";
    todos.forEach((todo, i) => {
        todoCard += `
        <div class="todo-card">
            <div class="todo-card-top-bar">
                <p style="margin: 0;">${todo.title}</p>
                <div>
                    <button id="favourite-button-todo-${i}" class="default-button favourite-button" type="button">
                        <span id="${todo.title}" class="material-icons">star</span>
                    </button>
                    <button id="close-button-todo-${i}" class="default-button close-button close-button-todo" type="button">
                        <span id="${todo.title}" class="material-icons">close</span>
                    </button>
                </div>
            </div>
            <p>${todo.description}</p>
        </div>
        `;
    })

    todosContainer.innerHTML = `
    <h3>${page.toUpperCase()}</h3>
    <div class="todo-card-container">
        ${todoCard}
    </div>
    `

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