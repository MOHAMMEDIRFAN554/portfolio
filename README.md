# Mohammed Irfan - Full Stack Portfolio

A modern, full-stack portfolio application showcasing projects, skills, and services with a professional admin dashboard for content management.

## Features

### Frontend
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Rich Animations**: Framer Motion for smooth scroll animations, parallax effects, and hover interactions
- **Glass-Morphism UI**: Modern frosted glass aesthetic with gradient overlays
- **Dark Premium Theme**: Professional navy background with magenta and cyan accents
- **Optimized Performance**: Next.js 16 with Turbopack for fast builds
- **SEO Ready**: Metadata, OpenGraph tags, and canonical URLs

### Backend
- **Secure Authentication**: JWT-based login with refresh tokens
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Zod schemas for all API inputs
- **Error Handling**: Centralized error management with proper HTTP status codes
- **Image Management**: Cloudinary integration for project images
- **Email Notifications**: Nodemailer for contact form submissions

### Admin Dashboard
- **Project Management**: Create, edit, delete, and feature projects
- **Contact Messages**: View and manage contact submissions
- **Resume Management**: Upload and manage resume files
- **Protected Routes**: JWT authentication for all admin endpoints

---

## Tech Stack

### Frontend
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- Axios
- shadcn/ui components

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Zod validation
- Helmet (security headers)
- Express Rate Limit

### Deployment
- Frontend: Vercel
- Backend: Render / Railway
- Database: MongoDB Atlas
- Storage: Cloudinary

---

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm package manager
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone and install dependencies**
```bash
# Install root dependencies
pnpm install

# Install backend dependencies
cd backend && pnpm install && cd ..
```

2. **Setup environment variables**
```bash
# Frontend
cp .env.example .env.local

# Backend
cd backend && cp .env.example .env
```

3. **Configure environment variables**
Update both `.env.local` and `backend/.env` with your credentials (see SETUP_GUIDE.md)

4. **Initialize database and create admin user**
```bash
cd backend
pnpm init
# Enter admin email and password when prompted
```

5. **Start development servers**
```bash
# Terminal 1: Frontend
pnpm dev
# http://localhost:3000

# Terminal 2: Backend
cd backend && pnpm dev
# http://localhost:5000
```

---

## Project Structure

```
portfolio/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with fonts & metadata
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles & theme
│   ├── projects/[slug]/page.tsx # Dynamic project pages
│   └── admin/
│       ├── login/page.tsx       # Admin login
│       └── dashboard/page.tsx   # Admin dashboard
│
├── components/
│   ├── navbar.tsx               # Navigation bar
│   ├── footer.tsx               # Footer
│   ├── sections/
│   │   ├── hero.tsx            # Hero section
│   │   ├── about.tsx           # About section
│   │   ├── tech-stack.tsx      # Skills/tech section
│   │   ├── featured-projects.tsx # Featured projects showcase
│   │   ├── all-projects.tsx    # Projects grid with filter
│   │   └── contact.tsx         # Contact form section
│   └── ui/                      # shadcn UI components
│
├── lib/
│   ├── api-client.ts           # Axios instance with interceptors
│   └── utils.ts                # Utility functions
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts      # MongoDB connection
│   │   │   └── environment.ts   # Env validation
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── rateLimiter.ts
│   │   │   └── validation.ts
│   │   ├── models/
│   │   │   ├── admin.model.ts
│   │   │   ├── project.model.ts
│   │   │   ├── contact.model.ts
│   │   │   └── resume.model.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── project/
│   │   │   ├── contact/
│   │   │   └── resume/
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   ├── bcrypt.ts
│   │   │   └── nodemailer.ts
│   │   ├── app.ts              # Express app setup
│   │   ├── server.ts           # Server entry point
│   │   └── init.ts             # Database initialization
│   └── package.json
│
└── package.json                 # Root package.json
```

---

## API Documentation

### Authentication
```
POST   /api/auth/login          - Admin login
POST   /api/auth/refresh        - Refresh access token
POST   /api/auth/logout         - Logout
```

