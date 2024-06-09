const toggleModal = () => {
    const modal = document.getElementById("modal");
    const currentStyle = modal.style.display;

    currentStyle === "none" ? modal.style.display = "block" : modal.style.display = "none";
}

export { toggleModal };