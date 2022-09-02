const express = require("express");
const fs = require("fs");
const app = express();
const db = require("./db/db.json");
const path = require("path");
const getID = require("./helper/generateID.js")

const PORT = process.env.PORT || 3001;


app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("https://serene-savannah-94213.herokuapp.com/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
    console.log("End point hit")
})

app.get("https://serene-savannah-94213.herokuapp.com/api/notes", (req, res) => {
    res.json(db)
})

app.post("https://serene-savannah-94213.herokuapp.com/api/notes", (req, res) => {
    console.log(req.body)
    const { title, text, id } = req.body;
    if(title && text){
        const newNote = {
            title,
            text,
            id: getID()
        }

        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            const parsedRes = JSON.parse(data);
            parsedRes.push(newNote)
            fs.writeFile("./db/db.json", JSON.stringify(parsedRes), err => {
                err ? console.error(err) : console.log("worked")
            })
        })
    }
})

app.delete("https://serene-savannah-94213.herokuapp.com/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) console.log(err);
        if(!err){
            let dbParsed = JSON.parse(data);
            let newData = dbParsed.filter(item => {
                return item.id != req.params.id
            })

            fs.writeFile("./db/db.json", JSON.stringify(newData), err => {
                err ? console.log(err) : console.log("Note delted")
            })
        }
    })
})

app.listen(PORT, () => {
    console.log("Success")
})