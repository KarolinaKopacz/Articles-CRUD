const url = new URL(window.location.href)
const previewArticle = url.searchParams.get("id")

export type Article = {
  _id: string
  title: string
  description: string
  createdAt: number
  updatedAt: number
}

const requestURL = `https://articles-c78c.restdb.io/rest/articles/${previewArticle}`

export async function getJSONoneArticle() {
  document.querySelector<HTMLDivElement>(".is-loading").style.display = "inline-block"
  return fetch(requestURL, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "6015b2ba6adfba69db8b6ba3",
    },
  }).then(async function (response) {
    const article = await response.json() as Article

    document.querySelector<HTMLDivElement>(".is-loading").style.display = "none"
    document.getElementById("preview-title").innerHTML = article.title
    document.getElementById("preview-description").innerHTML = article.description
  })
}

