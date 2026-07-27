@echo off
echo Starting Backend (Spring Boot)...
start cmd /k "cd backend && mvn spring-boot:run"

echo Starting Frontend (React Vite)...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting in new windows!
