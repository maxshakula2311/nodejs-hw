import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;

    const perPage = Number(req.query.perPage) || 15;

    const { tag, search } = req.query;

    const skip = (page - 1) * perPage;

    let query = Note.find({ userId: req.user._id });

    if (tag) {
      query = query.where('tag').equals(tag);
    }

    if (search) {
      query = query.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },

          { content: { $regex: search, $options: 'i' } },
        ],
      });
    }

    const [totalNotes, notes] = await Promise.all([
      query.clone().countDocuments(),
      query.skip(skip).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      page,

      perPage,

      totalNotes,

      totalPages,

      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.noteId,
      userId: req.user._id,
    });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const newNote = await Note.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: req.params.noteId,
        userId: req.user._id,
      },
      req.body,
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );

    if (!updatedNote) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.noteId,
      userId: req.user._id,
    });

    if (!deletedNote) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
