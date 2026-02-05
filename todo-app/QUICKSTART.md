# Quick Start Guide - Todo App

Get the app running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Terminal/Command prompt

## Setup Steps

### 1. Extract the Project

```bash
unzip todo-app-complete.zip
cd todo-app
```

### 2. Database Setup

```bash
# Login to PostgreSQL (adjust username as needed)
psql -U postgres

# In PostgreSQL prompt:
CREATE DATABASE todo_app;
\q
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies (takes 1-2 minutes)
npm install

# Create .env file
cp .env.example .env

# Edit .env file - UPDATE these lines:
# DB_PASSWORD=your_postgres_password
# JWT_SECRET=any-random-long-string-here

# Run migrations
npm run migrate

# (Optional) Add sample data
npm run seed

# Start backend
npm run dev
```

✅ Backend should now be running on http://localhost:5000

### 4. Frontend Setup (New Terminal)

```bash
# Open a NEW terminal window
cd todo-app/frontend

# Install dependencies (takes 1-2 minutes)
npm install

# Create .env file  
cp .env.example .env

# Start frontend
npm run dev
```

✅ Frontend should now be running on http://localhost:5173

### 5. Access the App

Open your browser and go to: **http://localhost:5173**

**Demo Login:**
- Email: `demo@example.com`
- Password: `Demo123!@#`

Or create a new account!

## Common Issues

### Database Connection Error

**Error:** `connect ECONNREFUSED`

**Fix:**
1. Make sure PostgreSQL is running:
   - Mac: Check PostgreSQL app
   - Linux: `sudo service postgresql start`
   - Windows: Check Services for PostgreSQL
2. Verify credentials in `backend/.env`

### Port Already in Use

**Error:** `address already in use :5000`

**Fix:**
```bash
# Find and kill the process
lsof -i :5000
kill -9 <PID>
```

Or change `PORT=5001` in `backend/.env`

### Module Not Found

**Error:** `Cannot find module`

**Fix:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

## File Structure

```
todo-app/
├── backend/               # Node.js API
│   ├── src/
│   │   ├── models/       # Database models
│   │   ├── controllers/  # Route handlers
│   │   ├── routes/       # API routes
│   │   └── server.js     # Entry point
│   ├── .env.example      # Environment template
│   └── package.json
│
├── frontend/             # React app
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── store/        # State management
│   │   └── App.jsx       # Root component
│   ├── .env.example      # Environment template
│   └── package.json
│
├── INSTALLATION.md       # Detailed setup guide
└── README.md            # Project overview
```

## Next Steps

1. ✅ Create your first todo
2. ✅ Add categories to organize tasks
3. ✅ Use filters to find tasks
4. ✅ Check out the dashboard analytics

For detailed documentation, see `INSTALLATION.md`

## Need Help?

- Check `INSTALLATION.md` for detailed troubleshooting
- Review backend API docs in `backend/README.md`
- Review frontend docs in `frontend/README.md`

---

**Happy Task Managing! 🚀**
