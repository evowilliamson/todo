# Todo Application - Full Stack Implementation

A comprehensive task management application built with React, Node.js, Express, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features

### Core Features
- ✅ User authentication (register, login, logout, password reset)
- ✅ Todo CRUD operations (create, read, update, delete)
- ✅ Categories and tags organization
- ✅ Subtasks/checklist functionality
- ✅ Priority levels (Low, Medium, High, Urgent)
- ✅ Due dates and reminders
- ✅ Advanced filtering and sorting
- ✅ Search functionality
- ✅ Bulk operations
- ✅ Analytics dashboard
- ✅ Dark/Light theme
- ✅ Responsive design
- ✅ Export/Import (JSON, CSV, Markdown)

### Advanced Features
- ✅ Real-time notifications
- ✅ Productivity analytics
- ✅ Multiple view modes (List, Grid, Calendar)
- ✅ Keyboard shortcuts
- ✅ Drag-and-drop reordering
- ✅ Auto-save functionality
- ✅ Trash/Restore functionality

## Technology Stack

### Frontend
- **React 18+** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **React Router** - Navigation
- **date-fns** - Date utilities
- **React Hot Toast** - Notifications
- **Recharts** - Analytics charts
- **React Beautiful DnD** - Drag and drop

### Backend
- **Node.js 18+** - Runtime
- **Express.js** - Web framework
- **PostgreSQL 14+** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Joi** - Validation
- **Helmet** - Security headers
- **Morgan** - Logging
- **Nodemailer** - Email service

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager
- **Git** (optional, for cloning)

### Verify Installation

```bash
node --version  # Should be v18 or higher
npm --version   # Should be 9 or higher
psql --version  # Should be 14 or higher
```

## Installation

### 1. Clone or Extract the Project

If you have a zip file, extract it:
```bash
unzip todo-app.zip
cd todo-app
```

Or clone from repository:
```bash
git clone <repository-url>
cd todo-app
```

### 2. Database Setup

#### Create PostgreSQL Database

**Option A: Using psql command line**

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE todo_app;

# Create user (optional, if not using default postgres user)
CREATE USER todo_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE todo_app TO todo_user;

# Exit psql
\q
```

**Option B: Using pgAdmin**

1. Open pgAdmin
2. Right-click on "Databases" → "Create" → "Database"
3. Name: `todo_app`
4. Click "Save"

#### Verify Database Connection

```bash
psql -U postgres -d todo_app -c "SELECT version();"
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
# Use your favorite text editor (nano, vim, or code)
nano .env
```

**Important: Update the `.env` file with your database credentials:**

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_app
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your-secret-key-change-this
```

#### Run Database Migrations

```bash
# Create all database tables
npm run migrate
```

#### (Optional) Seed Sample Data

```bash
# Add sample todos, categories, and tags for testing
npm run seed
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env if needed (default should work)
nano .env
```

## Environment Setup

### Backend Environment Variables (.env)

```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_app
DB_USER=postgres
DB_PASSWORD=your_password_here

# JWT Configuration
JWT_SECRET=generate-a-strong-secret-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=generate-another-strong-secret-key
JWT_REFRESH_EXPIRES_IN=30d

# Email Configuration (Optional - for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@todoapp.com
```

**Generate Strong JWT Secrets:**
```bash
# Run this in terminal to generate random secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Frontend Environment Variables (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

You'll need **two terminal windows** - one for backend, one for frontend.

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
Database connected successfully
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

### Default Test Account (if you ran seed)

```
Email: demo@example.com
Password: Demo123!@#
```

## Production Build

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend

# Build for production
npm run build

# Preview production build
npm run preview

# Serve with a static server (e.g., serve)
npx serve -s dist
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/logout` | Logout user |
| POST | `/auth/refresh` | Refresh JWT token |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password |

### Todo Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos (with filters) |
| GET | `/todos/:id` | Get single todo |
| POST | `/todos` | Create new todo |
| PUT | `/todos/:id` | Update todo |
| PATCH | `/todos/:id/status` | Update todo status |
| DELETE | `/todos/:id` | Soft delete todo |
| POST | `/todos/bulk` | Bulk operations |
| GET | `/todos/trash` | Get deleted todos |
| POST | `/todos/:id/restore` | Restore deleted todo |

### Categories, Tags, Analytics Endpoints

See full API documentation at: `http://localhost:5000/api-docs` (when running)

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

## Troubleshooting

### Common Issues

**1. Database Connection Error**

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
- Ensure PostgreSQL is running: `sudo service postgresql start` (Linux) or check PostgreSQL app (Mac/Windows)
- Verify credentials in `.env` file
- Check if database exists: `psql -U postgres -l`

**2. Port Already in Use**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
- Kill the process using the port:
  ```bash
  # Find process
  lsof -i :5000
  # Kill it
  kill -9 <PID>
  ```
- Or change the PORT in `.env` file

**3. Module Not Found**

```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**4. Migration Errors**

```
Error: relation "users" already exists
```

**Solution:**
```bash
# Drop all tables and re-migrate
psql -U postgres -d todo_app -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
npm run migrate
```

**5. Frontend Build Errors**

```
Error: Failed to resolve import
```

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json .vite
npm install
npm run dev
```

### Database Reset

If you need to completely reset the database:

```bash
# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS todo_app;"
psql -U postgres -c "CREATE DATABASE todo_app;"

# Run migrations again
cd backend
npm run migrate
npm run seed  # Optional: add sample data
```

## Deployment

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI and login
heroku login

# Create app
heroku create your-todo-app-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Run migrations
heroku run npm run migrate
```

### Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-todo-app-api.herokuapp.com/api
```

### Environment-Specific Deployments

- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Heroku, Railway, Render, DigitalOcean, AWS EC2
- **Database**: Heroku Postgres, Railway, AWS RDS, DigitalOcean

## Project Structure

```
todo-app/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   ├── validators/     # Input validation
│   │   └── server.js       # Entry point
│   ├── tests/              # Test files
│   ├── .env.example        # Environment template
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── store/          # State management
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # Global styles
│   │   ├── App.jsx         # Root component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   ├── .env.example        # Environment template
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── INSTALLATION.md         # This file
├── REQUIREMENTS.md         # Project requirements
└── README.md               # Project overview
```

## Performance Optimization

### Backend
- Database indexing on frequently queried fields
- Connection pooling (configured in Sequelize)
- Response compression
- Rate limiting to prevent abuse
- Query optimization with proper includes

### Frontend
- Code splitting with React.lazy
- Image optimization
- Lazy loading for heavy components
- Debounced search and autosave
- Memoization with useMemo and useCallback

## Security Features

- ✅ Password hashing with bcrypt (cost factor 10)
- ✅ JWT authentication
- ✅ HTTP-only cookies option
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ Rate limiting on authentication endpoints
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (ORM)
- ✅ XSS protection

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or contributions:
- Create an issue on GitHub
- Email: support@todoapp.com
- Documentation: https://docs.todoapp.com

## Acknowledgments

- React team for the amazing framework
- PostgreSQL community
- All contributors and testers

---

**Happy Task Managing! 🚀**
