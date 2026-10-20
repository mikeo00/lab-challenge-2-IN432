// errors.js – an Error that carries an HTTP status
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const notFound = (what) => new HttpError(404, `${what} not found`);
