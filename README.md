# VIDTUBE Backend

A scalable backend project inspired by YouTube, built using Node.js, Express.js, MongoDB, and Mongoose. This project provides APIs for user authentication, video management, subscriptions, comments, likes, playlists, tweets, and more.

## Features

* User Authentication (JWT + Refresh Tokens)
* User Registration & Login
* Secure Password Hashing with bcrypt
* Video Upload & Management
* Cloudinary Integration
* Comments System
* Likes System
* Playlists
* Subscriptions
* Tweets
* Cookie-based Authentication
* MongoDB Aggregation Pipelines
* Pagination Support
* RESTful API Architecture

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cloudinary
* Multer
* Cookie Parser
* bcrypt

## Project Structure

```text
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── db/
├── constants/
├── app.js
└── index.js
```



### Install Dependencies

```bash
npm install
```


## Running the Project

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

## API Modules

### User

* Register User
* Login User
* Logout User
* Refresh Access Token
* Update Profile
* Change Password

### Video

* Upload Video
* Update Video
* Delete Video
* Publish/Unpublish Video
* Get Video Details

### Comment

* Add Comment
* Update Comment
* Delete Comment
* Get Video Comments

### Playlist

* Create Playlist
* Update Playlist
* Delete Playlist
* Add Video to Playlist

### Subscription

* Subscribe Channel
* Unsubscribe Channel
* Get Subscriber List

### Like

* Like Video
* Unlike Video
* Like Comment

### Tweet

* Create Tweet
* Update Tweet
* Delete Tweet

## Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cloudinary": "^2.10.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.6.3",
  "mongoose-aggregate-paginate-v2": "^1.1.4",
  "mongoose-paginate-v2": "^1.9.4",
  "multer": "^2.1.1"
}

```
## GitHub Repository

🔗 Repository: https://github.com/rkumardubey17-maker/VidoY-main

## Note

The project was recently redeployed and the current live URL is:

https://vido-y-main-8i72.vercel.app

If any older URL is referenced elsewhere, please use the live URL above.

## Author

**Ram Kumar Dubey**

B.Tech CSE, NIT Agartala

## License

ISC License
