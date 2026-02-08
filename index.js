const express = require("express");
const app = express();

app.use(express.json());

let notes = [{ id: Date.now(), title: "First Note", content: "This is my first note" }];

// root route
app.get("/", (req, res) => {
  res.send("Notes API is running 🚀");
});

app.get("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.json(note);
});

// GET all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// POST new note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newNote = {
    id: Date.now(),
    title,
    content,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

app.put("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;

  res.json(note);
});

app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const noteExists = notes.some((note) => note.id === id);

  if (!noteExists) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes = notes.filter((note) => note.id !== id);
  res.json({ message: "Note deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
