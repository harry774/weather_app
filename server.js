const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public')); // Serve static files from 'public' directory

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    try {
        const response = await axios.get(`${API_URL}+${city}+&appid=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'City not found' });
        } else {
            console.error('Error fetching weather data:', error);
            res.status(500).json({ error: 'An error occurred while fetching weather data' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});