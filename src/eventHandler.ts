import { IncomingMessage, ServerResponse } from 'http';
import { addEvent, getEvents } from './database';
import UserEvent from './userEvent';
import parseQueryString from './parseQueryString';

/**
 * Handle GETs and POSTs to read and write events
 */
function eventHandler(
  req: IncomingMessage,
  res: ServerResponse,
  next: (error?: Error) => void,
): void {
  if (req.method === 'GET') {
    // Get all events or filtered by date or user email
    const params: { email: string; since: string | Date } = parseQueryString(
      require('url').parse(req.url).search || '',
    ) as { email: string; since: string };
    if (params.since) {
      params.since = new Date(params.since);
    }
    const data = JSON.stringify(getEvents(params as { email: string; since: Date }));
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', Buffer.byteLength(data));
    res.write(data);
    res.end();
  } else if (req.method === 'POST') {
    // Validate and create a new event
    const event: UserEvent = new UserEvent((req as any).body);
    const msg: string | null = event.validate();
    if (msg) {
      next(new Error(msg));
      return;
    }
    addEvent(event);
    res.setHeader('Content-Length', 0);
    res.statusCode = 201;
    res.end();
  }
  next();
}

export default eventHandler;
