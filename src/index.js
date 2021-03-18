import { getJSON } from "./first"
import { closeModalListener } from "./functions"
import "./createArticle"
import "./deleteArticle"
import "./editArticle"
import { getJSONoneArticle } from "./previewArticle"

const page = document.body.getAttribute("id")
if (page === "home") {
  getJSON()
  closeModalListener()
} else {
  getJSONoneArticle()
}
