const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7"
const URL = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", () => fetchNews("India"))

function reload() {
    window.location.reload()
}


async function fetchNews(query) {
    const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data = await response.json()
    formatedData(data.articles)
}

function formatedData(articles) {
    const cardsContainer = document.getElementById("cards_container")
    const newsCardTemplate = document.getElementById("template_news_card")

    cardsContainer.innerHTML = ""

    articles.forEach((articles) => {
        if (!articles?.urlToImage) {
            return;
        }

        const cardClone = newsCardTemplate.content.cloneNode(true)
        fillDataInCard(cardClone, articles)
        cardsContainer.appendChild(cardClone)
    })
}

function fillDataInCard(cardClone, articles) {
    const newsImage = cardClone.querySelector('#news_img')
    const newsTitle = cardClone.querySelector('#news_title')
    const newsSource = cardClone.querySelector('#news_source')
    const newsDescription = cardClone.querySelector('#news_description')

    newsImage.src = articles?.urlToImage
    newsTitle.innerHTML = articles?.title
    newsDescription.innerHTML = articles?.description

    const date = new Date(articles.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    })

    newsSource.innerHTML = `${articles?.source?.name} - ${date}`

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(articles.url, "_blank");
    })
}

let curSelectedNav = null
function onNavItemClick(id){
    fetchNews(id)

    const navItem = document.getElementById(id)
    curSelectedNav?.classList.remove("active")
    curSelectedNav = navItem
    curSelectedNav.classList.add("active")
}



const searchButton = document.getElementById("search_button")
const search_text = document.getElementById("search_text")
searchButton.addEventListener("click", ()=>{
    const query = search_text.value;
    if(!query){
        return;
    }

    fetchNews(query)
    curSelectedNav?.classList.remove("active")
    curSelectedNav = null
})