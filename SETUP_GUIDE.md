# Portfolio Setup & Deployment Guide

## Project Overview

Full-stack MERN portfolio application featuring:
- **Frontend**: Next.js 16 with Framer Motion animations, Tailwind CSS
- **Backend**: Express.js with MongoDB, JWT authentication, rate limiting
- **Admin Dashboard**: Project management with authentication
- **Rich UI**: Glass-morphism design, smooth animations, responsive layout

---

## Prerequisites

- Node.js 18+ and pnpm
- MongoDB Atlas account (or local MongoDB)
- Nodemailer setup (Gmail/SMTP credentials)
- GitHub account (optional, for version control)

---

## Local Development Setup

### 1. Frontend Setup

```bash
# Navigate to project root
cd portfolio-project

# Install dependencies
pnpm install

# Create .env.local
cp .env.example .env.local

# Update .env.local with backend URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server
pnpm dev
# Frontend runs at http://localhost:3000
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
pnpm install

# Create .env file
cp .env.example .env

# Fill in required environment variables:
# - MONGODB_URI: MongoDB connection string
# - JWT_SECRET: Random secret key
# - JWT_REFRESH_SECRET: Random refresh secret
# - ADMIN_EMAIL: Admin email for login
# - ADMIN_PASSWORD: Hashed admin password
# - SMTP_USER, SMTP_PASS (for Nodemailer)
# - CLIENT_URL: Frontend URL (http://localhost:3000 for dev)

# Start development server
pnpm dev
# Backend runs at http://localhost:5000
```

---

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Admin Credentials (Use bcrypt hashed password)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=$2b$10$hashedPasswordHere

# Email (Nodemailer)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@portfolio.com
```

---

## API Endpoints

### Authentication
- **POST** `/api/auth/login` - Admin login
- **POST** `/api/auth/refresh` - Refresh access token
- **POST** `/api/auth/logout` - Logout

### Projects
- **GET** `/api/projects` - Get all projects (public)
- **GET** `/api/projects/:slug` - Get project details
- **POST** `/api/admin/projects` - Create project (protected)
- **PUT** `/api/admin/projects/:id` - Update project (protected)
- **DELETE** `/api/admin/projects/:id` - Delete project (protected)

### Contact
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/admin/contact` - Get messages (protected)
- **PATCH** `/api/admin/contact/:id` - Mark as read (protected)

### Resume
- **GET** `/api/resume` - Get resume
- **POST** `/api/admin/resume` - Upload resume (protected)

---

## Admin Dashboard

### Access
1. Navigate to `/admin/login`
2. Default credentials (set during installation):
   - Email: `admin@example.com`
   - Password: (set in .env)

### Features
- **Projects**: Create, edit, delete, toggle featured status
- **Contact Messages**: View and mark as read
- **Resume Management**: Upload/update resume file

---

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.com/api
   ```
4. Deploy automatically on push

### Backend (Render/Railway)

1. Create new service on Render or Railway
2. Connect GitHub repository
3. Set environment variables (all .env values)
4. Configure build command: `cd backend && pnpm install && pnpm build`
5. Configure start command: `cd backend && pnpm start`
6. Deploy

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Create database user
3. Get connection string
4. Add connection string to backend .env
5. Configure network access (allow all IPs or specific IP)

---

## File Structure

```
portfolio-project/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── projects/
│   │   └── [slug]/page.tsx
│   └── admin/
│       ├── login/page.tsx
│       └── dashboard/page.tsx
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── tech-stack.tsx
│   │   ├── featured-projects.tsx
│   │   ├── all-projects.tsx
│   │   └── contact.tsx
│   └── ui/ (shadcn components)
├── lib/
│   └── api-client.ts
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── modules/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── .env.example
└── package.json
```

---

## Troubleshooting

### Font Loading Issues
- Ensure fonts are defined in `layout.tsx`
- Check that `globals.css` uses CSS variables from layout

### API Connection Failed
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` matches backend URL
- Ensure CORS is configured in backend

### Authentication Issues
- Verify JWT secrets are set
- Check admin credentials in database
- Ensure cookies are enabled in browser

### Database Connection
- Test connection string in MongoDB Atlas
- Verify IP whitelist includes server IP
- Check database user permissions

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Support

For issues or questions:
1. Check error messages in console
2. Review debug logs
3. Verify environment variables
4. Check network requests in browser DevTools
