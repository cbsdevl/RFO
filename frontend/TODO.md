# TODO List

## CORS and API Access Configuration
- [x] Update backend CORS to allow both development (localhost:5173) and production (https://risefamily.vercel.app) origins
- [x] Ensure Vite proxy points to localhost:5000 for development
- [ ] Replace hardcoded localhost:5000 fetch URLs in frontend components with relative /api paths to use proxy
- [ ] Test development environment (frontend localhost:5173, backend localhost:5000)
- [ ] Test production environment (frontend https://risefamily.vercel.app, backend https://rfo-fyrk.onrender.com)

## Files to Update (Hardcoded URLs)
- [ ] frontend/src/pages/VolunteerPage.jsx - fetch('http://localhost:5000/api/volunteers')
- [ ] frontend/src/pages/SponsorProjects.jsx - fetch('http://localhost:5000/api/sponsor-projects') and fetch('http://localhost:5000/api/sponsor')
- [ ] frontend/src/pages/NewsArticle.jsx - fetch(`http://localhost:5000/api/news/${id}`)
- [ ] frontend/src/pages/NewsPage.jsx - fetch('http://localhost:5000/api/news')
- [ ] frontend/src/pages/GiftDonation.jsx - fetch('http://localhost:5000/api/donate')
- [ ] frontend/src/pages/GiftCatalog.jsx - fetch('http://localhost:5000/api/gifts')
- [ ] frontend/src/pages/HelpRegistration.jsx - fetch('http://localhost:5000/api/register-help')
- [ ] frontend/src/pages/Contact.jsx - fetch('http://localhost:5000/api/contact')
- [ ] frontend/src/pages/DonationPage.jsx - fetch('http://localhost:5000/api/child-needs') and fetch('http://localhost:5000/api/donate')
- [ ] frontend/src/pages/AdminTestimonials.jsx - fetch('http://localhost:5000/api/admin/testimonials') and fetch(`http://localhost:5000/api/admin/testimonials/${id}`)
- [ ] frontend/src/pages/AdminPartners.jsx - fetch('http://localhost:5000/api/admin/partners') and fetch(`http://localhost:5000/api/admin/partners/${id}`)
- [ ] frontend/src/pages/AdminSponsors.jsx - fetch('http://localhost:5000/api/admin/sponsors') and related URLs
- [ ] frontend/src/pages/AdminSponsorProjects.jsx - fetch('http://localhost:5000/api/admin/sponsor-projects') and related URLs
- [ ] frontend/src/pages/AdminNews.jsx - fetch('http://localhost:5000/api/admin/news') (assuming based on pattern)
- [ ] frontend/src/pages/AdminVolunteers.jsx - fetch('/api/admin/volunteers') (already relative, good)
- [ ] frontend/src/pages/AdminHeroImages.jsx - fetch('/api/admin/hero-images') (already relative, good)
- [ ] frontend/src/pages/AdminChildNeeds.jsx - fetch('/api/admin/child-needs') (assuming based on pattern)

## Testing
- [ ] Start backend server: cd backend && npm run dev
- [ ] Start frontend server: cd frontend && npm run dev
- [ ] Verify API calls work in development
- [ ] Deploy backend and frontend to production
- [ ] Verify API calls work in production
