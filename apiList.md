# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // pending

## connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
<!-- or -->
- POST /request/send/:status/:userId


- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId
<!-- or -->
- POST /request/review/:status/:requestId

## connectionRequestRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed

Staues : accepted,rejected,ignored, interested
