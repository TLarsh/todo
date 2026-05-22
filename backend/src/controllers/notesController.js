import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: 'Error fetching notes', error });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: 'Note created successfully', note: newNote });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: 'Error creating note', error });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const updatedNote = req.body;
  try {
    const note = await Note.findByIdAndUpdate(id, updatedNote, { new: true });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note updated successfully', note });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: 'Error updating note', error });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully', id });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: 'Error deleting note', error });
  }
};
