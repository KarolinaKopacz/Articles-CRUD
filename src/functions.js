import suneditor from "suneditor"
import plugins from "suneditor/src/plugins"

export function openModal(modal) {
  modal.classList.add("is-active")
}

export function closeModal(modal) {
  modal.classList.remove("is-active")
  console.log(modal)
}

export function closeModalListener() {
  const modals = document.querySelectorAll(".modal")

  modals.forEach(function (modal) {
    modal.querySelectorAll(".close-modal").forEach((btn) => {
      btn.addEventListener("click", () => {
        closeModal(modal)
      })
    })
  })
}

export function getSuneditorInstance(objectId) {
  if (!document.getElementById(objectId)) {
    return null
  }

  return suneditor.create(objectId, {
    plugins: plugins,
    buttonList: [
      ["fontSize", "formatBlock"],
      ["paragraphStyle", "blockquote"],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["fontColor", "hiliteColor", "textStyle"],
      ["removeFormat"],
      ["outdent", "indent"],
      ["align", "horizontalRule", "list", "lineHeight"],
      ["fullScreen", "showBlocks"],
      ["table", "link", "image", "video", "audio"],
    ],
  })
}
