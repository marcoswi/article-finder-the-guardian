function appendNewTopics (newArticlesTopics){
            
    const topicButtons = document.querySelectorAll(".topic");

    const topicsArray = Array.from(topicButtons).map(button => {
    return {
        topic: button.innerText
    };
    });
    
    const topicsToFilter = topicsArray.map(obj => obj.topic);

    const newTopicsToAdd = newArticlesTopics.filter(obj => !topicsToFilter.includes(obj.topic));
    newTopicsToAdd.forEach(topic => {
        const foundTopics = document.querySelector(".foundTopics");
        const newTopicButton = document.createElement("button");
        newTopicButton.className = "topic";
        newTopicButton.innerText = topic.topic;
        foundTopics.appendChild(newTopicButton);
    })
};