![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red?style=for-the-badge)

<p align="center">
  <img src="./assets/banner2.png" alt="DevConnect Banner" width="420"/>
</p>

# 🌐 DevConnect – A Professional Networking Platform for Developers

**DevConnect** is a LinkedIn-inspired professional networking platform built **for developers**.  
It enables users to connect, share posts, showcase skills, and grow their professional presence in a clean, developer-centric environment.

Built with 💚 **Node.js + Express + MongoDB**, DevConnect focuses on scalability, security, and real-world backend architecture.

---

## 🚀 What DevConnect Can Do

- 🔐 Secure Authentication (JWT-based Login & Signup)
- 👤 Developer Profiles with Skills & Bio
- 📝 Create & Share Posts (Like LinkedIn feed)
- 🤝 Connect with Other Developers
- 💬 Comment & Interact on Posts
- 🛡️ Protected Routes & Middleware
- 🌐 REST APIs ready for any frontend (React / Next.js)

---

## 🛠️ Tech Stack

| Tool         | Purpose                          |
|--------------|----------------------------------|
| Node.js      | Backend JavaScript runtime       |
| Express.js   | API server framework              |
| MongoDB      | NoSQL database                    |
| Mongoose     | MongoDB object modeling           |
| JWT          | Authentication system             |
| bcryptjs     | Password hashing                  |
| dotenv       | Environment variable management   |
| CORS         | Cross-origin requests             |
| Nodemon      | Auto-reload during development    |

---

## 📁 Project Structure

```bash
DevConnect/
│
├── assets/                      # Project assets (banner, logos)
│   └── banner.png
│
├── config/                      # Configuration files
│   ├── dbConn.js
│   ├── corsOptions.js
│   └── allowedOrigins.js
│
├── controllers/                 # Business logic
│   ├── authController.js
│   ├── userController.js
│   └── postController.js
│
├── middleware/                  # Custom middleware
│   ├── verifyJWT.js
│   ├── errorHandler.js
│   └── logger.js
│
├── models/                      # MongoDB schemas
│   ├── User.js
│   └── Post.js
│
├── routes/                      # API routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── postRoutes.js
│
├── public/                      # Static assets
│
├── .env                         # Environment variables
├── package.json
├── package-lock.json
└── server.js                    # Entry point
````

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/DevConnect.git
cd DevConnect
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Start the server

```bash
npm run dev
```

Server will run at 👉 **`http://localhost:5000`**

---

## ✨ Core Features

* 🔐 Authentication & Authorization
* 👤 Developer profile management
* 📝 Create, edit & delete posts
* 👍 Like & comment system
* 🤝 Connect / disconnect users
* 🛡️ Role-based access protection
* 📦 Clean & scalable architecture

---

## 📡 API Endpoints Overview

### 🔐 Auth Routes (`/auth`)

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| POST   | `/register` | Register new user |
| POST   | `/login`    | User login        |

### 👤 User Routes (`/users`)

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | `/profile/:id` | Get user profile    |
| PATCH  | `/profile`     | Update user profile |
| POST   | `/connect/:id` | Connect with a user |

### 📝 Post Routes (`/posts`)

| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| GET    | `/`      | Get all posts (feed) |
| POST   | `/`      | Create a post        |
| PATCH  | `/:id`   | Update a post        |
| DELETE | `/:id`   | Delete a post        |

---

## 🚫 Important Notice

> This repository is **public only for portfolio and demonstration purposes**.
>
> **All Rights Reserved.**
> Unauthorized copying, redistribution, or commercial use of this project is strictly prohibited without explicit permission.

---

### 🛡️ Project by **Preetesh Sharma**

**DevConnect © All Rights Reserved**
