import { Joi } from "celebrate";
import { TAGS } from "../constants/tags.js";
import { isValidObjectId } from "mongoose";

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

const getAllNotesSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
});

const noteIdSchema = Joi.object({
  params: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
});

const createNoteSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().max(100).required(),
    content: Joi.string().max(1000).allow(''),
    tag: Joi.string().valid(...TAGS),
  }),
});

const updateNoteSchema = Joi.object({
  params: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  body: Joi.object({
    title: Joi.string().min(1).max(100),
    content: Joi.string().max(1000).allow(''),
    tag: Joi.string().valid(...TAGS),
  }).or('title', 'content', 'tag'),
});

export {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
};
