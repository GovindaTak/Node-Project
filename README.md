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
    git clone https://github.com/GovindaTak/Node-Project.git
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
    npm run server
    ```

## Usage

1. Register a new user via the registration endpoint.
2. Verify the email using the link sent to the registered email address.
3. Login using the verified email and password.
4. Use the provided endpoints to upload documents, initiate chats, and query the AI model.

## API Endpoints

### Authentication
- `POST http://localhost:5000/api/v1/users` - Register a new user
- `POST http://localhost:5000/api/v1/users/1` - Login
- `GET http://localhost:5000/api/v1/forgetPassword?empId=1009&email=govindatak19@gmail.com` - Forgot password

### User
- `GET http://localhost:5000/api/v1/users/:id` - View profile
- `PUT http://localhost:5000/api/v1/users/:id` - Update profile
- `POST http://localhost:5000/api/v1/integration/upload-multiple` - Initiate new chat 
- `GET http://localhost:5000/api/v1/integration/chat_titles` - View chat list
- `GET http://localhost:5000/api/v1/integration/chat_history/666a99b08e4f1b886ecd9975 {:chatId}` - View specific chat history
- `DELETE http://loacalhost:5000/api/v1/integration/delete-chat/:chatId` - Delete specific chat
- `DELETE http://loacalhost:5000/api/v1/integration/chats/666be81b2cfafcebc5d38eb6/queries/666bf1fe2cfafcebc5d38ec2 {:chatId}` -delete perticular query from chat
- `POST http://loacalhost:5000/api/v1/intigration/query_handler` -ask query from ai-model

### Admin
- `GET http://localhost:5000/api/v1/users` - View all users
- `PUT http://localhost:5000/api/v1/users/:id` - Update specific user
- `GET http://localhost:5000/api/v1/integration/chat_titles/:user_id` - View chats of specific user
- `DELETE http://localhost:5000/api/v1/users/1009 {user_id}` - Deactivate specific user

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
│   ├── api
│   └── app.js
|   |---Dto
|   |---uploads
|   |---db
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
