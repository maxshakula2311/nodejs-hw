import express from 'express';
import notesController from '../controllers/notesController.js';

export const notesRouter = express.Router();

notesRouter.get('/', notesController.getAllNotes.bind(notesController));

notesRouter.get('/:noteId', notesController.getNoteById.bind(notesController));

notesRouter.post('/', notesController.createNote.bind(notesController));

notesRouter.patch('/:noteId', notesController.updateNote.bind(notesController));

notesRouter.delete('/:noteId', notesController.deleteNote.bind(notesController));
