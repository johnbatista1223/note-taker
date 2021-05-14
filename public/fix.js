app.post("/api/notes", (req, res) => {
  let note = req.body;
  let list = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let length = (list.length).toString();
  note.id = length;
  list.push(note);
  fs.writeFileSync("./db/db.json", JSON.stringify(list));
  res.json(list);
})
app.delete("/api/notes/:id", (req, res) => {
  let list = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteId = (req.params.id).toString();
  list = list.filter(selected =>{
      return selected.id != noteId;
  })
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
