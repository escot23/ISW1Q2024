import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to my first API with Node Js ,,");
});

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
