import { getJSON } from "./first"
import { closeModal, openModal } from "./functions"
import suneditor from "suneditor"
import plugins from "suneditor/src/plugins"

const requestURL = "https://articles-c78c.restdb.io/rest/articles"

const createNewArticleBtn = document.querySelector(".create-new-article")
const modalForCreateNewArticle = document.querySelector(".modal-for-create-new-article")
const inputForNewTitle = document.querySelector(".create-title")
const textareaForNewDescripcion = document.querySelector(".create-description")
const saveNewArticleBtn = document.querySelector("#save-new-article")

createNewArticleBtn.addEventListener("click", () => openModal(modalForCreateNewArticle))
const createEditor = suneditor.create("create", {
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
function saveNewCreatedArticleIntoDatabase() {
  const newTitle = inputForNewTitle.value
  const newDescription = createEditor.getContents()
  console.log("descri", newDescription)

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
        document.querySelector(".is-loading").style.display = "none"

        inputForNewTitle.value = ""
        textareaForNewDescripcion.value = ""
        closeModal(modalForCreateNewArticle)

        getJSON()
      })
    })
  }
}
saveNewArticleBtn.addEventListener("click", saveNewCreatedArticleIntoDatabase)
