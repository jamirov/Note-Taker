const express = require ('express');
const path = require('path');
const fs = require('fs');
const { response } = require('express');
const app = express();
const notesArr = [];

// Body parser Middleware.

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Reading a file from DB.Json and assigning to notesObj

let notesObj = fs.readFileSync("db/db.json", "utf-8");
notesJSON = JSON.parse(notesObj)
const tempArray = notesJSON;


//   This is a  GET request returns notes from db.json

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
    console.log(req.body);
    tempArray.push(newNote);
    console.log("POST request Started");
    console.log(tempArray);
    addNoteToDb (JSON.stringify(tempArray));
    res.send(newNote);
});




// HTML routes
app.use(express.static('public'));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// });
// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'notes.html'))
// });





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));