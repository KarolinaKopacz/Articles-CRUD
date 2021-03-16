import { getJSON } from "./first"
import { articles } from "./first"
import { closeModal, openModal } from "./functions"
import suneditor from "suneditor"
import plugins from "suneditor/src/plugins"

const modalFotEdittingArticle = document.querySelector(".modal-for-editing-article")
const titleEditInput = document.querySelector("#edit-title")
const descriptionEditInput = document.querySelector("#edit-description")
const editArticleIdHiddenInput = document.querySelector("#article-id")
const saveEeditedArticleBtn = document.querySelector("#save-edited-article")

let editArticleId = ""
const editEditor = suneditor.create("edit-description", {
  plugins: plugins,
  buttonList: [
    ["font", "fontSize", "formatBlock"],
    ["paragraphStyle", "blockquote"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "lineHeight"],
    ["fullScreen", "showBlocks", "codeView"],
  ],
})

export function addListenerOnEditBtn() {
  const editArticleBtns = document.querySelectorAll(".edit-article")

  editArticleBtns.forEach(function (btn) {
    const dataId = btn.getAttribute("data-id")

    btn.addEventListener("click", () => {
      openModal(modalFotEdittingArticle)
      editArticleId = dataId

      articles.forEach((article) => {
        if (article._id === editArticleId) {
          titleEditInput.value = article.title
          editEditor.setContents(article.description)
          editArticleIdHiddenInput.value = editArticleId
        }
      })
    })
  })
}

function saveEditedArticleIntoDatabase() {
  const newEditedArticleId = editArticleIdHiddenInput.value
  const requestURL = `https://articles-c78c.restdb.io/rest/articles/${newEditedArticleId}`

  const newEditedTitle = titleEditInput.value
  const newEditedDescription = editEditor.getContents()

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

      titleEditInput.value = ""
      descriptionEditInput.value = ""
      editArticleIdHiddenInput.value = ""
      closeModal(modalFotEdittingArticle)
    })
  }
}
saveEeditedArticleBtn.addEventListener("click", saveEditedArticleIntoDatabase)
