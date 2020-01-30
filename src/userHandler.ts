import { IncomingMessage, ServerResponse } from 'http';
import { addUser, getUsers, userExists } from './database';
import User from './user';

/**
 * Handle GETs and POSTs to read and write users
 */
function userHandler(
  req: IncomingMessage,
  res: ServerResponse,
  next: (error?: Error) => void,
): void {
  if (req.method === 'GET') {
    // Get all users
    const data = JSON.stringify(getUsers());
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', Buffer.byteLength(data));
    res.write(data);
    res.end();
  } else if (req.method === 'POST') {
    // Validate and create a new user
    const user: User = new User((req as any).body);
    const msg: string | null = user.validate();
    if (msg) {
      next(new Error(msg));
      return;
    }
    if (userExists(user.email)) {
      next(new Error('User already exists'));
      return;
    }
    addUser(user);
    res.setHeader('Content-Length', 0);
    res.statusCode = 201;
    res.end();
  }
  next();
}

export default userHandler;
