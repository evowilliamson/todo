# Todo Application

Full-stack todo application with React frontend and Node.js backend.

## Quick Start

See [INSTALLATION.md](INSTALLATION.md) for detailed setup instructions.

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Installation

1. Setup database:
```bash
createdb todo_app
```

2. Backend:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run seed  # Optional: Add sample data
npm run dev
```

3. Frontend:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

4. Access the app at `http://localhost:5173`

Default login: `demo@example.com` / `Demo123!@#`

## Features

- User authentication
- Todo CRUD operations
- Categories and tags
- Filters and search
- Dark mode
- Analytics dashboard

For complete documentation, see [INSTALLATION.md](INSTALLATION.md)
