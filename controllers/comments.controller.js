import * as commentsService from '../services/comments.service.js';

export function list(req, res) {
  res.json(commentsService.listComments(Number(req.params.id)));
}

export function create(req, res) {
  const comment = commentsService.addComment(Number(req.params.id), req.body ?? {});
  req.log.info({ commentId: comment.id }, 'comment created');
  res.status(201).json(comment);
}
