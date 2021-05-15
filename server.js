const fs = require("fs");
const express = require("express");
const path = require("path");
const {v4 : uuidv4} = require('uuid');
 

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  let db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(db);
});
app.post("/api/notes", (req, res) => {
  console.log('post')
  let note = req.body;
  let list = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newId = uuidv4()
  note.id = newId;
list.push(note);
fs.writeFileSync("./db/db.json", JSON.stringify(list));
res.json(list);
});


app.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  console.log(notes, id);
  let updatedDb = notes.filter(note => note.id !== id)
  fs.writeFileSync('./db/db.json', JSON.stringify(updatedDb))
  res.json(updatedDb);
})
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

