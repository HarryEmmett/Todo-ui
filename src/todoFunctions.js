import { updateTodoList } from "./listeners";

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



const handlePageButton = (button) => {
    const page = button.id.split("-button")[0];
    currentPage = page;
    updateTodoList(returnPageTodos(currentTodos), currentPage);
}

const handleFormSubmit = () => {
    const data = getFormData(currentTodos);
    if (data) {

        const date = new Date();

        const diffenceInTime = data.date.getTime() - date.getTime();
        const differenceDays = diffenceInTime / (1000 * 3600 * 24);

        currentTodos.push({ ...data, weekly: differenceDays < 7 ? true : false, favourite: false });
        updateTodoList(currentTodos, currentPage);

        toggleModal(true);
        document.getElementById("todo-count").innerText = `Todo count: ${currentTodos.length}`
    }
}

const filterTodos = (filterValue) => {
    const filteredTodos = currentTodos.filter((todo) => todo.title.includes(filterValue));
    return updateTodoList(returnPageTodos(filteredTodos), currentPage);
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
    const index = currentTodos.findIndex((todo) => todo.title === todoId);
    currentTodos.splice(index, 1);
    updateTodoList(returnPageTodos(currentTodos), currentPage);
    document.getElementById("todo-count").innerText = `Todo count: ${currentTodos.length}`
}

const createTodoCard = (description, title, i) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "todo-card";

    const cardTopBar = document.createElement("div");
    cardTopBar.className = "todo-card-top-bar";
    
    const cardTopBarTitle = document.createElement("p");
    cardTopBarTitle.style = "margin: 0;";
    cardTopBarTitle.innerText = title;
    cardTopBar.appendChild(cardTopBarTitle);

    const topBarButtonDiv = document.createElement("div");

    const favouriteButton = document.createElement("button");
    favouriteButton.id = `favourite-button-todo-${i}`;
    favouriteButton.className = "default-button favourite-button";
    favouriteButton.type = "button";

    const buttonSpanFavourite = document.createElement("span");
    buttonSpanFavourite.id = title;
    buttonSpanFavourite.className = "material-icons";
    buttonSpanFavourite.innerText = "star";

    favouriteButton.appendChild(buttonSpanFavourite);
    topBarButtonDiv.appendChild(favouriteButton);

    const deleteButton = document.createElement("button");
    deleteButton.id = `favourite-button-todo-${i}`;
    deleteButton.className = "default-button close-button close-button-todo";
    deleteButton.type = "button";

    const buttonSpanDelete = document.createElement("span");
    buttonSpanDelete.id = title;
    buttonSpanDelete.className = "material-icons";
    buttonSpanDelete.innerText = "close";

    deleteButton.appendChild(buttonSpanDelete);
    topBarButtonDiv.appendChild(deleteButton);

    cardTopBar.appendChild(topBarButtonDiv);

    const todoDescription = document.createElement("p");
    todoDescription.innerText = description;
    
    cardDiv.appendChild(cardTopBar);
    cardDiv.appendChild(todoDescription);

    return cardDiv;
}

export { setMinDate, addToFavourites, deleteTodo, toggleModal, handlePageButton, filterTodos, handleFormSubmit, createTodoCard, currentTodos }