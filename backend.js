const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

let articles = []; // In-memory storage
const DATA_FILE = "articles.json";

// Load articles from persistence file if available
if (fs.existsSync(DATA_FILE)) {
  articles = JSON.parse(fs.readFileSync(DATA_FILE));
}

// Utility function to save articles to file
const saveArticles = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(articles));
};

// **Endpoint: AddArticle (POST /articles)**
app.post('/articles', (req, res) => {
    const articlesToAdd = req.body; // This should now be an array of articles
    
    // Loop through the array and validate each article
    articlesToAdd.forEach((article) => {
        const { title, content, tags } = article;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }

        // Add each valid article to the articles array
        articles.push({ id: articles.length + 1, title, content, tags });
    });
    
    res.status(201).json({ message: 'Articles added successfully' });
});


// **Endpoint: SearchArticles (GET /articles/search)**
app.get("/articles/search", (req, res) => {
  const { keyword, tag, sortBy } = req.query;

  // Filter articles based on keyword or tag
  let filteredArticles = articles.filter((article) => {
    const matchesKeyword =
      keyword &&
      (article.title.includes(keyword) || article.content.includes(keyword));
    const matchesTag = tag && article.tags.includes(tag);
    return matchesKeyword || matchesTag;
  });

  // Sort by relevance (keyword frequency) or date
  if (sortBy === "relevance" && keyword) {
    filteredArticles.sort((a, b) => {
      const freqA =
        (a.title.match(new RegExp(keyword, "gi")) || []).length +
        (a.content.match(new RegExp(keyword, "gi")) || []).length;
      const freqB =
        (b.title.match(new RegExp(keyword, "gi")) || []).length +
        (b.content.match(new RegExp(keyword, "gi")) || []).length;
      return freqB - freqA;
    });
  } else if (sortBy === "date") {
    filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  res.json(filteredArticles);
});

// **Endpoint: GetArticle (GET /articles/:id)**
app.get("/articles/:id", (req, res) => {
  const { id } = req.params;
  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) {
    return res.status(404).json({ error: "Article not found." });
  }

  res.json(article);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


