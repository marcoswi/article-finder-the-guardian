

const topicsButtons = document.querySelectorAll(".topic");
const articleCards = document.querySelectorAll(".card");
const cardsArray = Array.from(articleCards);

const foundTopics = document.querySelector(".foundTopics");

foundTopics.addEventListener("click", event =>{

    if (event.target.tagName === "BUTTON"){

        const seeMoreButton = document.querySelector("#moreArticlesButton")
        seeMoreButton.classList.add("hidden-button");

        const selectedTopic = event.target.textContent;
        const articleCards = document.querySelectorAll(".card");
            const cardsArray = Array.from(articleCards);

            const filteredCards = cardsArray.filter(card => (card.children[1].firstElementChild.innerText === selectedTopic));
            
            const articlesContainer = document.querySelector('.articles-container');
            articlesContainer.innerHTML = '';
            
            filteredCards.forEach(card => {
                const newCard = document.createElement("div");
                newCard.className = "card";
                const cardContent = document.createElement("div");
                cardContent.innerHTML = `
                    <h2 class="article-title">${card.children[0].firstElementChild.innerText}</h2>
                    <div class="article-url">${card.children[0].lastElementChild.innerHTML}</div>
                    `;
                const cardBottom = document.createElement("div");
                cardBottom.className = "card-bottom";
                cardBottom.innerHTML = `
                    <div class="article-topic">${card.children[1].firstElementChild.innerText}</div>
                    <div class="article-date">${card.children[1].lastElementChild.innerText}</div>
                    `;
                newCard.appendChild(cardContent);
                newCard.appendChild(cardBottom);
                articlesContainer.appendChild(newCard);
            })
    }   
})



