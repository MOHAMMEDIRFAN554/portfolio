# Full Stack Portfolio Application

A professional, fully-featured portfolio built with Next.js, Node.js, Express, and MongoDB. Features rich animations, an admin dashboard, and a production-ready backend API.

## 🎨 Features

### Frontend
- **Rich Animations**: Framer Motion-powered smooth transitions and parallax effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Glass-morphism UI**: Modern glass-effect cards and components
- **Dark Premium Theme**: Professional dark mode with gradient accents
- **Interactive Elements**: Hover effects, scroll animations, and smooth interactions
- **Project Showcase**: Featured and grid-based project displays
- **Contact Form**: Fully functional contact form with validation
- **Dynamic Project Pages**: Slug-based project detail pages

### Backend
- **RESTful API**: Clean, well-structured Express API
- **JWT Authentication**: Secure token-based admin authentication
- **MongoDB Integration**: Persistent data storage with Mongoose
- **Rate Limiting**: Protected endpoints with rate limiting
- **Email Notifications**: Contact form submissions via Nodemailer
- **Error Handling**: Centralized error management
- **Environment Validation**: Required environment variables validation

### Admin Dashboard
- **Project Management**: Create, edit, delete, and toggle featured projects
- **Contact Management**: View and manage contact form submissions
- **Resume Management**: Upload and manage resume files
- **Authentication**: Secure admin login with JWT
- **Real-time Updates**: Live project list management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- MongoDB Atlas account or local MongoDB
- SMTP credentials (for emails)

### Frontend Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pnpm install
```

3. Create `.env` file:
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# JWT
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password_here

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@portfolio.com
```

4. Run the backend server:
```bash
pnpm dev
```

The API will be available at [http://localhost:5000/api](http://localhost:5000/api)

## 📁 Project Structure

### Frontend (`/app`)
```
app/
├── page.tsx                 # Homepage
├── layout.tsx              # Root layout with metadata
├── globals.css             # Global styles and theme
├── projects/
│   └── [slug]/page.tsx     # Dynamic project detail page
└── admin/
    ├── login/page.tsx      # Admin login
    └── dashboard/page.tsx  # Admin dashboard
```

### Components (`/components`)
```
components/
├── navbar.tsx              # Navigation bar
├── footer.tsx              # Footer
└── sections/
    ├── hero.tsx           # Hero section
    ├── about.tsx          # About section
    ├── tech-stack.tsx     # Technology stack
    ├── featured-projects.tsx
    ├── all-projects.tsx
    └── contact.tsx        # Contact form
```

### Backend (`/backend/src`)
```
backend/src/
├── config/
│   ├── database.ts        # MongoDB connection
│   └── environment.ts     # Env validation
├── models/
│   ├── admin.model.ts
│   ├── project.model.ts
│   ├── contact.model.ts
│   └── resume.model.ts
├── modules/
│   ├── auth/             # Authentication
│   ├── project/          # Projects CRUD
│   ├── contact/          # Contact form
│   └── resume/           # Resume management
├── middlewares/
│   ├── auth.middleware.ts
│   ├── errorHandler.ts
│   ├── rateLimiter.ts
│   └── validation.ts
├── utils/
│   ├── jwt.ts
│   ├── bcrypt.ts
│   └── nodemailer.ts
├── app.ts                # Express app setup
└── server.ts             # Entry point
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (protected)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:slug` - Get project by slug
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)
- `PATCH /api/projects/:id/toggle-featured` - Toggle featured (protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (protected)
- `PATCH /api/contact/:id` - Mark as read (protected)

### Resume
- `GET /api/resume` - Get latest resume
- `POST /api/resume` - Upload resume (protected)
- `DELETE /api/resume/:id` - Delete resume (protected)

## 🎯 Key Technologies

### Frontend
- **Next.js 16** - React framework
- **React 19.2** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Intersection Observer** - Scroll animations

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB/Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Zod** - Validation
- **Nodemailer** - Email

## 🎨 Design System

### Color Palette
- **Primary**: `#fa00ff` (Magenta/Purple)
- **Accent**: `#00d4ff` (Cyan)
- **Background**: `#0d0a14` (Dark Navy)
- **Card**: `#1a1527` (Dark Purple)

### Typography
- **Headings**: Sohne (600, 700)
- **Body**: Inter (400, 500, 600, 700)

### Animation Presets
- Smooth fade-ins with stagger
- Parallax scroll effects
- Hover lift animations
- Page transitions
- Loading states

## 📦 Deployment

### Frontend (Vercel)
```bash
npm i -g vercel
vercel
```

Set environment variables in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Backend (Render/Railway)
1. Push backend folder to GitHub
2. Connect to Render or Railway
3. Set environment variables
4. Deploy

## 🔐 Security

- JWT tokens stored in HTTP-only cookies
- CORS restricted to frontend domain
- Rate limiting on auth and contact endpoints
- Password hashing with bcryptjs
- Input validation with Zod
- Helmet security headers
- Environment variable validation

## 📝 Environment Variables

Required environment variables are documented in:
- Frontend: `.env.local`
- Backend: `.env` (see `.env.example`)

## 🤝 Contributing

This is a personal portfolio template. Feel free to customize it for your needs!

## 📄 License

MIT License - feel free to use this template for your portfolio.

## 📞 Support

For issues or questions, please check the code comments and documentation or open an issue in the repository.

---

**Made with ❤️ using modern web technologies**
