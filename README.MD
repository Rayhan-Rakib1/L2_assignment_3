# 📚 Library Management API

A RESTful API to manage books and borrowing transactions in a library system.  
Built with **Node.js**, **Express**, and **MongoDB** (Mongoose).

---

## 🚀 Project Overview

This API allows clients to:

- Create, retrieve, update, and delete book records  
- Borrow books with validation of available copies  
- Retrieve aggregated summaries of borrowed books

---

## 🛠️ Technologies & Dependencies

### Technologies Used

- **Node.js** - JavaScript runtime environment  
- **Express** - Web framework for building APIs  
- **MongoDB** - NoSQL database to store books and borrow records  
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB  
- **Dotenv** - Loads environment variables from `.env` file  
- **Nodemon** (dev dependency) - For automatic server reload during development

### Main Dependencies

| Package     | Purpose                                |
|-------------|---------------------------------------|
| `express`   | Web framework to handle routing       |
| `mongoose`  | MongoDB schema modeling and queries   |
| `dotenv`    | Environment variable management       |

### Dev Dependencies

| Package   | Purpose                              |
|-----------|-------------------------------------|
| `nodemon` | Auto restart server on file changes |

---

## ⚙️ Setup & Installation

### Prerequisites

- [Node.js v18+](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/try/download/community) (locally or cloud)

### Steps

1. Clone the repo:

```bash
git clone https://github.com/Rayhan-Rakib1/L2_assignment_3.git
cd library-management-api
