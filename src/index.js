import { toggleModal } from "./domManipulation";

document.getElementById("displayed-todos-container").innerHTML = "A todo";

const createButton = document.getElementById("create-button");

createButton.addEventListener("click", (e) => {
    toggleModal();
})



