
# Tip Calculator Project

A full-stack web application designed to calculate tip amounts, split bills among multiple people, and track calculation histories. This project features a modern and responsive user interface built with Angular and Tailwind CSS, backed by a high-performance FastAPI server and a PostgreSQL database.

## Live Demo

https://github.com/user-attachments/assets/33c2901e-fb33-4e3f-8cbf-5232e5a0f40c

## Tech Stack

### Frontend
- Angular
- TypeScript
- Tailwind CSS

### Backend
- FastAPI (Python)
- SQLAlchemy (ORM)
- Psycopg2
- PostgreSQL (Database)

## Project Structure

```text
tipCalculator/
├── backend/
│   ├── app.py             # Main FastAPI application and API routes
│   ├── create_db.py       # Script to initialize the PostgreSQL database
│   ├── database.py        # Database connection and session management
│   └── models.py          # SQLAlchemy data models
├── frontend/
│   ├── src/               # Angular source application code
│   ├── angular.json       # Angular CLI configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── package.json       # Frontend dependencies and scripts
└── README.md

```

## Features

* Dynamic Tip Calculation: Instantly calculate tips based on bill amounts and custom percentages.
* Bill Splitting: Divide the total amount evenly among a specified number of people.
* History Tracking: Save previous calculations automatically to a PostgreSQL database.
* Real-time History Feed: Fetch and display the list of recent calculations ordered by newest first.

## Getting Started

### Prerequisites

* Python 3.10 or higher
* Node.js (with npm)
* PostgreSQL database server running locally

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend

```


2. Install the required Python packages:
```bash
pip install fastapi uvicorn psycopg2 sqlalchemy pydantic

```


3. Configure your PostgreSQL database credentials inside `create_db.py` and `database.py` (e.g., username, password, host, port).
4. Initialize the database and create tables:
```bash
python create_db.py

```


5. Run the FastAPI development server:
```bash
uvicorn app:app --reload

```


The backend server will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend

```


2. Install the project dependencies:
```bash
npm install

```


3. Start the Angular development server:
```bash
npm start

```


Open your browser and navigate to `http://localhost:4200`.

## API Endpoints

The backend exposes the following REST API endpoints:

* `POST /api/calculations`
* Description: Saves a new bill, tip percentage, split count, and total calculation.
* Request Body: JSON object containing `bill_amount`, `tip_percentage`, and `number_of_people`.


* `GET /api/calculations`
* Description: Retrieves a list of all historical tip calculations sorted by creation date.



