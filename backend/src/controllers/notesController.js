

export const getNotes = (req, res) => {
  res.status(200).json({ message: 'Fetched all notes' });
};

export const createNote = (req, res) => {
  const newNote = req.body;
  res.status(201).json({ message: 'Note created successfully', note: newNote });
};

export const updateNote = (req, res) => {
  const { id } = req.params;
  const updatedNote = req.body;
  res.status(200).json({ message: 'Note updated successfully', note: { id, ...updatedNote } });
};

export const deleteNote = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: 'Note deleted successfully', id });
};
