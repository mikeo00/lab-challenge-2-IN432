// events.service.js – business logic. Knows nothing about HTTP.
import { readFile } from 'node:fs/promises';
import { HttpError, notFound } from '../errors.js';

const events = JSON.parse(await readFile(new URL('../data/events.json', import.meta.url), 'utf8'));

const seatsLeft = (e) => e.capacity - e.registered;

export function listEvents({ category, available } = {}) {
  let result = events;
  if (category) {
    result = result.filter((e) => e.category.toLowerCase() === String(category).toLowerCase());
  }
  if (available === 'true') {
    result = result.filter((e) => seatsLeft(e) > 0);
  }
  return result.map((e) => ({ ...e, seatsLeft: seatsLeft(e) }));
}

export function getEventById(id) {
  if (!Number.isInteger(id) || id < 1) throw new HttpError(400, 'id must be a positive integer');
  const event = events.find((e) => e.id === id);
  if (!event) throw notFound(`Event ${id}`);
  return { ...event, seatsLeft: seatsLeft(event) };
}

export function listCategories() {
  const counts = new Map();
  for (const e of events) counts.set(e.category, (counts.get(e.category) ?? 0) + 1);
  return [...counts].sort().map(([name, count]) => ({ name, count }));
}
