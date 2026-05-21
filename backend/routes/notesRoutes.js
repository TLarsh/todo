import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('You got 5 notes');
});

router.post('/', (req, res) => {
  const newNote = req.body;
  res.status(201).json({ message: 'Note created successfully', note: newNote });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedNote = req.body;
  res.status(200).json({ message: 'Note updated successfully', note: { id, ...updatedNote } });
});  

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: 'Note deleted successfully', id });
});

export default router;
