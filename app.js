const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

const GNEWS_API_KEY = 'gnews_api_key'; // Temparory key
const GNEWS_API_URL = 'https://gnews.io/api/v4';

app.use(express.json());

// Fetch N news articles
app.get('/news', async (req, res) => {
    const count = req.query.count || 10;
    const cacheKey = `news_${count}`;
    
    if (cache.has(cacheKey)) {
        return res.json(cache.get(cacheKey));
    }
    
    try {
        const response = await axios.get(`${GNEWS_API_URL}/top-headlines`, {
            params: {
                token: GNEWS_API_KEY,
                max: count
            }
        });
        
        cache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Find news by title or author
app.get('/news/search', async (req, res) => {
    const { q, title, author } = req.query;
    const cacheKey = `search_${q}_${title}_${author}`;
    
    if (cache.has(cacheKey)) {
        return res.json(cache.get(cacheKey));
    }
    
    try {
        const response = await axios.get(`${GNEWS_API_URL}/search`, {
            params: {
                token: GNEWS_API_KEY,
                q: q || title || author
            }
        });
        
        cache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Clear Cache endpoint (optional for testing)
app.get('/clear-cache', (req, res) => {
    cache.flushAll();
    res.json({ message: 'Cache cleared' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
