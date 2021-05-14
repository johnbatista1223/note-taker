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
  
})
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});



app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id.toString();;
  const updatedDb = db.filter(note =>{
    if(note.id === id){
      return false
    }else {
      return true
    }
  })
  console.log(id)
  console.log(updatedDb)
  db = updatedDb
  res.json(db);

  })
  

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

