import Note from "../models/Note.js";
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

export async function editNote(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(201).json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) return res.status(404).json({ message: "Note not found" });

    res.json(deletedNote);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
