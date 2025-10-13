# RFO (Relief for Orphans) - Full Stack Application

A comprehensive web application for managing orphan relief programs, donations, and administrative operations.

## Features

- **Public Website**: Information about programs, donations, and volunteer opportunities
- **Admin Panel**: Complete management system for content, donations, and users
- **Hero Image Management**: Dynamic sliding images on the homepage
- **Gift Catalog**: Browse and donate gifts for children
- **Donation System**: Secure payment processing with Pesapal integration
- **Contact Management**: Handle inquiries and support requests

## Tech Stack

### Backend
- Node.js with Express.js
- MySQL database
- JWT authentication
- Multer for file uploads
- Nodemailer for email notifications
- Pesapal payment integration

### Frontend
- React 19 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API calls

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Configure environment variables (see `.env.example`)
5. Deploy

### Frontend (Vercel)
1. Create a new project on Vercel
2. Connect your GitHub repository
3. Vercel will automatically detect the React app
4. Configure environment variables:
   - `VITE_API_BASE_URL=https://your-render-backend-url.onrender.com`
5. Deploy

## Environment Variables

### Backend (.env)
```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://your-frontend-url.vercel.app
PESAPAL_CONSUMER_KEY=your_consumer_key
PESAPAL_CONSUMER_SECRET=your_consumer_secret
PESAPAL_ENV=sandbox
PESAPAL_NOTIFICATION_ID=your_notification_id
```

### Frontend (.env.production)
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- Git

### Setup
1. Clone the repository
2. Set up the database using the SQL files in `backend/`
3. Configure environment variables
4. Install dependencies and start development servers

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## API Endpoints

### Public Endpoints
- `GET /api/hero-images` - Get active hero images
- `GET /api/programs` - Get program information
- `POST /api/contact` - Submit contact form
- `POST /api/donate` - Process donations

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/hero-images` - Get all hero images
- `POST /api/admin/hero-images` - Create hero image
- `PUT /api/admin/hero-images/:id` - Update hero image
- `DELETE /api/admin/hero-images/:id` - Delete hero image
- And many more for managing content...

## Database Schema

Key tables:
- `hero_images` - Sliding images for homepage
- `donations` - Donation records
- `gifts` - Gift catalog
- `users` - Admin users
- `contact_messages` - Contact form submissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
