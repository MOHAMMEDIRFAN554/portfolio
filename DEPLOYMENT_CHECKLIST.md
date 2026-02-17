# Deployment Checklist

Complete this checklist before deploying your portfolio to production.

---

## Pre-Deployment (Local Testing)

- [ ] All frontend pages load without errors
- [ ] All API endpoints respond correctly
- [ ] Authentication works (login/logout)
- [ ] Contact form submits successfully
- [ ] Project images display properly
- [ ] Animations play smoothly without lag
- [ ] Mobile responsive design looks good
- [ ] No console errors or warnings
- [ ] Environment variables are correctly set
- [ ] Database connection is stable

---

## Backend Deployment (Render / Railway)

### Preparation
- [ ] Backend code is pushed to GitHub
- [ ] All environment variables are documented
- [ ] `.env.example` file is up to date
- [ ] Backend builds successfully locally (`pnpm build`)
- [ ] All tests pass (if applicable)

### Deployment Steps
- [ ] Create account on Render.com or Railway.app
- [ ] Connect GitHub repository
- [ ] Set all required environment variables:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `JWT_REFRESH_SECRET`
  - [ ] `ADMIN_EMAIL`
  - [ ] `ADMIN_PASSWORD` (hashed with bcrypt)
  - [ ] `CLOUDINARY_NAME`
  - [ ] `CLOUDINARY_API_KEY`
  - [ ] `CLOUDINARY_API_SECRET`
  - [ ] `SMTP_USER`
  - [ ] `SMTP_PASS`
  - [ ] `CLIENT_URL` (frontend URL)

### Post-Deployment
- [ ] Test health check endpoint: `GET /health`
- [ ] Test login endpoint: `POST /api/auth/login`
- [ ] Test projects endpoint: `GET /api/projects`
- [ ] Verify CORS is properly configured
- [ ] Check logs for any startup errors
- [ ] Monitor server performance

---

## Database Setup (MongoDB Atlas)

- [ ] Create MongoDB Atlas account
- [ ] Create cluster
- [ ] Create database user
- [ ] Get connection string
- [ ] Add connection string to backend `.env`
- [ ] Whitelist all IPs (or specific server IPs)
- [ ] Test connection from backend server
- [ ] Create indexes for performance
- [ ] Set up automated backups
- [ ] Enable authentication

---

## External Services

### Cloudinary
- [ ] Create Cloudinary account
- [ ] Get API credentials
- [ ] Add credentials to backend `.env`
- [ ] Test image upload functionality
- [ ] Configure upload presets if needed

### Nodemailer / SMTP
- [ ] Verify SMTP credentials are correct
- [ ] Test email sending
- [ ] Check spam folder for test emails
- [ ] Configure email templates if needed

---

## Frontend Deployment (Vercel)

### Preparation
- [ ] Frontend code is pushed to GitHub
- [ ] All environment variables are set up
- [ ] `.env.example` is documented
- [ ] Build succeeds locally (`pnpm build`)
- [ ] No build warnings or errors

### Deployment Steps
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Configure project settings:
  - [ ] Framework: Next.js
  - [ ] Root Directory: (root of project)
  - [ ] Build Command: `pnpm build`
  - [ ] Output Directory: `.next`
- [ ] Set environment variables:
  - [ ] `NEXT_PUBLIC_API_URL` = backend URL
- [ ] Deploy

### Post-Deployment
- [ ] Verify site loads without errors
- [ ] Test all pages and navigation
- [ ] Verify API calls reach backend
- [ ] Check that images load correctly
- [ ] Test authentication flow
- [ ] Verify contact form works
- [ ] Test project detail pages
- [ ] Check admin login page

---

## SSL/HTTPS

- [ ] Enable SSL on backend domain
- [ ] Enable SSL on frontend domain (Vercel auto-enables)
- [ ] Update API URL to use HTTPS
- [ ] Test mixed content warnings
- [ ] Verify all API calls use HTTPS

