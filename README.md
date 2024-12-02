# M-1
Milestone-1 skill lab


 Mini Search Engine for Articles
 Overview
 The Mini Search Engine enables users to upload and search articles efficiently. This backend mimics
 the behavior of a simple search engine by supporting keyword searches and relevance-based sorting.
 Features
 1. Addarticles with a title, content, and tags.
 2. Search articles by keywords in the title or content.
 3. Sort search results by relevance or date.
 Requirements
 ● Endpoints:
 ○ AddArticle (POST /articles): Add a new article with metadata.
 ○ Search Articles (GET /articles/search): Search articles by keyword or tag.
 ○ GetArticle (GET /articles/:id): Retrieve full article details by ID.
 ● Indexing:
 ○ Maintain an in-memory index for quick searches.
 ○ Calculate relevance using keyword frequency.
 Solution Design
 ● Usearrays to store articles with indexing for fast searches.
 ● Implement search logic with text matching and sorting by relevance.
 ● Usefsforoptional persistence of articles
