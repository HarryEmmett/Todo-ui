
const currentTodos = [
    {
        title: "test 1",
        description: "A desription for my default Todo",
        weekly: true,
        favourite: false
    },
    {
        title: "test 2",
        description: "A desription for my default Todo",
        weekly: false,
        favourite: true
    },
    {
        title: "test 3",
        description: "A desription for my default Todo",
        weekly: false,
        favourite: false
    }
];

let currentPage = "home";

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

const returnPageTodos = (todos) => {
    let todosToUse;

    if (currentPage === "weekly") {
        todosToUse = todos.filter((todo) => todo.weekly);
    } else if (currentPage === "favourites") {
        todosToUse = todos.filter((todo) => todo.favourite);
    } else {
        todosToUse = todos;
    }

    return todosToUse;
}

const updateTodoList = (todos, home = false) => {
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
    <h3>${home ? "Home" : currentPage.toUpperCase()}</h3>
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

const getFormData = () => {
    const title = document.getElementById("modal-title").value;
    const alreadyCreated = currentTodos.map((todo) => todo.title).includes(title);

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

const setMinDate = () => {
    const date = new Date();
    document.getElementById("date-input").min = date.toISOString().split("T")[0];
}

const initialisePage = () => {
    document.addEventListener("DOMContentLoaded", () => {
        setMinDate();
        updateTodoList(currentTodos, true);
        document.getElementById("todo-count").innerHTML = `Todo count: ${currentTodos.length}`
    })
}

const handlePageButton = (button) => {
    const page = button.id.split("-button")[0];
    currentPage = page;
    updateTodoList(returnPageTodos(currentTodos));
}

const handleFormSubmit = () => {
    const data = getFormData(currentTodos);
    if (data) {

        const date = new Date();

        const diffenceInTime = data.date.getTime() - date.getTime();
        const differenceDays = diffenceInTime / (1000 * 3600 * 24);

        currentTodos.push({ ...data, weekly: differenceDays < 7 ? true : false, favourite: false });
        updateTodoList(currentTodos);

        toggleModal(true);
        document.getElementById("todo-count").innerHTML = `Todo count: ${currentTodos.length}`
    }
}

const filterTodos = (filterValue) => {
    const filteredTodos = currentTodos.filter((todo) => todo.title.includes(filterValue));
    return updateTodoList(returnPageTodos(filteredTodos));
}

const addToFavourites = (todoId) => {
    const index = currentTodos.findIndex((todo) => todo.title === todoId);
    if (currentTodos[index]?.favourite) {
        alert("This todo has already been favourited")
    } else {
        currentTodos[index].favourite = true;
        alert(`${currentTodos[index].title} added to favourites`)
    }
}

const deleteTodo = (todoId) => {
    console.log("called")
    const index = currentTodos.findIndex((todo) => todo.title === todoId);
    currentTodos.splice(index, 1);
    updateTodoList(returnPageTodos(currentTodos));
    document.getElementById("todo-count").innerHTML = `Todo count: ${currentTodos.length}`
}

export { toggleModal, updateTodoList, initialisePage, handlePageButton, handleFormSubmit, filterTodos, addToFavourites, deleteTodo };