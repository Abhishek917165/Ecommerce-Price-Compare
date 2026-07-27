# Ecommerce Price Compare 🛍️🔍

A modern, full-stack price comparison web application that empowers users to analyze and find the best deals on electronic gadgets (mobiles, laptops, headphones, watches) and shoes across multiple channels. It compares online prices from platforms like **Amazon** and **Flipkart** directly against **local offline stores**, highlighting the maximum savings and recommending the best channel to purchase.

---

## ✨ Key Features

* **Multi-Platform Comparison**: Compare real-time prices between major online platforms (Amazon, Flipkart) and physical offline shops (e.g., Croma, Reliance Digital).
* **Price Compare Meter**: A visual gauge displaying relative price differences across all compared channels.
* **Savings Analysis**: Automatically calculates the exact savings percentage and total money saved, recommending the cheapest seller.
* **User Review & Rating System**: Add ratings and read feedback from other bargain hunters.
* **Admin Dashboard**: Specialized roles to add and modify products, update online/offline prices, and coordinate local store details.
* **User Authentication**: Secure Login & Sign-up features using Spring Security with default seeded roles.
* **Modern Premium UI**: Built with a sleek glassmorphic design, smooth micro-animations, and curated harmonious palettes.

---

## 🛠️ Technology Stack

### Backend
* **Language & Framework**: Java 17 + Spring Boot 3
* **Security**: Spring Security (Role-based Authorization: `USER` & `ADMIN`)
* **ORM / Database**: Spring Data JPA with H2 (in-memory database for zero configuration) & MySQL support
* **Build Tool**: Maven

### Frontend
* **Core Library & Build Tool**: React.js + Vite
* **Styles**: Modern Custom CSS (Variables, Glassmorphism, CSS Transitions)
* **Icons**: Inline SVGs

---

## 📁 Directory Structure

```text
miniprojectfinal/
│
├── backend/                   # Spring Boot application
│   ├── src/main/java/...      # Java source files (controllers, services, entities, seeders)
│   ├── src/main/resources/    # Configuration files (application.properties, etc.)
│   └── pom.xml                # Maven dependencies
│
├── frontend/                  # React + Vite application
│   ├── src/                   # React source files (components, pages, services)
│   ├── package.json           # Node.js dependencies
│   └── vite.config.js         # Vite configuration
│
├── run.bat                    # One-click startup script for Windows
└── README.md                  # Project documentation (this file)
```

---

## 🚀 Quick Start (Windows)

The project includes a startup batch script (`run.bat`) to launch both servers simultaneously in separate terminal windows.

1. Ensure you have **Java 17+ (JDK)**, **Maven**, and **Node.js** installed on your system.
2. Double-click the `run.bat` file in the root directory, or run it via PowerShell/CMD:
   ```powershell
   ./run.bat
   ```
3. Once running:
   * **Backend API**: Running at [http://localhost:8080](http://localhost:8080)
   * **Frontend UI**: Running at [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Manual Setup & Running

If you prefer to start the servers manually, follow these commands:

### 1. Backend (Spring Boot)
Open a terminal in the `backend/` directory:
```bash
cd backend
mvn spring-boot:run
```
* **Database Console**: Accessible at [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:mem:compare_db`, Username: `sa`, Password: *blank*).
* **Switching to MySQL**: To use MySQL instead of H2, uncomment the MySQL section in [backend/src/main/resources/application.properties](file:///c:/Users/abhis/OneDrive/Desktop/miniprojectfinal/backend/src/main/resources/application.properties) and update your database credentials.

### 2. Frontend (React + Vite)
Open a terminal in the `frontend/` directory:
```bash
cd frontend
npm install
npm run dev
```

---

## 👤 Seeded User Accounts

The database comes pre-seeded with sample users for testing authentication and roles:

| Username | Password | Role | Email |
| :--- | :--- | :--- | :--- |
| `admin` | `admin123` | **ADMIN** | `admin@compare.com` |
| `user1` | `user123` | **USER** | `user1@compare.com` |
| `user2` | `user223` | **USER** | `user2@compare.com` |

---

## 📝 License

This project is open-source and available under the MIT License.
