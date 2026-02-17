# Admin Dashboard Guide

## Overview

The admin dashboard allows you to manage your portfolio content, including projects, contact messages, and resume files.

---

## Accessing the Dashboard

1. Navigate to `/admin/login`
2. Enter your admin credentials:
   - **Email**: Set during initialization
   - **Password**: Set during initialization
3. Click "Sign In"
4. You will be redirected to the dashboard

---

## Dashboard Features

### 1. Projects Management

#### View All Projects
- Displays all published projects in a grid layout
- Shows project thumbnail, title, and tech stack
- Filter projects by type (Case Study / Basic)

#### Create New Project
1. Click "New Project" button
2. Fill in the following details:
   - **Title**: Project name
   - **Slug**: URL-friendly identifier (auto-generated from title)
   - **Short Description**: Brief overview (for project cards)
   - **Full Description**: Detailed description (for project detail page)
   - **Tech Stack**: Technologies used (e.g., React, Node.js)
   - **Type**: Case Study or Basic
   - **Images**: Upload project images
   - **Live URL**: Link to live project (optional)
   - **GitHub URL**: Link to GitHub repository (optional)
   - **Featured**: Toggle to feature on homepage

#### Edit Project
1. Click on a project card
2. Update any field
3. Click "Save Changes"
4. Confirm the update

#### Delete Project
1. Click on a project card
2. Click "Delete" button
3. Confirm deletion

#### Toggle Featured Status
- Click the star icon on any project card to toggle featured status
- Featured projects appear first on homepage and in the projects section

### 2. Contact Messages

#### View Messages
- All contact form submissions appear here
- Shows name, email, message, and submission date
- Messages are sorted by newest first

#### Mark as Read
1. Click on a message
2. Click "Mark as Read" to indicate you've reviewed it
3. Read messages appear with a different visual indicator

#### Features
- Search messages by sender name or email
- Filter by read/unread status
- Export messages (coming soon)

### 3. Resume Management

#### View Current Resume
- Displays the current resume file
- Shows upload date and file size

#### Upload/Update Resume
1. Click "Upload Resume" button
2. Select a PDF file from your computer
3. Click "Upload"
4. The new resume replaces the previous one

#### Download Resume
- Click the download button to download the current resume
- Users can also download from your portfolio homepage

---

## Tips & Best Practices

### Projects
- **Slug Format**: Use lowercase, hyphens for spaces (e.g., `biller-pro`)
- **Images**: Upload high-quality images (recommended: 1200x800px)
- **Description**: Keep short description under 150 characters
- **Tech Stack**: List technologies in order of importance

### Contact Messages
- **Regular Check-ins**: Review messages daily
- **Mark as Read**: Keep track of which messages you've addressed
- **Respond Quickly**: Aim to respond within 24 hours

### Resume
- **Keep Updated**: Update your resume regularly
- **File Size**: Keep under 5MB for optimal loading
- **Format**: PDF recommended for best compatibility

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Esc` | Close modal/dialog |
| `Ctrl+K` (Cmd+K on Mac) | Open command palette (coming soon) |
| `Ctrl+S` (Cmd+S on Mac) | Save changes (in edit mode) |

---

## Session Management

### Session Expiry
- Your session automatically expires after 7 days
- You'll be prompted to log in again
- Unsaved changes will be lost

### Automatic Logout
- You'll be logged out after 1 hour of inactivity
- Click "Stay Signed In" to extend your session

### Multiple Logins
- Only one admin account is supported
- Logging in from another device will log you out on the previous device

---

## Troubleshooting

### Can't Log In
- Check email is spelled correctly
- Verify password is correct
- Ensure Caps Lock is off
- If you forgot the password, contact your system administrator

### Changes Not Saving
- Check your internet connection
- Verify all required fields are filled
- Look for error messages in the form
- Try refreshing the page and trying again

### Images Not Uploading
- Check file size (maximum 10MB per image)
- Verify file format (JPG, PNG, GIF, WebP)
- Check your internet connection
- Try a different image file

### Session Expired
- You'll see a "Session Expired" message
- Click "Sign In Again" to return to login page
- Your login credentials are still valid

---

## Security

### Best Practices
- Never share your login credentials
- Log out when finished, especially on shared computers
- Use a strong password (at least 12 characters)
- Change your password regularly

### Reporting Issues
- If you notice suspicious activity, log out immediately
- Report security concerns to your administrator
- Never share your authentication tokens

---

## Getting Help

### Support Resources
- Check the main README.md for setup instructions
- Review SETUP_GUIDE.md for configuration details
- Check browser console for error messages (F12)
- Contact your administrator for access issues

### Common Questions

**Q: Can I have multiple admin accounts?**
A: Currently, only one admin account is supported. You can contact your administrator to change credentials.

**Q: Are there any file upload limits?**
A: Images are limited to 10MB each. Resume files are limited to 5MB.

**Q: How long does content take to appear on the website?**
A: Published content appears immediately. Changes may take a few seconds to sync.

**Q: Can I schedule posts for later?**
A: Scheduling is not currently available. Posts are published immediately upon creation.

---

## Version & Updates

- **Current Version**: 1.0.0
- **Last Updated**: 2026
- **Backend API Version**: v1

---

## Feedback

We'd love to hear your feedback on the admin dashboard! Please share:
- Features you'd like to see
- Issues or bugs you encounter
- Usability improvements

Your input helps us make the dashboard better.
