# A Fullstack Ride Management System API (Backend)

## Project Overview

This is a robust and scalable backend API for a ride-booking service, similar to Uber or Pathao. Built using **Node.js**, **Express.js**, and **Mongoose**, the system manages three distinct user roles: **Rider**, **Driver**, and **Admin**. It features secure authentication, complete ride lifecycle management, and role-based access control.

---

## Live Deployment

- **Frontend:** https://ridaa.vercel.app
- **Backend:** https://ride-booking-system-backend-by-safi.vercel.app
- **Frontend Repository:** https://github.com/devsafix/ride-booking-system-client

## Key Features

- **Authentication & Authorization**

  - Secure JWT-based authentication
  - Password hashing using bcrypt
  - Role-based access control middleware

- **Ride Management**

  - Full ride lifecycle management with status transitions:
    - `requested → accepted → in_transit → completed`

- **Driver Logic**

  - Toggle availability status (Online/Offline)
  - Accept or reject ride requests
  - View earnings from completed rides

- **Rider Logic**

  - Request and cancel rides
  - View ride history

- **Admin Tools**

  - Manage all user accounts
  - Approve/Suspend drivers
  - Generate system-wide reports

- **Modular Architecture**

  - Well-structured codebase: `auth`, `user`, `driver`, `ride`, `admin`

- **Fare Calculation**
  - Logical fare based on real distance using the **Haversine Formula**

---

## Technology Stack

| Category        | Tech               |
| --------------- | ------------------ |
| Backend Runtime | Node.js            |
| Web Framework   | Express.js         |
| Database        | MongoDB + Mongoose |
| Authentication  | JWT + bcrypt.js    |
| Validation      | Zod                |

---

## Project Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/devsafix/ride-booking-system-backend
cd ride-booking-system-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=
DATABASE_URL=

FRONTEND_URL=http://localhost:5173

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES=

BCRYPT_SALT_ROUND=

ADMIN_EMAIL=
ADMIN_PASSWORD=
```

### 4. Run the Server

```bash
# For development
npm run dev

# For production
npm start
```

---

## API Endpoints Summary

> All endpoints are prefixed with `/api/v1`

---

### Authentication Endpoints (`/api/v1/auth`)

| Method | Endpoint  | Description             | Access |
| ------ | --------- | ----------------------- | ------ |
| POST   | /register | Register new user       | Public |
| POST   | /login    | Login and get JWT token | Public |

---

### Ride Endpoints (`/api/v1/rides`)

| Method | Endpoint     | Description                    | Access |
| ------ | ------------ | ------------------------------ | ------ |
| POST   | /request     | Request a new ride             | Rider  |
| PATCH  | /accept/\:id | Accept ride request            | Driver |
| PATCH  | /reject/\:id | Reject ride request            | Driver |
| PATCH  | /cancel/\:id | Cancel a ride                  | Rider  |
| PATCH  | /status/\:id | Update ride status             | Driver |
| GET    | /pending     | View all pending ride requests | Driver |
| GET    | /my          | View ride history              | Rider  |

---

### Driver Endpoints (`/api/v1/drivers`)

| Method | Endpoint      | Description                    | Access |
| ------ | ------------- | ------------------------------ | ------ |
| PATCH  | /availability | Set availability status        | Driver |
| GET    | /earnings     | View driver's earnings history | Driver |

---

### User Management Endpoints (`/api/v1/users`)

| Method | Endpoint      | Description            | Access |
| ------ | ------------- | ---------------------- | ------ |
| GET    | /all-users    | List all users         | Admin  |
| PATCH  | /block/\:id   | Block a user           | Admin  |
| PATCH  | /unblock/\:id | Unblock a user         | Admin  |
| PATCH  | /approve/\:id | Approve driver account | Admin  |
| PATCH  | /suspend/\:id | Suspend driver account | Admin  |

---

### Admin Report Endpoints (`/api/v1/admin`)

| Method | Endpoint       | Description                  | Access |
| ------ | -------------- | ---------------------------- | ------ |
| GET    | /reports/rides | Generate report of all rides | Admin  |

---

### Admin Report Endpoints (`/api/v1/feedbacks`)

| Method | Endpoint                     | Description                      | Access |
| ------ | ---------------------------- | -------------------------------- | ------ |
| POST   | /feedbacks/submit            | Submit feedback                  | Rider  |
| GET    | /feedbacks/driver/\:driverId | Get driver ratings and feedbacks | Rider  |

---

## Testing

- You can use tools like **Postman** or **Thunder Client** to test the endpoints.
- Make sure MongoDB is running locally or use a cloud service like MongoDB Atlas.

---

## Author

**Kawser Ferdous Safi** – [devsafix.vercel.app](https://devsafix.vercel.app)
