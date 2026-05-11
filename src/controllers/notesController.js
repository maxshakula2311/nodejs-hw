import createHttpError from 'create-http-error';
import {Note} from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json({ data: notes });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);
    res.status(200).json({ data: note });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { title, content, tag } = req.body;
    const newNote = new Note({ title, content, tag });
    const savedNote = await newNote.save();
    res.status(201).json({ data: savedNote });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const { title, content, tag } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content, tag },
      { new: true }
    );
    if (!updatedNote) {
      throw createHttpError(404, 'Note not found');
    }
    res.status(200).json({ data: updatedNote });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      throw createHttpError(404, 'Note not found');
    }
    res.status(200).json({ data: deletedNote });
  } catch (error) {
    next(error);
  }
};
