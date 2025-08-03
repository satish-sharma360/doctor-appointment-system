# Doctor Appointment Booking System

This is a full-stack **MERN** (MongoDB, Express.js, React, Node.js) application for managing doctor booking appointments. The system allows users to find doctors, book appointments, and manage their schedules.

---

## Technology Stack

* **Frontend:** **React**
* **Backend:** **Node.js** with **Express.js**
* **Database:** **MongoDB**

---

## Features

* User authentication and authorization.
* Search and filter doctors by speciality.
* Book, reschedule, and cancel appointments.
* View doctor profiles with details like experience,speciality, and fees.
* Admin panel for managing doctors and appointments.

---

## Getting Started

Follow these steps to get the application up and running on your local machine.


### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/satish-sharma360/doctor-appointment-system](https://github.com/satish-sharma360/doctor-appointment-system)
    ```

2.  **Navigate to the project directory:**

    ```bash
    doctor-appointment-system
    ```

3.  **Install the dependencies for both frontend and backend:**

    ```bash
    # For the backend
    cd backend
    npm install

    # For the frontend
    cd ../frontend
    npm install

    # For the admin
    cd ../admin
    npm install
    ```

---

## Getting Started with Docker

Follow these steps to get the application up and running on your local machine using Docker.

### 1. Clone the Repository

Clone the project from its Git repository and navigate to the project directory:

```bash

git clone [https://github.com/satish-sharma360/doctor-appointment-system](https://github.com/satish-sharma360/doctor-appointment-system)

cd doctor-appointment-system

### Running the Application

1.  **Start the Backend Server:**
    From the `backend` directory, run:

    ```bash
    npm run server
    ```

2.  **Start the Frontend Application:**
    From the `frontend` directory, run:

    ```bash
    npm run dev
    ```
3. **Configure Environment Variables**
    Create your .env file as described above.
    
4. **Build and Run the Container**
    From this directory, run the docker-compose command. It will automatically build the image and start the service.

    ```bash
    docker-compose up --build
    ```
---
docker-compose up --build


## Acknowledgments






* **Express.js** - Web framework for Node.js
* **React** - JavaScript library for building user interfaces
* **Mongoose** - MongoDB object modeling tool