const express = require("express");
const fs = require("fs");
const app = express();
const db = require("./db/db.json");
const path = require("path");
const getID = require("./helper/generateID.js")
const cors = require("cors");
const router = require("./routes/notesRouter");

const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: "*",
}))

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("https://serene-savannah-94213.herokuapp.com/api/notes/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
    console.log("End point hit")
})

app.use("https://serene-savannah-94213.herokuapp.com/api/notes/api", router)

app.listen(PORT, () => {
    console.log("Success")
})