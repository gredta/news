let latestNewsAPI = `https://newsdata.io/api/1/news?language=en&country=us&category=technology&apiKey=`;
let categoryNewsAPI = "https://newsdata.io/api/1/news?language=en&country=us&category=";

let data = [];

let prevBtn = document.getElementsByClassName("prev")[0];
let nextBtn = document.getElementsByClassName("next")[0];
let dot1 = document.getElementsByClassName("dot1")[0];
let dot2 = document.getElementsByClassName("dot2")[0];
let dot3 = document.getElementsByClassName("dot3")[0];
let dot4 = document.getElementsByClassName("dot4")[0];


let slideIndex = 0;
function plusSlides(n) {
    showSlides(slideIndex += n)
}
function currentSlide(n) {
    showSlides(slideIndex = n)
}

prevBtn.addEventListener("click", () => {
    plusSlides(-1);
});
nextBtn.addEventListener("click", function() {
    plusSlides(1);
});
dot1.addEventListener("click", function() {
    currentSlide(1);
});
dot2.addEventListener("click", function() {
    currentSlide(2);
});
dot3.addEventListener("click", function() {
    currentSlide(3);
});
dot4.addEventListener("click", function() {
    currentSlide(4);
});

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slider-item");
    let dots = document.getElementsByClassName("manual-btn");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }    
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("check")
    }
    slides[slideIndex - 1].style.display = "block";  
    dots[slideIndex - 1].classList.add("check");
    // setTimeout(showSlides, 8000); // Change image every 2 seconds
}
function autoSlides() {
    let i;
    let slides = document.getElementsByClassName("slider-item");
    let dots = document.getElementsByClassName("manual-btn");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("check");
    }
    slideIndex++; 
    if (slideIndex > slides.length) {slideIndex = 1;}
    slides[slideIndex - 1].style.display = "block";  
    dots[slideIndex - 1].classList.add("check");
    setTimeout(autoSlides, 8000); // Change image every 2 seconds
}


function insertLatestNews(data) {
    let slider = document.querySelector(".slider");
    for(let i = 0; i < 4; i++) {
        let slide = document.createElement("a");
        slide.classList.add("slider-item");
        slide.href = data.results[i].link;
        slider.appendChild(slide);

        let slideImg = document.createElement("div");
        slideImg.classList.add("slide-image");
        if(data.results[i].image_url == null) {
            slideImg.style.backgroundImage = `url("https://loremflickr.com/320/240?random=1")`;
        }
        else{
            slideImg.style.backgroundImage = `url("${data.results[i].image_url}")`;
        }
        slide.appendChild(slideImg);

        let metaDiv = document.createElement("div");
        metaDiv.classList.add("metadata");
        slide.appendChild(metaDiv);

        let textDiv = document.createElement("div");
        metaDiv.appendChild(textDiv);

        let slideSource = document.createElement("p");
        slideSource.classList.add("slider-source");
        slideSource.textContent = data.results[i].source_id.toUpperCase();
        textDiv.appendChild(slideSource);

        let slideAuthorDate = document.createElement("p");
        slideAuthorDate.classList.add("slider-author-date");
        let date = new Date(data.results[i].pubDate) 
        if(data.results[i].creator == null) {
            slideAuthorDate.textContent = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
        } else {
            slideAuthorDate.textContent = `${data.results[i].creator}  |  ${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
        }
        textDiv.appendChild(slideAuthorDate);

        let slideTitle = document.createElement("h1");
        slideTitle.textContent = data.results[i].title;
        metaDiv.appendChild(slideTitle);

        let slideDescription = document.createElement("p");
        slideDescription.classList.add("slider-description");
        slideDescription.textContent = data.results[i].description.substring(0, 400) + "...";
        metaDiv.appendChild(slideDescription);
    }
    autoSlides();
    showSlides(slideIndex);
}

function insertSectionNews(data, categoryNme) {
    let main = document.querySelector("main");

    let sectionTitle = document.createElement("div");
    sectionTitle.classList.add("section-title");
    main.appendChild(sectionTitle);

    let title = document.createElement("h2");
    title.textContent = categoryNme.toUpperCase();
    sectionTitle.appendChild(title);

    let divider = document.createElement("hr");
    sectionTitle.appendChild(divider);

    let link = document.createElement("a");
    link.href = categoryNme + ".html";
    link.textContent = "See More"
    sectionTitle.appendChild(link);

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


    for(let i = 1; i < 4; i++) {
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
    fetchLatestNews();
    fetchCategoryNews();
}


async function fetchLatestNews() {
    const requestURL = latestNewsAPI + apiKey;
    const request = new Request(requestURL);
    const response = await fetch(request);
    data = [];
    if(response.status >= 200 && response.status < 300) {
        const latestNews = await response.json();
        data = latestNews;
    } else {
        console.log(response.status, response.statusText);
    }
    
    insertLatestNews(data);
}

const categories = ["top", "business", "entertainment", "health", "science", "sports", "technology"];
async function fetchCategoryNews() {
    for(let i = 0; i < categories.length; i++) {
        category = categories[i];
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
}