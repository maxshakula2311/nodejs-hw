import createHttpError from 'http-errors';
import {Note} from '../models/note.js';

class NotesController {
  async getAllNotes(req, res, next) {
    try {
      const notes = await Note.find();
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }

  async getNoteById(req, res, next) {
    try {
      const noteId = req.params.noteId;
      const note = await Note.findById(noteId);
      if (!note) {
        throw createHttpError(404, 'Note not found');
      }
      res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  }

  async createNote(req, res, next) {
    try {
      const { title, content, tag } = req.body;
      const newNote = new Note({ title, content, tag });
      const savedNote = await newNote.save();
      res.status(201).json(savedNote);
    } catch (error) {
      next(error);
    }
  }

  async updateNote(req, res, next) {
    try {
      const noteId = req.params.noteId;
      const { title, content, tag } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { title, content, tag },
        { returnDocument: 'after' }
      );
      if (!updatedNote) {
        throw createHttpError(404, 'Note not found');
      }
      res.status(200).json(updatedNote);
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req, res, next) {
    try {
      const noteId = req.params.noteId;
      const deletedNote = await Note.findByIdAndDelete(noteId);
      if (!deletedNote) {
        throw createHttpError(404, 'Note not found');
      }
      res.status(200).json(deletedNote);
    } catch (error) {
      next(error);
    }
  }
}

const notesController = new NotesController();

export const getAllNotes = notesController.getAllNotes.bind(notesController);
export const getNoteById = notesController.getNoteById.bind(notesController);
export const createNote = notesController.createNote.bind(notesController);
export const updateNote = notesController.updateNote.bind(notesController);
export const deleteNote = notesController.deleteNote.bind(notesController);
