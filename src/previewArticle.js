const url = new URL(window.location.href)
const previewArticle = url.searchParams.get("id")

const requestURL = `https://articles-c78c.restdb.io/rest/articles/${previewArticle}`
export let articles = []
export async function getJSONoneArticle() {
  document.querySelector(".is-loading").style.display = "inline-block"
  return fetch(requestURL, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "6015b2ba6adfba69db8b6ba3",
    },
  }).then(async function (response) {
    const jsonData = await response.json()

    articles = jsonData
    console.log("art", articles)
    document.querySelector(".is-loading").style.display = "none"
    renderArticlePreview()
  })
}

function renderArticlePreview() {
  document.getElementById("preview-title").innerHTML = articles.title
  document.getElementById("preview-description").innerHTML = articles.description
}
