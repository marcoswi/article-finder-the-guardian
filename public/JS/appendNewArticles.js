
function appendNewArticles(newArticles) {
    const articlesContainer = document.querySelector('.articles-container');
    newArticles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';
        const cardContent = document.createElement('div');
        cardContent.innerHTML = `
        <h2 class="article-title">${article.title}</h2>
        <div class="article-url"><a href="${article.linkToArticle}">Link to full article</a></div>
        `;
        const cardBottom = document.createElement('div');
        cardBottom.className = 'card-bottom';
        cardBottom.innerHTML = `
        <div class="article-topic">${article.topic}</div>
        <div class="article-date">${article.date}</div>
        `;
        card.appendChild(cardContent);
        card.appendChild(cardBottom);
        articlesContainer.appendChild(card);
    });

    const cardsContainer = document.querySelector(".articles-container");
    const cards = cardsContainer.querySelectorAll(".card");

    const quantityOfCards = cards.length;

    const totalArticles = document.querySelector("#totalArticles");
    const innerTextAsString = totalArticles.textContent;
    const innerTextAsInteger = parseInt(innerTextAsString, 10);

    if (quantityOfCards >= innerTextAsInteger){
        const button = document.querySelector("#moreArticlesButton")
        button.classList.add("hidden-button")
    }

};