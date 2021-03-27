import { getJSON } from "./first"
import { closeModal, openModal } from "./functions"

const requestURL = "https://articles-c78c.restdb.io/rest/articles"

const createNewArticleBtn = document.querySelector(".create-new-article")
const modalForCreateNewArticle = document.querySelector<HTMLDivElement>(".modal-for-create-new-article")
const inputForNewTitle = document.querySelector<HTMLInputElement>(".create-title")
const textareaForNewDescripcion = document.querySelector<HTMLTextAreaElement>("#create")
const saveNewArticleBtn = document.querySelector("#save-new-article")

function saveNewCreatedArticleIntoDatabase() {
  const newTitle = inputForNewTitle.value
  const newDescription = textareaForNewDescripcion.innerHTML

  if (newTitle.length > 0 && newDescription.length > 0) {
    saveNewArticleBtn.classList.add("is-loading")

    fetch(requestURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "6015b2ba6adfba69db8b6ba3",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        createdAt: Date.now(),
      }),
    }).then((response) => {
      response.json().then((data) => {
        document.querySelector<HTMLDivElement>(".is-loading").style.display = "none"

        inputForNewTitle.value = ""
        textareaForNewDescripcion.value = ""
        closeModal(modalForCreateNewArticle)

        getJSON()
      })
    })
  }
}

createNewArticleBtn && createNewArticleBtn.addEventListener("click", () => openModal(modalForCreateNewArticle))
saveNewArticleBtn && saveNewArticleBtn.addEventListener("click", saveNewCreatedArticleIntoDatabase)
