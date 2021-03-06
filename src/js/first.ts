import { addListenerOnDeleteBtn } from "./deleteArticle"
import { addListenerOnEditBtn } from "./editArticle"
import { format } from "date-fns"
import {Article } from './previewArticle'

const listOfArticles = document.querySelector(".list-of-articles")
const requestURL = "https://articles-c78c.restdb.io/rest/articles"

export let articles: Article[] = []

export async function getJSON() {
  document.querySelector<HTMLDivElement>(".is-loading").style.display = "inline-block"
  render([])
  return fetch(requestURL, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "6015b2ba6adfba69db8b6ba3",
    },
  }).then(async function (response) {
    articles = await response.json()

    articles.sort(function (a, b) {
      return b.createdAt - a.createdAt
    })

    render(articles)
    document.querySelector<HTMLDivElement>(".is-loading").style.display = "none"

    return true
  })
}

function addListenerOnPreviewArticleBtns() {
  const previewArticleBtns = document.querySelectorAll(".preview-article")

  previewArticleBtns.forEach(function (btn) {
    const dataId = btn.getAttribute("data-id")

    btn.addEventListener("click", () => {
      location.href = `/articlePreview.html?id=${dataId}`
    })
  })
}

function render(collectionItems: Article[]) {
  listOfArticles.innerHTML = ""
  collectionItems.forEach(function (element, index) {
    const newDivWithNewArticle = `<tr>
                                        <th>${index + 1}</th>
                                        <td class="title-of-article has-text-left">${element.title}</td>
                                        <td>
                                            <a class="preview-article" data-id="${
                                              element._id
                                            }"><i class="far fa-eye"></i></a>
                                            <a class="edit-article"  data-id="${
                                              element._id
                                            }"><i class="fas fa-edit"></i></a>
                                            <a class="delete-article" data-id="${
                                              element._id
                                            }"><i class="fas fa-trash"></i></a>
                                            
                                        </td>
                                        <td>${format(new Date(element.createdAt), "dd-MM-yyyy HH:mm")}</td>
                                        <td>${
                                          element.updatedAt
                                            ? format(new Date(element.updatedAt), "dd-MM-yyyy HH:mm")
                                            : ""
                                        }</td>
                                    </tr>`
    const tempDiv = document.createElement("tr")
    tempDiv.innerHTML = newDivWithNewArticle
    listOfArticles.appendChild(tempDiv)
    tempDiv.setAttribute("data-id", element._id)
  })

  addListenerOnDeleteBtn()
  addListenerOnEditBtn()
  addListenerOnPreviewArticleBtns()
}

