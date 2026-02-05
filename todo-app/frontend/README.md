# Todo App Frontend

Modern React frontend for the Todo Application.

## Features

- User authentication
- Todo management (create, read, update, delete)
- Categories and tags
- Advanced filtering and search
- Responsive design
- Dark mode ready
- Real-time updates
- Toast notifications

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **date-fns** - Date utilities
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update API URL in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

5. Open browser at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── layout/        # Layout components
│   ├── todos/         # Todo components
│   └── common/        # Shared components
├── pages/             # Page components
├── store/             # Zustand stores
├── services/          # API services
├── utils/             # Utility functions
├── styles/            # Global styles
├── App.jsx            # Root component
└── main.jsx           # Entry point
```

## State Management

The app uses Zustand for state management with two main stores:

- **authStore** - User authentication state
- **todoStore** - Todos and filters state

## Routing

- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Dashboard (protected)
- `/todos` - Todo list (protected)
- `/categories` - Categories (protected)
- `/settings` - Settings (protected)

## Styling

The app uses Tailwind CSS for styling with custom configuration:

- Responsive breakpoints (mobile, tablet, desktop)
- Custom color palette
- Dark mode support (ready)
- Utility classes

## API Integration

All API calls are made through Axios with automatic token handling.

Base URL is configured via environment variable `VITE_API_URL`.

## Building for Production

1. Build the app:
```bash
npm run build
```

2. Preview the build:
```bash
npm run preview
```

3. Deploy the `dist` folder to your hosting service.

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT
