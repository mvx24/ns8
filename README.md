## Running the server

`yarn start`

## Docker Build and Running

`docker build -t ts8-tech-assessment .`

`docker run --rm -p 8000:8000 ts8-tech-assessment`

## Endpoints

- `/users` - GET or users or POST to create a new user
- `/events` - GET events with `email=<email>` or `since=<ISO8601>` filter params or POST to create a new event

## Example Requests

### Get all users

`curl "http://localhost:8000/users"`

### Create a new user

`curl -d '{"email":"bob@bob.com", "password": "dgsdf23", "phoneNumber": "938-122-7445"}' -H 'Content-Type: application/json' "http://localhost:8000/users"`

### Get all events

`curl "http://localhost:8000/events"`

### Get all events for a user

`curl "http://localhost:8000/events?email=lisa111@gmail.com"`

### Get all events since a timestamp

`curl "http://localhost:8000/events?since=2020-01-29T00:00:00.000Z"`

### Create a new event

`curl -d '{"email":"lisa111@gmail.com", "type": "click"}' -H 'Content-Type: application/json' "http://localhost:8000/events"`

## Assumptions and Todos

- Make use of proper session with JWT
- Secure connections with HTTPS
- Additional sorting and paging of events endpoint
- Better error handling and field validation
- Use an actual real database with data persistance
- Password hashing and other security measures, such as csrf tokens
- Use UUIDs for better ids
- Locking down endpoints so only users can create events associated with themselves
- Adding jsdocs and comments
- Some fields like password shouldn't be returned through the API
- Automated test cases
- POSTs and PUTs should include the object affected
