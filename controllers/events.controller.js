// events.controller.js – translates HTTP <-> service calls. No business logic here.
import * as eventsService from '../services/events.service.js';

export function list(req, res) {
  const { category, available } = req.query;
  const events = eventsService.listEvents({ category, available });
  res.json({ count: events.length, items: events });
}

export function getOne(req, res) {
  res.json(eventsService.getEventById(Number(req.params.id)));
}

export function categories(req, res) {
  res.json(eventsService.listCategories());
}
