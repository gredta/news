let categoryNewsAPI = "https://newsdata.io/api/1/news?country=us&language=en&category=";

let data = [];

const activeSec = document.getElementsByClassName("active")[0];
let c = activeSec.textContent;
let category = c.toLowerCase();

function insertSectionNews(data, categoryNme) {
    let main = document.querySelector("main");

    let sectionTitle = document.createElement("div");
    sectionTitle.classList.add("category-title");
    main.appendChild(sectionTitle);

    let title = document.createElement("h2");
    title.textContent = categoryNme.toUpperCase();
    sectionTitle.appendChild(title);


    let previewGrids = document.createElement("div");
    previewGrids.classList.add("article-grid");
    main.appendChild(previewGrids);
    let card = document.createElement("a");
    card.classList.add("main-card");
    
    card.href = data.results[0].link;
    previewGrids.appendChild(card);

    let metaDiv = document.createElement("div");
    metaDiv.classList.add("card-metadata");
    card.appendChild(metaDiv);

    let topRow = document.createElement("div");
    topRow.classList.add("card-top-row");
    metaDiv.appendChild(topRow);

    let sourceName = document.createElement("p");
    sourceName.classList.add("source-name");
    sourceName.textContent = data.results[0].source_id.toUpperCase();
    topRow.appendChild(sourceName);

    let authorName = document.createElement("p");
    authorName.classList.add("card-author");
    if(data.results[0].creator == null) {
        authorName.textContent = "";
    } 
    else {
        authorName.textContent = `By: ${data.results[0].creator}`;
    }
    topRow.appendChild(authorName);

    let cardTitle = document.createElement("h1");
    cardTitle.textContent = data.results[0].title;
    metaDiv.appendChild(cardTitle);
    
    let cardDescription = document.createElement("p");
    cardDescription.classList.add("card-description");
    cardDescription.textContent = data.results[0].description.substring(0, 400) + "...";
    metaDiv.appendChild(cardDescription);

    let cardDate = document.createElement("p");
    cardDate.classList.add("card-date");
    let date = new Date(data.results[0].pubDate)
    cardDate.textContent = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    metaDiv.appendChild(cardDate);

    let cardImg = document.createElement("img");
    cardImg.classList.add("card-image");
    if(data.results[0].image_url == null) {
        cardImg.src = "https://loremflickr.com/320/240?random=1";
    } else {
        cardImg.src = data.results[0].image_url;
    }
    card.appendChild(cardImg);

    for(let i = 1; i < data.totalResults; i++) {
        let card = document.createElement("a");
        card.classList.add("preview-card");
        card.href = data.results[i].link;
        previewGrids.appendChild(card);

        let cardImg = document.createElement("img");
        cardImg.classList.add("card-image");
        if(data.results[i].image_url == null) {
            cardImg.src = "https://loremflickr.com/320/240?random=1";
        } else {
            cardImg.src = data.results[i].image_url;
        }
        card.appendChild(cardImg);

        let metaDiv = document.createElement("div");
        metaDiv.classList.add("card-metadata");
        card.appendChild(metaDiv);

        let topRow = document.createElement("div");
        topRow.classList.add("card-top-row");
        metaDiv.appendChild(topRow);

        let sourceName = document.createElement("p");
        sourceName.classList.add("source-name");
        sourceName.textContent = data.results[i].source_id.toUpperCase();
        topRow.appendChild(sourceName);

        let authorName = document.createElement("p");
        authorName.classList.add("card-author");
        if(data.results[i].creator == null) {
            authorName.textContent = "";
        } else {
            authorName.textContent = `By: ${data.results[i].creator}`;
        }
        topRow.appendChild(authorName);

        let cardTitle = document.createElement("h1");
        cardTitle.textContent = data.results[i].title;
        metaDiv.appendChild(cardTitle);

        let cardDate = document.createElement("p");
        cardDate.classList.add("card-date");
        let date = new Date(data.results[i].pubDate)
        cardDate.textContent = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
        metaDiv.appendChild(cardDate);
    }
}
window.onload = function() {
    fetchCategoryNews();
}


async function fetchCategoryNews() {
    const requestURL = categoryNewsAPI + category + "&apiKey=" + apiKey;
    const request = new Request(requestURL);
    const response = await fetch(request);
    data = [];
    if(response.status >= 200 && response.status < 300) {
        const categoryNews = await response.json();
        data = categoryNews;
    } else {
        console.log(response.status, response.statusText);
    }

    insertSectionNews(data, category);
}