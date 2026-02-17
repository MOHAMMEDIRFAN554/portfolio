# Documentation Index

Welcome to your full-stack portfolio application! This file guides you through all available documentation.

---

## Getting Started (Start Here!)

### For First-Time Setup
1. **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
   - Prerequisites
   - Installation steps
   - Common issues
   - Next steps

2. **[README.md](./README.md)** - Project overview
   - Feature overview
   - Tech stack details
   - Quick start section
   - File structure
   - API documentation

---

## Detailed Guides

### Setup & Installation
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Comprehensive setup instructions
  - Local development setup
  - Backend configuration
  - Frontend configuration
  - Environment variables explained
  - All API endpoints documented
  - Troubleshooting section

### Admin Dashboard
- **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** - How to use the admin dashboard
  - Accessing the dashboard
  - Project management
  - Contact management
  - Resume management
  - Best practices
  - Keyboard shortcuts
  - Security tips

### Deployment
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-deployment verification
  - Pre-deployment checklist
  - Backend deployment steps
  - Frontend deployment steps (Vercel)
  - Database setup (MongoDB Atlas)
  - SSL/HTTPS configuration
  - Performance & security checks
  - Post-launch monitoring

---

## Project Reference

### Overview
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project summary
  - What's included
  - Directory structure
  - Key technologies
  - Features implemented
  - API endpoints
  - Performance details
  - Scalability features

### Build Information
- **[BUILD_REPORT.md](./BUILD_REPORT.md)** - Build completion report
  - Deliverables
  - Code statistics
  - Quality metrics
  - Testing performed
  - Files created
  - Getting started

### Original Requirements
- **[PORTFOLIO_README.md](./PORTFOLIO_README.md)** - Original project requirements
  - Initial planning document
  - Project specifications
  - Implementation plan

---

## Code Documentation

