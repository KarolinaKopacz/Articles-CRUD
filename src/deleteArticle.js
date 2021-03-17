import { getJSON } from "./first"
import { closeModal, openModal } from "./functions"

const modalForConfirmDeleteArticle = document.querySelector(".modal-for-confirm-delete-article")

export function addListenerOnDeleteBtn() {
  if (!modalForConfirmDeleteArticle) {
    return
  }

  const deleteArticleBtn = document.querySelectorAll(".delete-article")

  deleteArticleBtn.forEach(function (btn) {
    const dataId = btn.getAttribute("data-id")

    btn.addEventListener("click", () => {
      openModal(modalForConfirmDeleteArticle)

      const confirmDeleteBtn = document.querySelector("#delete-confirm")

      confirmDeleteBtn.addEventListener("click", () => {
        confirmDeleteBtn.classList.add("is-loading")
        deleteArticle(dataId).then(() => {
          confirmDeleteBtn.classList.remove("is-loading")
        })
      })
    })
  })
}

function deleteArticle(dataId) {
  const requestURL = `https://articles-c78c.restdb.io/rest/articles/${dataId}`

  return fetch(requestURL, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "6015b2ba6adfba69db8b6ba3",
    },
  }).then(function () {
    closeModal(modalForConfirmDeleteArticle)
    getJSON()
    return true
  })
}
