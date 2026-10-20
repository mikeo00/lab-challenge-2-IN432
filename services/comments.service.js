// comments.service.js – logic and in-memory storage; no req/res here
import { getEventById } from './events.service.js';
import { HttpError } from '../errors.js';

const comments = [];
let nextId = 1;

export function listComments(eventId) {
  getEventById(eventId);                       // throws 404 if the event does not exist
  return comments.filter((c) => c.eventId === eventId);
}

export function addComment(eventId, { author, text }) {
  getEventById(eventId);
  const details = validate({ author, text });
  if (details.length) throw Object.assign(new HttpError(422, 'Validation failed'), { details });

  const comment = { id: nextId++, eventId, author: author.trim(), text: text.trim(), createdAt: new Date().toISOString() };
  comments.push(comment);
  return comment;
}

function validate({ author, text }) {
  const details = [];
  if (typeof author !== 'string' || author.trim().length < 2 || author.trim().length > 40)
    details.push({ field: 'author', message: 'must be a string of 2 to 40 characters' });
  if (typeof text !== 'string' || text.trim().length < 1 || text.trim().length > 500)
    details.push({ field: 'text', message: 'must be a string of 1 to 500 characters' });
  return details;
}
