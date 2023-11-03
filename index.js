import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import bodyParser from "body-parser";


dotenv.config();
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let searchTerm = "";
let fromDate;
let toDate;

function dateConstructor (inputDate) {
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    const parsedDate = new Date(inputDate);
    const day = parsedDate.getDate();
    const month = months[parsedDate.getMonth()];
    const year = parsedDate.getFullYear(); 
    const formattedDate = `${day} ${month} ${year}`;
    return(formattedDate);
}

//Initial GET calls:
app.get("/", (req, res)=>{
    res.render("index.ejs")
});

app.get("/search", (req, res)=>{
    res.render("index.ejs")
});

//POST call when the user introduces a term and dates in the search menu:
app.post("/search", async (req, res) => {
    searchTerm = JSON.stringify(req.body.searchTerm);
    fromDate = req.body.fromDate;
    toDate = req.body.toDate;
    
    try {
        const requestedArticles = await axios.get(`https://content.guardianapis.com/search?q=${searchTerm}&order-by=newest&from-date=${fromDate}&to-date=${toDate}&api-key=${process.env.API_KEY}`);
        const arrayOfArticles = requestedArticles.data.response.results;
        const articleTotalQuantity = requestedArticles.data.response.total;
        
        let foundArticles = [];
        let uniqueTopics = [];
        let listOfTopics = [];


        arrayOfArticles.forEach((article, index) => {
            const newObject = {
                index: index,
                topic:article.sectionName,
                title: article.webTitle,
                linkToArticle: article.webUrl,
                date: dateConstructor(article.webPublicationDate)
            }
            foundArticles.push(newObject)

            const newTopic = {
                topic: article.sectionName
            }
            listOfTopics.push(newTopic);
            
        });

        const uniqueTopicsSet = new Set(listOfTopics.map(topic => topic.topic));
        const uniqueTopicsArray = Array.from(uniqueTopicsSet).map(topic => ({ topic }));

        let fromattedFromDate = fromDate.split("-").reverse().join("-");
        let fromattedtoDate = toDate.split("-").reverse().join("-");

        res.render("index.ejs", {articleQuantity: articleTotalQuantity, articles: foundArticles, term: searchTerm, fromDate: fromattedFromDate, toDate: fromattedtoDate, filteredTopics: uniqueTopicsArray});
    } catch (error) {
        res.render("index.ejs", {content: "Something went wrong!"});
    };
});

app.post("/morearticles", async (req,res) =>{
    let clickCount = req.body.clickCount;
    
    try {
        const moreArticlesRequest = await axios.get(`https://content.guardianapis.com/search?q=${searchTerm}&order-by=newest&from-date=${fromDate}&to-date=${toDate}&page=${clickCount}&api-key=${process.env.API_KEY}`);       
        let arrayOfNewArticles = moreArticlesRequest.data.response.results;
        let totalArticles = moreArticlesRequest.data.response.total;
        let  newArticles = [];
        let newArticlesTopics =[];

        arrayOfNewArticles.forEach((article, index) => {
            const newArticle = {
                index: index,
                topic:article.sectionName,
                title: article.webTitle,
                linkToArticle: article.webUrl,
                date: dateConstructor(article.webPublicationDate)
            }
            newArticles.push(newArticle);

            const newTopic = {
                topic: article.sectionName
            }
            newArticlesTopics.push(newTopic);

        })

        const uniqueTopicsSet = new Set(newArticlesTopics.map(topic => topic.topic));
        const uniqueTopicsArray = Array.from(uniqueTopicsSet).map(topic => ({ topic }));
        
        res.json({
            newArticles: newArticles,
            uniqueTopicsArray: uniqueTopicsArray
        });

    } catch (error) {
        console.log(error);
        res.render("something went wrong");
    };
});



app.listen(port, ()=>{
    console.log("Port is running on: " + port);
});




