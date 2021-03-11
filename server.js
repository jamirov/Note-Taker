const express = require ('express');
const path = require('path');
const fs = require('fs');
const { response } = require('express');
const app = express();
const notesArr = [];
const { v4: uuidv4 } = require('uuid');

// Body parser Middleware.

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Reading a file from DB.Json and assigning to notesObj

let notesObj = fs.readFileSync("db/db.json", "utf-8");
notesJSON = JSON.parse(notesObj)
const tempArray = notesJSON;


// This is a  GET request returns notes from db.json

app.get('/api/notes', (req, res) => res.json(notesJSON));


// This function  appends notes to the db.json file

function addNoteToDb (note) {
    fs.writeFile("db/db.json", note,(err) =>{
    if (err){
        console.log(err);
    } else {
        console.log("Finished writing");
    }
});
}
//  This is a POST request to add notes to db.json file

app.post('/api/notes', (req,res) => {
    const newNote = req.body;
    const finalNote = { ...newNote, id:uuidv4() }  
    console.log(finalNote);
    tempArray.push(finalNote);
    console.log("POST request Started");
    console.log(tempArray);
    addNoteToDb (JSON.stringify(tempArray));
    res.json(req.body);
});


// HTML routes
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));