---

## Performance & Security

### Performance
- [ ] Lighthouse score > 80
- [ ] Page load time < 3 seconds
- [ ] Images are optimized
- [ ] CSS/JS is minified
- [ ] Caching headers are set
- [ ] CDN is enabled (Vercel default)

### Security
- [ ] HTTPS is enabled on both services
- [ ] CORS is restricted to frontend domain
- [ ] JWT tokens are set to HTTP-only (if using cookies)
- [ ] Rate limiting is enabled on auth endpoints
- [ ] Helmet security headers are active
- [ ] No sensitive data in frontend code
- [ ] No secrets in GitHub repository
- [ ] Environment variables are not exposed

### Monitoring
- [ ] Error tracking is configured (optional: Sentry)
- [ ] Uptime monitoring is enabled (optional: StatusPage)
- [ ] Logs are being captured
- [ ] Database backups are scheduled

---

## DNS & Domain

- [ ] Domain is registered
- [ ] DNS records are configured:
  - [ ] Frontend: Point to Vercel nameservers or CNAME
  - [ ] Backend: Point to Render/Railway
- [ ] SSL certificates are provisioned
- [ ] Email records (MX, SPF, DKIM) are configured if using custom email
- [ ] Domain is working properly

---

## Testing in Production

### Functionality
- [ ] Homepage loads and displays all sections
- [ ] Navigation links work correctly
- [ ] Hero animations display smoothly
- [ ] Projects section loads projects from API
- [ ] Featured projects appear first
- [ ] Project detail pages load correctly
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] Admin can create/edit/delete projects
- [ ] Admin can view contact messages
- [ ] Resume download works

### Performance
- [ ] Pages load within acceptable time
- [ ] Images display correctly
- [ ] Animations are smooth
- [ ] No layout shifts (Cumulative Layout Shift < 0.1)
- [ ] Responsive design works on all devices

### Cross-Browser
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Mobile Responsiveness
- [ ] Hamburger menu opens/closes
- [ ] Touch interactions work
- [ ] Text is readable without zoom
- [ ] Forms are easy to fill on mobile
- [ ] Images scale properly

---

## Documentation

- [ ] README.md is up to date
- [ ] SETUP_GUIDE.md has correct instructions
- [ ] ADMIN_GUIDE.md explains all features
- [ ] API endpoints are documented
- [ ] Environment variables are listed
- [ ] Troubleshooting section is complete
- [ ] All deployment URLs are updated

---

## Post-Launch

### Monitoring
- [ ] Monitor error logs daily for first week
- [ ] Check performance metrics
- [ ] Monitor database usage
- [ ] Review user feedback
- [ ] Track analytics

### Maintenance
- [ ] Set up automated backups
- [ ] Schedule regular database maintenance
- [ ] Plan security updates
- [ ] Monitor for deprecated dependencies
- [ ] Plan feature updates

### Backups
- [ ] Database backup configured
- [ ] Test restore from backup
- [ ] Document backup procedures
- [ ] Set backup retention policy

---

## Final Verification

- [ ] All checklist items completed
- [ ] All team members are informed of live URL
- [ ] Admin credentials are securely shared
- [ ] Deployment notes are documented
- [ ] Rollback plan is in place (if needed)

---

## Deployment Complete! 🎉

Your portfolio is now live! 

**Production URLs:**
- Frontend: `https://your-domain.com`
- Backend: `https://api.your-domain.com` or similar
- Admin: `https://your-domain.com/admin/login`

**Next Steps:**
1. Share your portfolio with the world
2. Monitor logs and performance
3. Gather feedback from users
4. Plan future enhancements
5. Keep dependencies updated

---

## Support

If you encounter issues:
1. Check the troubleshooting section in SETUP_GUIDE.md
2. Review error logs in Vercel and Render dashboards
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
5. Contact your hosting provider support

Good luck with your live portfolio! 🚀
