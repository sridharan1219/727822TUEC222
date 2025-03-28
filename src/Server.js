const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8000;
const numbersQueue = [];
const WINDOW_SIZE = 10; 

const API_URLS = {
    "p": "http://20.244.56.144/test/primes",
    "f": "http://20.244.56.144/test/fibonacci",
    "e": "http://20.244.56.144/test/even",
    "r": "http://20.244.56.144/test/random"
};

app.get("/numbers/:numberId", async (req, res) => {
    const numberId = req.params.numberId;

    if (!API_URLS[numberId]) {
        return res.status(400).json({ error: "Invalid number ID" });
    }

    try {
     
        const response = await axios.get(API_URLS[numberId]);
        const fetchedNumbers = response.data.numbers || [];

    
        const windowPrevState = [...numbersQueue];

      
        numbersQueue.push(...fetchedNumbers);
        while (numbersQueue.length > WINDOW_SIZE) {
            numbersQueue.shift();
        }

        const avg = numbersQueue.length > 0 
            ? (numbersQueue.reduce((sum, num) => sum + num, 0) / numbersQueue.length).toFixed(2) 
            : 0;

        
        res.json({
            windowPrevState,
            windowCurrState: [...numbersQueue],
            numbers: fetchedNumbers,
            avg: avg
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
