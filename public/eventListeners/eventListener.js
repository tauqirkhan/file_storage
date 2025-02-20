const loginDialog = document.querySelector("#loginDialog");
const signInDialog = document.querySelector("#signInDialog");
const loginBtnNodeList = document.querySelectorAll(".loginBtn");
const signInBtnNodeList = document.querySelectorAll(".signInBtn");
const openFolderNameInputBtn = document.querySelector(
  "#openFolderNameInputBtn"
);
const folderNameInput = document.querySelector(".hidden-input");
const folderNameForm = document.querySelector(".folderNameForm");

addEventListenerToNodeList(loginBtnNodeList, loginDialog);
addEventListenerToNodeList(signInBtnNodeList, signInDialog);

openFolderNameInputBtn.addEventListener("click", () => {
  folderNameInput.classList.add("show");
  folderNameInput.focus();
});

folderNameInput.addEventListener("blur", () => {
  submitForm(folderNameInput, folderNameForm);
});

folderNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent default form submission (to ensure blur triggers submission)
    submitForm(folderNameInput, folderNameForm);
  }
});

function submitForm(folderNameInput, folderNameForm) {
  if (folderNameInput.value.trim() !== "") {
    folderNameForm.submit();
  } else {
    folderNameInput.classList.remove("show");
  }
}

function addEventListenerToNodeList(nodeList, dialog) {
  if (dialog && nodeList.length > 0) {
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].addEventListener("click", () => openModal(dialog));
      dialog.addEventListener("click", (e) => closeModal(e, dialog));
    }
  }
}

function openModal(dialog) {
  dialog.showModal();
}

function closeModal(e, dialog) {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
}
