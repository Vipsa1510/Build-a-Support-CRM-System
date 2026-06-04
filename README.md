# Build-a-Support-CRM-System
# Support CRM System

## Overview

Support CRM System is a full-stack customer support ticket management application designed to help organizations manage customer issues efficiently. The system enables support teams to create, track, update, and manage customer support tickets through a simple and user-friendly interface.

## Features

* Create support tickets
* View all tickets
* Search tickets by keyword
* Filter tickets by status
* Update ticket status (Open, In Progress, Closed)
* View detailed ticket information
* Add activity notes and updates
* Responsive and modern user interface
* RESTful API architecture

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Pydantic
* Uvicorn

## Installation

### Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
# Windows
# venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## API Endpoints

### Tickets

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | /api/tickets      | Get all tickets      |
| POST   | /api/tickets      | Create a new ticket  |
| GET    | /api/tickets/{id} | Get ticket details   |
| PUT    | /api/tickets/{id} | Update ticket status |

### Notes

| Method | Endpoint                | Description      |
| ------ | ----------------------- | ---------------- |
| GET    | /api/tickets/{id}/notes | Get ticket notes |
| POST   | /api/tickets/{id}/notes | Add a note       |

## Challenges Faced

* Configuring and deploying the FastAPI backend
* Integrating frontend and backend APIs
* Managing CORS configuration for cross-origin requests
* Designing a responsive and user-friendly interface
* Implementing ticket activity tracking through notes and updates

## Conclusion

This project demonstrates the development of a complete support ticket management system using modern web technologies. It showcases full-stack development concepts, including frontend development, backend API design, database management, deployment, and efficient handling of customer support workflows through a scalable and maintainable architecture.
