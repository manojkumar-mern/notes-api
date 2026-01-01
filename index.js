const express = require("express");
const app = express();

app.use(express.json());

let notes = [{ id: 1, title: "First Note", content: "This is my first note" }];

// GET all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// POST new note
app.post("/notes", (req, res) => {
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