### Frontend
- **app/page.tsx** - Homepage main file
- **app/layout.tsx** - Root layout with fonts and metadata
- **app/globals.css** - Global styles and theme variables
- **components/navbar.tsx** - Navigation component
- **components/sections/** - Each section component:
  - hero.tsx
  - about.tsx
  - tech-stack.tsx
  - featured-projects.tsx
  - all-projects.tsx
  - contact.tsx
- **lib/api-client.ts** - Axios API client with interceptors
- **tailwind.config.ts** - Tailwind CSS configuration

### Backend
- **backend/src/server.ts** - Server entry point
- **backend/src/app.ts** - Express app configuration
- **backend/src/modules/** - Feature modules:
  - auth/ - Authentication
  - project/ - Project management
  - contact/ - Contact form
  - resume/ - Resume management
- **backend/src/models/** - MongoDB models
- **backend/src/middlewares/** - Express middlewares
- **backend/src/config/** - Configuration files
- **backend/src/utils/** - Utility functions

### Configuration
- **.env.example** - Frontend environment template
- **backend/.env.example** - Backend environment template
- **.gitignore** - Git ignore rules
- **package.json** - Frontend dependencies
- **backend/package.json** - Backend dependencies
- **tsconfig.json** - TypeScript configuration

---

## Quick References

### Common Tasks

#### Add a New Project
1. Go to `/admin/login`
2. Login with admin credentials
3. Click "New Project"
4. Fill in details and images
5. Click "Save"
6. Project appears on homepage

#### Change Admin Password
1. Stop backend server
2. Generate new bcrypt hash: `pnpm init`
3. Update .env with new hash
4. Restart server

#### Deploy to Production
1. Follow [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
2. Deploy frontend to Vercel
3. Deploy backend to Render/Railway
4. Configure environment variables
5. Initialize production database

#### Run Database Migrations
```bash
cd backend
pnpm init  # Initialize/reset database
```

#### Build for Production
```bash
# Frontend
pnpm build

# Backend
cd backend && pnpm build
```

---

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=bcrypt_hashed_password
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CLIENT_URL=http://localhost:3000
```

---

## API Quick Reference

### Authentication
```
POST   /api/auth/login       - Login
POST   /api/auth/refresh     - Refresh token
POST   /api/auth/logout      - Logout
```

### Projects
```
GET    /api/projects         - Get all (public)
GET    /api/projects/:slug   - Get one (public)
POST   /api/admin/projects   - Create (protected)
PUT    /api/admin/projects/:id - Update (protected)
DELETE /api/admin/projects/:id - Delete (protected)
```

### Contact
```
POST   /api/contact          - Submit form
GET    /api/admin/contact    - Get messages (protected)
```

### Resume
```
GET    /api/resume           - Get resume
POST   /api/admin/resume     - Upload (protected)
```

---

## Technology Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- Axios

### Backend
- Express.js
- MongoDB/Mongoose
- JWT
- bcryptjs
- Helmet
- Zod

---

## File Organization

```
portfolio/
├── README.md                 # Main documentation
├── QUICK_START.md           # 5-minute guide
├── SETUP_GUIDE.md           # Detailed setup
├── ADMIN_GUIDE.md           # Admin help
├── DEPLOYMENT_CHECKLIST.md  # Deployment guide
├── PROJECT_SUMMARY.md       # Project overview
├── BUILD_REPORT.md          # Build summary
├── PORTFOLIO_README.md      # Original requirements
├── INDEX.md                 # This file
├── .env.example             # Frontend env template
├── .gitignore               # Git ignore
├── package.json             # Frontend dependencies
├── tailwind.config.ts       # Tailwind config
├── app/                     # Next.js app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── projects/[slug]/
│   └── admin/
├── components/              # React components
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── sections/
│   └── ui/
├── lib/
│   └── api-client.ts
└── backend/                 # Express API
    ├── src/
    │   ├── modules/
    │   ├── models/
    │   ├── middlewares/
    │   ├── utils/
    │   ├── app.ts
    │   ├── server.ts
    │   └── init.ts
    ├── package.json
    └── .env.example
```

---

## Troubleshooting

### Common Issues
1. **Port in use** - Change PORT in .env or use different port
2. **Database connection failed** - Verify MONGODB_URI and IP whitelist
3. **Admin login fails** - Run `pnpm init` in backend to initialize database
4. **Images not loading** - Check Cloudinary credentials
5. **API 401 errors** - Verify JWT tokens and admin credentials

For more help, see:
- [SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting)
- [QUICK_START.md](./QUICK_START.md#common-issues)

---

## Next Steps

1. **Read** [QUICK_START.md](./QUICK_START.md) for immediate setup
2. **Reference** [README.md](./README.md) for project overview
3. **Follow** [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
4. **Manage** content using [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)
5. **Deploy** using [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## Support

### Documentation
All documentation is included in this project. Start with [QUICK_START.md](./QUICK_START.md) or [README.md](./README.md).

### Debugging
- Check error messages in browser console (F12)
- Review backend logs during development
- Check environment variables are correctly set
- Verify database connection

### Deployment Help
Follow the [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) step by step.

---

## Version Information

- **Project Version**: 1.0.0
- **Last Updated**: February 2026
- **Node.js**: 18+
- **Next.js**: 16.1.6
- **React**: 19.2.3
- **Express**: 5.2.1
- **MongoDB**: 9.2.1

---

## Quick Links

- [Quick Start](./QUICK_START.md) - 5 minutes to running
- [Setup Guide](./SETUP_GUIDE.md) - Full setup instructions
- [Admin Guide](./ADMIN_GUIDE.md) - Dashboard help
- [Deployment](./DEPLOYMENT_CHECKLIST.md) - Deploy to production
- [Project Summary](./PROJECT_SUMMARY.md) - Project details

---

Good luck with your portfolio! 🚀

Start with [QUICK_START.md](./QUICK_START.md) for the fastest setup.
