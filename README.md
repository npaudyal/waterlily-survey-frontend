# Health Survey App - Frontend

A modern React/Next.js frontend application for the Health Survey platform, featuring beautiful UI design, real-time data fetching, and seamless authentication.

🚀 **Live Demo**: [https://charming-crisp-1f492e.netlify.app/](https://charming-crisp-1f492e.netlify.app/)

## ✨ Features

- **Modern UI**: Beautiful gradient designs with glassmorphism effects
- **Authentication**: Secure JWT-based authentication with persistent sessions
- **Survey Management**: Interactive multi-section survey forms with validation
- **Real-time Data**: React Query for efficient data fetching and caching
- **Responsive Design**: Mobile-first design that works on all devices
- **Type Safety**: Full TypeScript implementation with strict typing
- **Performance**: Optimized with Next.js App Router and client-side rendering

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Authentication**: Context API with JWT tokens
- **Icons**: Heroicons
- **Deployment**: Netlify, Render, Neon

## 📋 Prerequisites

- Node.js (v18+ recommended)
- npm or yarn package manager
- Backend API running (see [backend README](../backend/README.md))

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd waterlily-survey-app/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# API URL - Backend server URL
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# For production deployment:
# NEXT_PUBLIC_API_URL="https://your-backend-url.com/api"
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
The app will start on `http://localhost:3001` with hot-reloading enabled.

### Production Build
```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Linting & Type Checking
```bash
# Run ESLint
npm run lint

# Type check with TypeScript
npm run type-check
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages group
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── (authenticated)/   # Protected pages group
│   │   │   ├── dashboard/     # User dashboard
│   │   │   ├── survey/        # Survey form page
│   │   │   └── submission/    # Submission details
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx          # Landing page
│   │   └── middleware.ts      # Auth middleware
│   ├── components/            # Reusable components
│   │   ├── forms/            # Form components
│   │   │   ├── survey-form.tsx
│   │   │   ├── survey-section.tsx
│   │   │   ├── survey-question.tsx
│   │   │   └── submission-details.tsx
│   │   ├── providers/        # Context providers
│   │   │   └── query-provider.tsx
│   │   └── ui/              # UI components
│   │       ├── loading.tsx   # Loading states
│   │       └── password-requirements.tsx
│   ├── contexts/            # React contexts
│   │   └── auth-context.tsx # Authentication context
│   ├── lib/                # Utility functions
│   │   ├── auth.ts         # Auth utilities
│   │   └── survey-actions.ts # Survey API calls
│   ├── types/              # TypeScript types
│   │   └── survey.ts       # Survey type definitions
│   └── middleware.ts       # Next.js middleware
├── public/                 # Static assets
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Design Features

### Visual Design
- **Gradient Backgrounds**: Beautiful blue-to-cyan gradients throughout
- **Glassmorphism**: Translucent components with backdrop blur effects
- **Smooth Animations**: Hover effects and transitions for better UX
- **Responsive Layout**: Mobile-first design with breakpoint optimization

### UI Components
- **Interactive Forms**: Multi-step survey forms with progress tracking
- **Loading States**: Elegant loading animations and skeleton screens
- **Error Handling**: User-friendly error messages and validation
- **Toast Notifications**: Real-time feedback for user actions

## 🔐 Authentication Flow

1. **Registration**: User creates account with email, password, and name
2. **Login**: Secure authentication with JWT tokens
3. **Token Management**: Automatic refresh token rotation
4. **Protected Routes**: Middleware-based route protection
5. **Persistent Sessions**: HTTP-only cookies for security

## 📱 Pages & Features

### Public Pages
- **Landing Page** (`/`): Welcome page with app introduction
- **Login** (`/login`): User authentication
- **Register** (`/register`): New user registration

### Protected Pages
- **Dashboard** (`/dashboard`): User overview and survey status
- **Survey** (`/survey`): Interactive survey form
- **Submission** (`/submission`): View submitted survey responses

## 🔧 Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

### Tailwind CSS
Custom configuration includes:
- Extended color palette with gradients
- Custom animations and transitions
- Responsive breakpoints
- Typography scale

### TypeScript
Strict type checking enabled with:
- Interface definitions for all data structures
- Type-safe API calls and responses
- Component prop validation
- Utility type helpers

## 🚀 Deployment

### Netlify (Current Production)
The app is automatically deployed to Netlify:

**Production URL**: [https://charming-crisp-1f492e.netlify.app/](https://charming-crisp-1f492e.netlify.app/)

**Deploy Settings**:
- Build command: `npm run build`
- Publish directory: `out` (if using static export) or `.next`
- Node version: 18+

### Manual Deployment
1. Build the application:
```bash
npm run build
```

2. Deploy the `.next` folder to your hosting provider

3. Ensure environment variables are set in production

## 🔍 API Integration

The frontend communicates with the backend through:

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/validate` - Token validation
- `GET /api/auth/profile` - User profile

### Survey Endpoints
- `GET /api/survey/active` - Get active surveys
- `POST /api/survey/submit` - Submit survey response
- `GET /api/survey/submission` - Get user submissions

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Type check with TypeScript |

## 🔒 Security Features

- **HTTP-only Cookies**: Secure token storage
- **CSRF Protection**: Cross-site request forgery prevention
- **Input Validation**: Client and server-side validation
- **Secure Headers**: Helmet.js security headers
- **Password Requirements**: Strong password enforcement

---

**Live Application**: [https://charming-crisp-1f492e.netlify.app/](https://charming-crisp-1f492e.netlify.app/)

Built with ❤️ using Next.js and TypeScript
