import User from './user';
import UserEvent from './userEvent';

// Object mapping emails to user objects
const users: { [email: string]: User } = {};
// Object mapping emails to user event objects
const events: { [email: string]: UserEvent[] } = {};

function userExists(email: string): boolean {
  return email in users;
}

function addUser(user: User): boolean {
  users[user.email] = user;
  return true;
}

function getUsers(): User[] {
  return Object.keys(users).map(email => users[email]);
}

function addEvent(event: UserEvent): boolean {
  if (!events[event.email]) {
    events[event.email] = [];
  }
  events[event.email].push(event);
  return true;
}

function flatten(arr: any[]): any[] {
  for (let i = 0; i < arr.length; ++i) {
    if (Array.isArray(arr[i])) arr.splice(i, 1, ...flatten(arr[i]));
  }
  return arr;
}

function getEvents({ email, since }: { email: string; since: Date }): UserEvent[] {
  let values: UserEvent[] = email
    ? events[email]
    : flatten(Object.keys(events).map(userEmail => events[userEmail]));
  if (since) {
    values = values.filter(value => value.created > since);
  }
  return values.sort((a, b) => {
    if (a.created > b.created) {
      return -1;
    } else if (a.created < b.created) {
      return 1;
    }
    return 0;
  });
}

export { users, events, userExists, addUser, getUsers, addEvent, getEvents };
