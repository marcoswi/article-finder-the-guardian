

const moreArticlesButton = document.getElementById("moreArticlesButton");
    let clickCount = 1;

    moreArticlesButton.addEventListener("click", () => {
        clickCount++;
        
    fetch(`/morearticles`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `clickCount=${clickCount}`
    })
    .then(response =>response.json())
    .then(data => {
        const newArticles = data.newArticles;
        const newArticlesTopics = data.uniqueTopicsArray;

        appendNewArticles(newArticles);
        appendNewTopics (newArticlesTopics);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    });