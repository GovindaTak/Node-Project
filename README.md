# ai-node

# AI-Node Project

Welcome to the AI-Node Project! This repository contains the source code for a ChatGPT-like demo web application developed by Atmecs Global Technology. This application allows employees to upload office-related documents and query them to get relevant results. The backend is built using Node.js and Express.js, integrating various utilities and services.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Project Structure](#project-structure)
7. [Contributing](#contributing)
8. [License](#license)

## Features

### General Features
- Image handling
- Large file handling
- Integration with Cloudinary for file storage
- MongoDB Atlas for database (collections: users, files, chats)
- JWT authentication and authorization
- Two user roles: User and Admin
- Integration with a third-party AI model
- Smooth error handling
- Data Transfer Objects (DTOs)
- Async handler
- Pagination and sorting
- Consistent API response format
- Email verification
- Default password sent to user's email
- Extensive validation (DTOs and Mongoose models using regex, etc.)

### User Functionalities
- Register
- Email verification
- Login (email verification required)
- View profile
- Update profile
- Initiate new chat
- Upload documents for AI model
- Ask queries
- View chat list
- View specific chat history
- Delete specific query or chat
- Forgot password

### Admin Functionalities
- Login
- View profile
- Update profile
- All user functionalities
- View all users
- Update specific user
- View chats of specific user
- Deactivate specific user
- View list of deactivated users

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Cloudinary
- JWT
- Third-party AI model

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/ai-node-project.git
    cd ai-node-project
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the necessary environment variables as shown in `.env.example`.

4. Start the server:
    ```sh
    npm start
    ```

## Usage

1. Register a new user via the registration endpoint.
2. Verify the email using the link sent to the registered email address.
3. Login using the verified email and password.
4. Use the provided endpoints to upload documents, initiate chats, and query the AI model.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### User
- `GET /api/users/profile` - View profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/chats` - Initiate new chat
- `GET /api/users/chats` - View chat list
- `GET /api/users/chats/:id` - View specific chat history
- `DELETE /api/users/chats/:id` - Delete specific chat

### Admin
- `GET /api/admin/users` - View all users
- `PUT /api/admin/users/:id` - Update specific user
- `GET /api/admin/users/:id/chats` - View chats of specific user
- `PUT /api/admin/users/:id/deactivate` - Deactivate specific user
- `GET /api/admin/users/deactivated` - View list of deactivated users

## Project Structure

```
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── validation
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
