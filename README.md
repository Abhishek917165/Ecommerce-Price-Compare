# Ecommerce Price Compare

An interactive web application designed to help users search, view, and compare product prices across different simulated sources. It features a complete user authentication system, shopping cart management, product reviews, price comparison meters, and an administrative dashboard.

---

## Features

- **Product Price Comparison**: Real-time visualization of price differences using comparison meters.
- **User Authentication**: Secure signup, login, and role-based access control (User and Admin) powered by Spring Security.
- **Cart Management**: Add, remove, and update quantities of products in a user-specific shopping cart.
- **Product Reviews & Ratings**: Submit ratings and textual feedback for products.
- **Admin Dashboard**: Manage products, check system statistics, and configure database entries.
- **Database Seeding**: Built-in seeder that populates sample products and users upon initial startup.

---

## Tech Stack

- **Frontend**: React (Vite), Vanilla CSS for custom design system styling.
- **Backend**: Java, Spring Boot, Spring Security, Spring Data JPA.
- **Database**: H2 (In-memory, zero-configuration database active by default) / MySQL support available.
- **Build Tools**: Maven (Backend) & NPM (Frontend).

---

## How to Set Up and Run the Project

### Prerequisites
Make sure you have the following installed on your machine:
- Java JDK 17 or higher
- Node.js (v18 or higher) and npm
- Apache Maven

---

### Step 1: Clone the Repository
Open your terminal and run the following command to download the code:
```bash
git clone https://github.com/Abhishek917165/Ecommerce-Price-Compare.git
cd Ecommerce-Price-Compare
```

---

### Step 2: Running the Project

#### Option A: Quick Start (Windows)
Double-click the `run.bat` file in the root directory. This batch script automatically opens two terminal windows to launch both the backend and frontend servers simultaneously.

#### Option B: Manual Setup

1. **Start the Backend Server**:
   - Open a terminal and navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Run the Spring Boot application using Maven:
     ```bash
     mvn spring-boot:run
     ```
   - The backend server will start running on port `8080`.
   - Access the H2 Database Console at: `/h2-console` (Username: `sa`, Password: leave blank).

2. **Start the Frontend Server**:
   - Open another terminal and navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Install the project dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
   - The frontend application will start running and display its local address (usually port `5173`). Open this address in your web browser.
