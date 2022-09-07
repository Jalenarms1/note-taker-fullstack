const express = require("express");
const router = express.Router();
const fs = require("fs");
const db = require("../db/db.json");
// const getID = require("../helper/generateID.js")

router.use(express.json());
router.use(express.urlencoded({ extended: true }))


router.get("/notes", (req, res) => {
    res.json(db)
})

router.post("/notes", (req, res) => {
    console.log(req.body)
    res.send(`${req.method} request was received`)
    const { title, text, id } = req.body;
    if(title && text){
        let store = {
            title: req.body.title,
            text: req.body.text,
            id: req.body.id
        }

        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            const parsedRes = JSON.parse(data);
            parsedRes.push(store)
            fs.writeFile("./db/db.json", JSON.stringify(parsedRes), err => {
                err ? console.error(err) : console.log("worked")
            })
        })
    }
})

router.delete("/notes/:id", (req, res) => {
    res.send(`${req.params.id} was deleted`)
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

module.exports = router;