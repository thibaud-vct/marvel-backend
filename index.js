const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
    try {
        const page = req.query.page * 100;
        const name = req.query.search;
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY_MARVEL}&skip=${page}&limit=100&name=${name}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.get("/comics", async (req, res) => {
    try {
        const page = req.query.page * 100;
        const title = req.query.search;
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY_MARVEL}&skip=${page}&limit=100&title=${title}`
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.get("/character-comics/:id", async (req, res) => {
    try {
        const character = req.params.id;
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/comics/${character}?apiKey=${process.env.API_KEY_MARVEL}`
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.all("*", (req, res) => res.status(404).json({ message: "page not found" }));

app.listen(3100, () => console.log("server started"));