### Projects
```
GET    /api/projects            - Get all projects (public)
GET    /api/projects/:slug      - Get project details (public)
POST   /api/admin/projects      - Create project (protected)
PUT    /api/admin/projects/:id  - Update project (protected)
DELETE /api/admin/projects/:id  - Delete project (protected)
PATCH  /api/admin/projects/:id/toggle-featured - Toggle featured (protected)
```

### Contact
```
POST   /api/contact             - Submit contact form (public, rate limited)
GET    /api/admin/contact       - Get messages (protected)
PATCH  /api/admin/contact/:id   - Mark as read (protected)
```

### Resume
```
GET    /api/resume              - Get resume (public)
POST   /api/admin/resume        - Upload resume (protected)
```

---

## Key Features Deep Dive

### Animations
- **Scroll Animations**: React Intersection Observer triggers animations on scroll
- **Staggered Children**: Multiple elements animate sequentially for visual rhythm
- **Hover Effects**: Interactive cards with shadow, scale, and color transitions
- **Parallax**: Background elements move at different speeds while scrolling
- **Loading States**: Smooth spinners and skeleton screens

### Security
- **JWT Authentication**: Stateless sessions with access + refresh tokens
- **Password Hashing**: bcryptjs with 10 salt rounds
- **Rate Limiting**: Bruteforce protection on auth & contact endpoints
- **CORS**: Restricted to frontend domain only
- **Helmet**: Security headers (CSP, X-Frame-Options, etc.)
- **Input Validation**: Zod schemas for all inputs

### Performance
- **Next.js 16**: Turbopack for 5-10x faster builds
- **React Compiler**: Automatic memoization and optimization
- **Image Optimization**: Cloudinary for responsive images
- **API Optimization**: Axios interceptors for request deduplication
- **CSS-in-JS**: Tailwind for minimal CSS bundles

---

## Deployment

### Frontend (Vercel)
```bash
# Push to GitHub, connect to Vercel
# Set environment variable:
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Backend (Render / Railway)
```bash
# Connect GitHub repository
# Set all environment variables from .env
# Build: cd backend && pnpm install && pnpm build
# Start: cd backend && pnpm start
```

### Database (MongoDB Atlas)
1. Create cluster
2. Create database user
3. Get connection string
4. Add to backend .env as MONGODB_URI
5. Configure IP whitelist

---

## Development

### Adding New Projects
1. Go to `/admin/login` and login
2. Navigate to admin dashboard
3. Click "Add Project"
4. Fill in details and upload images
5. Toggle "Featured" if needed

### Customizing Sections
- Edit components in `components/sections/`
- Update styling in `app/globals.css`
- Modify theme colors in `tailwind.config.ts`

### Running Scripts
```bash
# Database initialization
cd backend && pnpm init

# Build frontend
pnpm build

# Build backend
cd backend && pnpm build

# Production start
npm start  # Frontend on Vercel
cd backend && npm start  # Backend
```

---

## Troubleshooting

**Font not loading?**
- Check `layout.tsx` has font imports
- Verify `globals.css` uses CSS variables

**API 401 Errors?**
- Check JWT tokens in cookies
- Verify admin credentials
- Check token expiry

**Images not showing?**
- Verify Cloudinary credentials
- Check CORS settings
- Ensure images are uploaded

**Database connection failed?**
- Verify MongoDB connection string
- Check IP whitelist in Atlas
- Confirm credentials

---

## Future Enhancements

- Blog section with markdown support
- Analytics dashboard
- Dark/Light theme toggle
- Multi-language support
- Newsletter subscription
- Social media feeds integration
- Chat/messaging system
- File upload to resume

---

## License

This project is open source and available under the MIT License.

---

## Contact

- Email: irfan@example.com
- Location: Pakistan
- Response: Within 24 hours

---

## Acknowledgments

Built with modern web technologies and best practices for performance, security, and user experience.
