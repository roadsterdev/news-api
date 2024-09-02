# News API

This is a simple API built with Node.js and Express.js that interacts with the GNews API to fetch news articles.

## Setup Instructions

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env` file and add your GNews API key:
4. Start the server using `node app.js`.
5. The API will be available at `http://localhost:3000`.

## Endpoints

- **GET /news?count=N**: Fetch N top news articles.
- **GET /news/search?q=keyword**: Search for news articles by keyword.
- **GET /clear-cache**: Clear the API cache (for development purposes).

## Caching

- The API uses `node-cache` to cache responses for 10 minutes to reduce redundant API requests to GNews.

