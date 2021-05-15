const fs = require("fs");
const express = require("express");
const path = require("path");
let db = require("./db/db.json");

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
  res.json(db);
});
app.post("/api/notes", (req, res) => {
  const note = req.body;
db.push(note);
res.json(true);
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});



app.delete("/api/notes/:id", (req, res) => {
  let id = req.params;
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  console.log(notes, id);
  let updatedDb = notes.filter(note => note.id !== id)
  // console.log(id)
  fs.writeFileSync('./db/db.json', JSON.stringify(updatedDb))
  db = updatedDb
  res.json(updatedDb);

})


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

