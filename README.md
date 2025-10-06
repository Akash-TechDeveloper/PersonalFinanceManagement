<div align="center">
  <h1 style="font-size: 48px; font-weight: bold;">Personal Finance Management System</h1>
</div>

<div align="center">
  <img src="./Personal%20Finance%20Management/Frontend/7.png" alt="Dashboard screenshot" width="420">
</div>

**A full‑stack Personal Finance Management System (Spring Boot + React/Vite)** — track income & expenses, manage bills & goals, visualize monthly trends, and keep your finances organized.

---

## Table of Contents

* [Overview](#overview)
* [Motivation & Background](#motivation--background)
* [Screenshots (supportable images)](#screenshots-supportable-images)
* [Features](#features)
* [Architecture & Code Structure](#architecture--code-structure)
* [Getting started (detailed)](#getting-started-detailed)

  * [Prerequisites](#prerequisites)
  * [Environment variables](#environment-variables)
  * [Run Backend (Spring Boot)](#run-backend-spring-boot)
  * [Run Frontend (React / Vite)](#run-frontend-react--vite)
  * [Run everything with Docker (recommended for demos)](#run-everything-with-docker-recommended-for-demos)
* [API Endpoints (quick reference)](#api-endpoints-quick-reference)
* [Deploying / Making the repo link "runnable" from GitHub](#deploying--making-the-repo-link-runnable-from-github)
* [Testing & Evaluation](#testing--evaluation)
* [Troubleshooting & Tips](#troubleshooting--tips)
* [Contributing](#contributing)
* [License & Author](#license--author)
* [References & Resources](#references--resources)

---

## Overview

This repository contains a production‑oriented **Personal Finance Management System** split into two main parts:

* **Backend (Spring Boot)** — located at `Personal Finance Management/Backend/PersonalFinanceManagementSystem/`.

  * Java 21, Spring Boot 3.x, Spring Data JPA, JWT authentication, MySQL persistence.
* **Frontend (React / Vite)** — located at `Personal Finance Management/Frontend/cashtrack/`.

  * React + Vite for a fast developer experience, responsive UI, and easy build pipeline.

The project is structured so you can run the backend and frontend independently (local dev) or together (Docker / docker‑compose).

---

## Motivation & Background

Managing personal finances is an essential life skill. This project was created to help users:

* Record and categorize transactions (income / expense).
* Track bills and recurring payments.
* Set and monitor savings goals.
* Visualize spending patterns and monthly summaries.

The system is designed for students and early professionals who need a lightweight, friendly, and secure tool to become financially aware.

---

## Screenshots (supportable images)

These image paths are taken directly from the repository and should render correctly on GitHub if this README is placed at the repo root.

* Dashboard / Landing (screenshot):

  ![Dashboard](./Personal%20Finance%20Management/Frontend/7.png)

* App background / hero:

  ![Background](./Personal%20Finance%20Management/Frontend/cashtrack/src/image/Background.jpg)

* Expense / Transaction visual (money icon used in UI):

  ![Money Icon](./Personal%20Finance%20Management/Frontend/cashtrack/src/image/money.png)

* Goals visual (target icon used in UI):

  ![Goals Icon](./Personal%20Finance%20Management/Frontend/cashtrack/src/image/target.png)


## Features

* User authentication (Signup / Login) — JWT based.
* CRUD for Transactions (income / expense / category / date).
* Bill tracking (set bills, mark paid, recurring schedule).
* Savings Goals (create goals, track progress).
* Dashboard with balance, recent transactions and quick actions.
* Simple analytics (monthly summary, category breakdown).
* Responsive frontend with modern UI components.

---

## Architecture & Code Structure

```
PersonalFinanceManagement/
├── Personal Finance Management/Backend/PersonalFinanceManagementSystem/  # Spring Boot app
│   ├── src/main/java/.../controller  # REST controllers
│   ├── src/main/java/.../service     # business logic
│   ├── src/main/java/.../repository  # JPA repos
│   └── src/main/resources/
│       └── application.properties    # DB + JWT configs
│
├── Personal Finance Management/Frontend/cashtrack/  # React (Vite) frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

**Design decisions:**

* Backend exposes versioned REST endpoints (`/api/v1/...`) so future UIs (mobile, web) can reuse them.
* JWT + role support to allow adding role‑based features later (admin, premium, etc.).
* The frontend is split so it can be deployed separately on static hosts (Vercel) while the backend can run on Render/Heroku/Cloud Run.

---

## Getting started (detailed)

### Prerequisites

* Git
* Java 21 JDK (or compatible OpenJDK 21)
* Maven 3.8+
* Node.js 18+ and npm or pnpm
* MySQL 8 (or compatible) — or you can use Docker (recommended)

### Environment variables

Create a `.env` (or set system env vars) for both backend and frontend.

**Backend** (Spring Boot `application.properties` or environment):

```
SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/finance_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_db_password
SPRING_JPA_HIBERNATE_DDL_AUTO=update
JWT_SECRET=replace_with_a_secure_random_string
SERVER_PORT=8080
```

**Frontend** (Vite / React environment variables):

```
VITE_API_BASE_URL=http://localhost:8080/api
```

> Note: Vite requires client env vars to be prefixed with `VITE_`.

---

### Run Backend (Spring Boot)

From the backend folder:

```bash
cd "Personal Finance Management/Backend/PersonalFinanceManagementSystem"
# (1) Build
mvn clean package -DskipTests
# (2) Run
mvn spring-boot:run
# or run the jar
java -jar target/PersonalFinanceManagementSystem-0.0.1-SNAPSHOT.jar
```

The backend will run on `http://localhost:8080` by default.

**Database setup**

* Create a database `finance_db` in MySQL, or let Spring create it if `spring.jpa.hibernate.ddl-auto=update` is set.
* If using `data.sql` seeding, ensure `spring.datasource.initialization-mode=always` or run the script manually.

---

### Run Frontend (React / Vite)

From the frontend folder:

```bash
cd "Personal Finance Management/Frontend/cashtrack"
npm install
npm run dev
```

This typically starts the dev server on `http://localhost:5173` (Vite default). The frontend expects the backend API at the URL set in `VITE_API_BASE_URL`.

**Build for production**

```bash
npm run build
# you can preview
npm run serve
```

---

### Run everything with Docker (recommended for demos)

Below is a simple **example** `docker-compose.yml` you can add at repo root to run backend + frontend + MySQL. Edit volumes, passwords, and image names as needed.

```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: example_password
      MYSQL_DATABASE: finance_db
    ports:
      - '3306:3306'
    volumes:
      - db_data:/var/lib/mysql

  backend:
    build:
      context: "./Personal Finance Management/Backend/PersonalFinanceManagementSystem"
      dockerfile: Dockerfile
    depends_on:
      - db
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/finance_db
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: example_password
      JWT_SECRET: supersecretkey
    ports:
      - '8080:8080'

  frontend:
    image: node:18-alpine
    working_dir: /app
    volumes:
      - ./Personal Finance Management/Frontend/cashtrack:/app
    command: sh -c "npm install && npm run build && npm run serve"
    ports:
      - '5173:5173'
    depends_on:
      - backend

volumes:
  db_data:
```

**Backend Dockerfile (example)** — place at `Personal Finance Management/Backend/PersonalFinanceManagementSystem/Dockerfile`:

```dockerfile
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw dependency:go-offline -B
COPY src src
RUN ./mvnw -DskipTests package -Pnative -Dquarkus.package.type=uber-jar || ./mvnw -DskipTests package
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

> This Dockerfile uses Maven wrapper and a standard Java base image. Adjust according to your project artifact name.

---

## API Endpoints (quick reference)

> These are examples — check your actual controller paths in `src/main/java` for exact routes.

* `POST /api/auth/signup` — Register a new user
* `POST /api/auth/login` — Login, returns JWT
* `GET /api/transactions` — Get all transactions (auth required)
* `POST /api/transactions` — Create a transaction
* `GET /api/bills` — List bills
* `POST /api/goals` — Create a savings goal
* `GET /api/dashboard` — Summary (balance, recent txns, goal progress)

Include a Postman collection in `/docs` or export it and add a link to `docs/Postman_collection.json`.

---

## Deploying / Making the repo link "runnable" from GitHub

You can expose a live link in the repository `About` section (top-right of the repo page) and in the README.


```markdown
[![Deploy Frontend on Vercel](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://vercel.com/new)
[![Deploy Backend on Render](https://img.shields.io/badge/deploy-render-00b7ff?logo=render)](https://render.com)

Live demo: https://your-frontend-url.vercel.app
API base: https://your-backend.onrender.com/api
```

**Automated GitHub Actions (optional)**

* You can add a workflow that builds the frontend and deploys to Vercel using Vercel CLI, or pushes the backend jar to Heroku using `akhileshns/heroku-deploy` action. Keep secrets (API keys) in repo Settings -> Secrets.

---

## Testing & Evaluation

* Backend unit tests should live under `src/test/java` and be run with `mvn test`.
* Use Postman or REST client to smoke test endpoints.
* For frontend end‑to‑end tests, add Playwright or Cypress if desired.

---

## Troubleshooting & Tips

* **403 / CORS errors**: Ensure backend includes CORS config to allow your frontend origin during dev.
* **DB connection refused**: Verify MySQL is running and the connection string is correct.
* **Ports in use**: If `8080` or `5173` are busy, change `SERVER_PORT` or Vite dev port (in `vite.config.js`).
* **Images not showing in README**: Make sure paths are exact and percent‑encode spaces (`%20`) if folders include spaces.

---

## Contributing

Contributions are welcome. Suggested process:

1. Fork the repo.
2. Create a feature branch: `git checkout -b feat/<short-desc>`
3. Commit with descriptive messages.
4. Open a pull request describing the change and any migrations or environment changes required.

Please keep secrets out of commits — use environment variables and add them to `.gitignore`.

---

## License & Author

**License:** MIT (see `LICENSE`)

**Author:** Akash (`Akash-TechDeveloper`) — [https://github.com/Akash-TechDeveloper](https://github.com/Akash-TechDeveloper)

Contact: [akash-techdeveloper@example.com](mailto:akash-techdeveloper@example.com)

---

## References & Resources

* Spring Boot: [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
* Vite: [https://vitejs.dev/](https://vitejs.dev/)
* MySQL: [https://dev.mysql.com/](https://dev.mysql.com/)
* Vercel: [https://vercel.com/](https://vercel.com/)
* Render: [https://render.com/](https://render.com/)

---

*Last updated: generated README - verify image paths in your repo and, if you prefer, move frontend files to a path without spaces (recommended) to make image linking simpler.*
