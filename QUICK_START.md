# Quick Start Guide

Get your portfolio up and running in 5 minutes!

---

## Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- MongoDB Atlas account (free tier available)
- Cloudinary account (optional, for images)

---

## 1. Clone and Install (1 min)

```bash
# Install all dependencies
pnpm install
cd backend && pnpm install && cd ..
```

---

## 2. Setup Environment Variables (2 min)

### Frontend
```bash
# Copy example file
cp .env.example .env.local

# Update with your backend URL (will be localhost:5000 for dev)
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend
```bash
cd backend

# Copy example file
cp .env.example .env

# Fill in these minimum required variables:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=any_random_string_here
# JWT_REFRESH_SECRET=another_random_string_here
# ADMIN_EMAIL=admin@example.com
# ADMIN_PASSWORD=your_secure_password_here
# CLIENT_URL=http://localhost:3000
```

---

## 3. Initialize Database (1 min)

```bash
cd backend
pnpm init
# This creates your admin user
```

---

## 4. Start Development Servers (1 min)

**Terminal 1 - Frontend:**
```bash
pnpm dev
# Frontend starts at http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
cd backend
pnpm dev
# Backend starts at http://localhost:5000
```

---

## Done! 🎉

Your portfolio is running locally!

### What to do next:

1. **Visit Homepage**: http://localhost:3000
2. **Admin Login**: http://localhost:3000/admin/login
3. **Create Your First Project**: Add a project in the admin dashboard
4. **View on Homepage**: Your project appears in the projects section

---

## Common Issues

### Port Already in Use
```bash
# Frontend (change port)
PORT=3001 pnpm dev

# Backend (change port)
PORT=5001 cd backend && pnpm dev
# Then update NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### MongoDB Connection Failed
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist includes your machine
- Ensure database user has correct permissions

### Admin Login Not Working
- Make sure you ran `pnpm init` in backend
- Verify ADMIN_EMAIL and ADMIN_PASSWORD match
- Check browser console for errors

---

## Next Steps

1. **Read the docs**: Start with `README.md`
2. **Customize content**: Edit project details in admin dashboard
3. **Deploy**: Follow `DEPLOYMENT_CHECKLIST.md`

For detailed setup, see `SETUP_GUIDE.md`.

Happy coding! 🚀
