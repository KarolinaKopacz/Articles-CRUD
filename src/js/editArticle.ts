import { getJSON } from "./first"
import { articles } from "./first"
import { closeModal, openModal } from "./functions"

const modalFotEdittingArticle = document.querySelector<HTMLDivElement>(".modal-for-editing-article")
const titleEditInput = document.querySelector<HTMLElement>("#edit-title")
const descriptionEditContainer = document.querySelector<HTMLDivElement>("#edit-description")
const editArticleIdHiddenInput = document.querySelector<HTMLElement>("#article-id")
const saveEeditedArticleBtn = document.querySelector("#save-edited-article")

let editArticleId = ""

export function addListenerOnEditBtn() {
  const editArticleBtns = document.querySelectorAll(".edit-article")
  editArticleBtns.forEach(function (btn) {
    const dataId = btn.getAttribute("data-id")

    btn.addEventListener("click", () => {
      openModal(modalFotEdittingArticle)
      editArticleId = dataId

      articles.forEach((article) => {
        if (article._id === editArticleId) {
          titleEditInput.innerHTML = article.title
          descriptionEditContainer.innerHTML = article.description
          editArticleIdHiddenInput.innerHTML = editArticleId
        }
      })
    })
  })
}

function saveEditedArticleIntoDatabase() {
  const newEditedArticleId = editArticleIdHiddenInput.innerHTML
  const requestURL = `https://articles-c78c.restdb.io/rest/articles/${newEditedArticleId}`

  const newEditedTitle = titleEditInput.innerHTML
  const newEditedDescription = descriptionEditContainer.innerHTML

  if (newEditedTitle.length > 0 && newEditedDescription.length > 0) {
    saveEeditedArticleBtn.classList.add("is-loading")
    fetch(requestURL, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "6015b2ba6adfba69db8b6ba3",
      },
      body: JSON.stringify({
        title: newEditedTitle,
        description: newEditedDescription,
        updatedAt: Date.now(),
      }),
    }).then(() => {
      saveEeditedArticleBtn.classList.remove("is-loading")

      getJSON()

      titleEditInput.innerHTML = ""
      descriptionEditContainer.innerHTML = ""
      editArticleIdHiddenInput.innerHTML = ""
      closeModal(modalFotEdittingArticle)
    })
  }
}
saveEeditedArticleBtn && saveEeditedArticleBtn.addEventListener("click", saveEditedArticleIntoDatabase)
