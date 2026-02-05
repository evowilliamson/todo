# Todo App Backend

Backend API for the Todo Application built with Node.js, Express, and PostgreSQL.

## Features

- User authentication with JWT
- Todo CRUD operations
- Categories and tags management
- Advanced filtering and sorting
- Soft delete with trash
- Bulk operations
- Secure password hashing
- Rate limiting
- Input validation

## Tech Stack

- **Node.js** 18+
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Joi** - Validation

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_app
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

4. Create database:
```bash
createdb todo_app
```

5. Run migrations:
```bash
npm run migrate
```

6. (Optional) Seed sample data:
```bash
npm run seed
```

7. Start server:
```bash
# Development
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update profile
- `PUT /api/auth/me/password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Todos
- `GET /api/todos` - Get all todos (supports filters, search, sort)
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `PATCH /api/todos/:id/status` - Update status
- `DELETE /api/todos/:id` - Soft delete
- `POST /api/todos/:id/restore` - Restore from trash
- `DELETE /api/todos/:id/permanent` - Permanently delete
- `POST /api/todos/bulk` - Bulk operations
- `GET /api/todos/trash` - Get deleted todos

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `GET /api/categories/:id/todos` - Get category todos

## Environment Variables

See `.env.example` for all available environment variables.

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed sample data
- `npm test` - Run tests
- `npm run lint` - Lint code

## Database Schema

The application uses 9 tables:
- users
- todos
- categories
- tags
- todo_tags (junction table)
- subtasks
- reminders
- notifications
- password_resets

See `src/models/` directory for detailed schema.

## Security Features

- Password hashing with bcrypt (cost factor 10)
- JWT authentication
- Rate limiting
- Helmet.js security headers
- CORS configuration
- Input validation
- SQL injection prevention (via Sequelize ORM)

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": ["Optional details array"]
}
```

HTTP status codes:
- 200 - Success
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 404 - Not Found
- 409 - Conflict
- 500 - Server Error

## Testing

Run tests with:
```bash
npm test
```

## License

MIT
