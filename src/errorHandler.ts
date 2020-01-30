import { IncomingMessage, ServerResponse } from 'http';

/**
 * Returns to the client any error that occured while handling the response.
 */
function errorHandler(
  err: Error,
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
): void {
  const data: string = JSON.stringify({ code: 400, message: err.message });
  res.statusCode = 400;
  res.statusMessage = err.message;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', Buffer.byteLength(data));
  res.write(data);
  res.end();
  next();
}

export default errorHandler;
