export function getAllNotes(req, res) {
  res.status(200).send("You got 3 notes");
}

export function createNote(req, res) {
  res.status(201).send("Note created successfully");
}

export function editNote(req, res) {
  res.status(200).send("Note edited successfully");
}

export function deleteNote(req, res) {
  res.status(200).send("Note deleted successfully");
}
