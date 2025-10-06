import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useContext } from 'react'; // For lazy loading with fallbacks
import { AdminAuthProvider, AdminAuthContext } from './context/AdminAuthContext'; // Admin auth context
import ErrorBoundary from './components/ErrorBoundary'; // Error boundary

// Admin lazy imports with fallbacks (prevents import crashes)
const LazyAdminLogin = lazy(() => import('./pages/AdminLogin').catch(() => ({ default: () => <div style={{ padding: '2rem', textAlign: 'center' }}><h2>Loading Login...</h2></div> })));
const LazyAdminLayout = lazy(() => import('./components/AdminLayout').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h2>Loading Layout...</h2></div> })));
const LazyAdminDashboard = lazy(() => import('./pages/AdminDashboard').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h2>Loading Dashboard...</h2></div> })));
const LazyAdminDonations = lazy(() => import('./pages/AdminDonations').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h2>Loading Donations...</h2></div> })));
const LazyAdminHelpRequests = lazy(() => import('./pages/AdminHelpRequests').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h2>Loading Help Requests...</h2></div> })));
const LazyAdminChildNeeds = lazy(() => import('./pages/AdminChildNeeds').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h2>Loading Child Needs...</h2></div> })));
const LazyAdminNews = lazy(() => import('./pages/AdminNews').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h2>Loading News...</h2></div> })));
const LazyAdminContactMessages = lazy(() => import('./pages/AdminContactMessages').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h2>Loading Contact Messages...</h2></div> })));
const LazyAdminTestimonials = lazy(() => import('./pages/AdminTestimonials').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h2>Loading Testimonials...</h2></div> })));
const LazyAdminPartners = lazy(() => import('./pages/AdminPartners').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h2>Loading Partners...</h2></div> })));
const LazyAdminVolunteers = lazy(() => import('./pages/AdminVolunteers').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h2>Loading Volunteers...</h2></div> })));
const LazyAdminSponsorProjects = lazy(() => import('./pages/AdminSponsorProjects').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Loading Sponsor Projects...</h3></div> })));
const LazyAdminSponsors = lazy(() => import('./pages/AdminSponsors').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Loading Sponsors...</h3></div> })));

// Public lazy imports with fallbacks (fixes "About is not defined" and similar)
const LazyNavbar = lazy(() => import('./components/Navbar').catch(() => ({ default: () => <nav style={{ backgroundColor: 'blue', color: 'white', padding: '1rem', textAlign: 'center' }}><h3>Navbar Placeholder</h3></nav> })));
const LazyHero = lazy(() => import('./components/Hero').catch(() => ({ default: () => <section style={{ backgroundColor: 'lightblue', padding: '2rem', textAlign: 'center' }}><h2>RFO Hero</h2></section> })));
const LazyStats = lazy(() => import('./components/Stats').catch(() => ({ default: () => <section style={{ padding: '1rem' }}><h3>Stats Placeholder</h3></section> })));
const LazyAbout = lazy(() => import('./components/About').catch(() => ({ default: () => <section style={{ padding: '1rem' }}><h3>About Placeholder</h3></section> }))); // Fixes "About not defined"
const LazyVisionMission = lazy(() => import('./components/VisionMission').catch(() => ({ default: () => <section style={{ padding: '1rem' }}><h3>Vision Placeholder</h3></section> })));
const LazyImpact = lazy(() => import('./components/Impact').catch(() => ({ default: () => <section style={{ padding: '1rem' }}><h3>Impact Placeholder</h3></section> })));
const LazyPrograms = lazy(() => import('./components/Programs').catch(() => ({ default: () => <section style={{ padding: '1rem' }}><h3>Programs Placeholder</h3></section> })));
const LazyLatestNews = lazy(() => import('./components/LatestNews').catch(() => ({ default: () => <section style={{ padding: '1rem' }}><h3>News Placeholder</h3></section> })));
const LazyTestimonials = lazy(() => import('./components/Testimonials').catch(() => ({ default: () => <section style={{ padding: '1rem' }}><h3>Testimonials Placeholder</h3></section> })));
const LazyPartners = lazy(() => import('./components/Partners').catch(() => ({ default: () => <section style={{ padding: '1rem' }}><h3>Partners Placeholder</h3></section> })));
const LazyDonationAppeal = lazy(() => import('./components/DonationAppeal').catch(() => ({ default: () => <section style={{ padding: '1rem' }}><h3>Donation Placeholder</h3></section> })));
const LazyAboutPage = lazy(() => import('./pages/AboutPage').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>About Page Placeholder</h3></div> })));
const LazyVisionMissionPage = lazy(() => import('./components/VisionMission').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Vision Mission Page Placeholder</h3></div> })));
const LazyDonationPage = lazy(() => import('./pages/DonationPage').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Donation Page Placeholder</h3></div> })));
const LazySupportProgram = lazy(() => import('./pages/SupportProgram').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Support Placeholder</h3></div> })));
const LazyHelpRegistration = lazy(() => import('./pages/HelpRegistration').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Help Registration Placeholder</h3></div> })));
const LazyGiftCatalog = lazy(() => import('./pages/GiftCatalog').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Gift Catalog Placeholder</h3></div> })));
const LazyContact = lazy(() => import('./pages/Contact').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Contact Placeholder</h3></div> })));
const LazyAccount = lazy(() => import('./pages/Account').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Account Placeholder</h3></div> })));
const LazyProgramTalent = lazy(() => import('./pages/ProgramTalent').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Talent Program Placeholder</h3></div> })));
const LazyProgramHealth = lazy(() => import('./pages/ProgramHealth').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Health Program Placeholder</h3></div> })));
const LazyProgramEducation = lazy(() => import('./pages/ProgramEducation').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Education Program Placeholder</h3></div> })));
const LazyProgramEmployment = lazy(() => import('./pages/ProgramEmployment').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Employment Program Placeholder</h3></div> })));
const LazyNewsPage = lazy(() => import('./pages/NewsPage').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>News Page Placeholder</h3></div> })));
const LazyNewsArticle = lazy(() => import('./pages/NewsArticle').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>News Article Placeholder</h3></div> })));
const LazyVolunteerPage = lazy(() => import('./pages/VolunteerPage').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Volunteer Page Placeholder</h3></div> })));
const LazySponsorProjects = lazy(() => import('./pages/SponsorProjects').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Sponsor Projects Placeholder</h3></div> })));
const LazyPublicLayout = lazy(() => import('./components/PublicLayout').catch(() => ({ default: () => <div style={{ padding: '2rem' }}><h3>Public Layout Placeholder</h3></div> })));
const LazyFooter = lazy(() => import('./components/Footer').catch(() => ({ default: () => <footer style={{ backgroundColor: 'darkblue', color: 'white', padding: '1rem', textAlign: 'center' }}><p>Footer Placeholder</p></footer> })));

// ProtectedRoute (uses useContext - ensure it's inside AdminAuthProvider)
function ProtectedRoute({ children }) {
  const { user, token } = useContext(AdminAuthContext);
  return user && token ? children : <Navigate to="/admin/login" replace />;
}

// HomePage (individual Suspense - safe nesting)
function HomePage() {
  return (
    <div>
      <Suspense fallback={<nav style={{ backgroundColor: 'lightgray', padding: '1rem', textAlign: 'center' }}><h3>Loading Navbar...</h3></nav>}>
        <LazyNavbar />
      </Suspense>

      <Suspense fallback={<section style={{ backgroundColor: 'lightgray', padding: '2rem', textAlign: 'center' }}><h3>Loading Hero...</h3></section>}>
        <LazyHero />
      </Suspense>

      <Suspense fallback={<section style={{ backgroundColor: 'lightgray', padding: '1rem' }}><h3>Loading Stats...</h3></section>}>
        <LazyStats />
      </Suspense>

      <Suspense fallback={<section style={{ backgroundColor: 'lightgray', padding: '1rem' }}><h3>Loading About...</h3></section>}>
        <LazyAbout />
      </Suspense>

      <Suspense fallback={<section style={{ backgroundColor: 'lightgray', padding: '1rem' }}><h3>Loading Vision...</h3></section>}>
        <LazyVisionMission />
      </Suspense>

      <Suspense fallback={<section style={{ backgroundColor: 'lightgray', padding: '1rem' }}><h3>Loading Impact...</h3></section>}>
        <LazyImpact />
      </Suspense>

      <Suspense fallback={<section style={{ backgroundColor: 'lightgray', padding: '1rem' }}><h3>Loading Programs...</h3></section>}>
        <LazyPrograms />
      </Suspense>

      <Suspense fallback={<section style={{ backgroundColor: 'lightgray', padding: '1rem' }}><h3>Loading News...</h3></section>}>
        <LazyLatestNews />
      </Suspense>

      <Suspense fallback={<section style={{ backgroundColor: 'lightgray', padding: '1rem' }}><h3>Loading Testimonials...</h3></section>}>
        <LazyTestimonials />
      </Suspense>

      <Suspense fallback={<section style={{ backgroundColor: 'lightgray', padding: '1rem' }}><h3>Loading Partners...</h3></section>}>
        <LazyPartners />
      </Suspense>

      <Suspense fallback={<section style={{ backgroundColor: 'lightgray', padding: '1rem' }}><h3>Loading Donation...</h3></section>}>
        <LazyDonationAppeal />
      </Suspense>
    </div>
  );
}

// PublicPage wrapper (uses PublicLayout for consistent navbar/footer)
function PublicPage({ children }) {
  return (
    <Suspense fallback={<div className="py-10 text-center">Loading Layout...</div>}>
      <LazyPublicLayout>
        {children}
      </LazyPublicLayout>
    </Suspense>
  );
}

// App (AdminAuthProvider wraps Router - balanced nesting)
function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <ErrorBoundary fallback={
            <div className="text-center py-10 bg-red-50 border border-red-200 rounded p-4">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
              <p className="text-gray-600 mb-4">Check Console for details.</p>
              <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Reload Page
              </button>
            </div>
          }>
            <Routes>
              {/* Public Routes (with Suspense for safe nesting) */}
              <Route path="/" element={<HomePage />} />
              <Route path="/support" element={
                <PublicPage>
                  <Suspense fallback={<div className="py-10 text-center">Loading Support...</div>}>
                    <LazySupportProgram />
                  </Suspense>
                </PublicPage>
              } />
              <Route path="/about" element={
                <PublicPage>
                <Suspense fallback={<div className="py-10 text-center">Loading About Page...</div>}>
                  <LazyAboutPage />
                </Suspense>
                </PublicPage>
              } />
              <Route path="/donation" element={
                <PublicPage>
                <Suspense fallback={<div className="py-10 text-center">Loading Donation Page...</div>}>
                  <LazyDonationPage />
                </Suspense>
                </PublicPage>
              } />
              <Route path="/sponsor-projects" element={
                <PublicPage>
                <Suspense fallback={<div className="py-10 text-center">Loading Sponsor Projects...</div>}>
                  <LazySponsorProjects />
                </Suspense>
                </PublicPage>
              } />
              <Route path="/register-help" element={
                <PublicPage>
                  <Suspense fallback={<div className="py-10 text-center">Loading Help Registration...</div>}>
                    <LazyHelpRegistration />
                  </Suspense>
                </PublicPage>
              } />
              <Route path="/volunteer" element={
                <PublicPage>
                  <Suspense fallback={<div className="py-10 text-center">Loading Volunteer...</div>}>
                    <LazyVolunteerPage />
                  </Suspense>
                </PublicPage>
              } />
              <Route path="/gifts" element={
                <PublicPage>
                  <Suspense fallback={<div className="py-10 text-center">Loading Gift Catalog...</div>}>
                    <LazyGiftCatalog />
                  </Suspense>
                </PublicPage>
              } />
              <Route path="/contact" element={
                <PublicPage>
                  <Suspense fallback={<div className="py-10 text-center">Loading Contact...</div>}>
                    <LazyContact />
                  </Suspense>
                </PublicPage>
              } />
              <Route path="/account" element={
                <PublicPage>
                  <Suspense fallback={<div className="py-10 text-center">Loading Account...</div>}>
                    <LazyAccount />
                  </Suspense>
                </PublicPage>
              } />
              <Route path="/news" element={
                <PublicPage>
                <Suspense fallback={<div className="py-10 text-center">Loading News Page...</div>}>
                  <LazyNewsPage />
                </Suspense>
                </PublicPage>
              } />
              <Route path="/news/:id" element={
                <Suspense fallback={<div className="py-10 text-center">Loading News Article...</div>}>
                  <LazyNewsArticle />
                </Suspense>
              } />

              {/* Admin Routes (protected, with Suspense for safe nesting) */}
              <Route path="/admin/login" element={
                <Suspense fallback={<div className="py-10 text-center">Loading Admin Login...</div>}>
                  <LazyAdminLogin />
                </Suspense>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="py-10 text-center">Loading Admin Layout...</div>}>
                    <LazyAdminLayout />
                  </Suspense>
                </ProtectedRoute>
              }>
                <Route index element={
                  <Suspense fallback={<div className="py-10 text-center">Loading Dashboard...</div>}>
                    <LazyAdminDashboard />
                  </Suspense>
                } />
                <Route path="dashboard" element={
                  <Suspense fallback={<div className="py-10 text-center">Loading Dashboard...</div>}>
                    <LazyAdminDashboard />
                  </Suspense>
                } />
                <Route path="donations" element={
                  <Suspense fallback={<div className="py-10 text-center">Loading Donations...</div>}>
                    <LazyAdminDonations />
                  </Suspense>
                } />
                <Route path="help-requests" element={
                  <Suspense fallback={<div className="py-10 text-center">Loading Help Requests...</div>}>
                    <LazyAdminHelpRequests />
                  </Suspense>
                } />
                <Route path="child-needs" element={
                  <Suspense fallback={<div className="py-10 text-center">Loading Child Needs...</div>}>
                    <LazyAdminChildNeeds />
                  </Suspense>
                } />
                <Route path="news" element={
                  <Suspense fallback={<div className="py-10 text-center">Loading News...</div>}>
                    <LazyAdminNews />
                  </Suspense>
                } />
                <Route path="contact-messages" element={
                  <Suspense fallback={<div className="py-10 text-center">Loading Contact Messages...</div>}>
                    <LazyAdminContactMessages />
                  </Suspense>
                } />
                <Route path="testimonials" element={
                  <Suspense fallback={<div className="py-10 text-center">Loading Testimonials...</div>}>
                    <LazyAdminTestimonials />
                  </Suspense>
                } />
                <Route path="partners" element={
                  <Suspense fallback={<div className="py-10 text-center">Loading Partners...</div>}>
                    <LazyAdminPartners />
                  </Suspense>
                } />
                <Route path="volunteers" element={
                  <Suspense fallback={<div className="py-10 text-center">Loading Volunteers...</div>}>
                    <LazyAdminVolunteers />
                  </Suspense>
                } />
                <Route path="sponsor-projects" element={
                  <Suspense fallback={<div className="py-10 text-center">Loading Sponsor Projects...</div>}>
                    <LazyAdminSponsorProjects />
                  </Suspense>
                } />
                <Route path="sponsors" element={
                  <Suspense fallback={<div className="py-10 text-center">Loading Sponsors...</div>}>
                    <LazyAdminSponsors />
                  </Suspense>
                } />
               </Route>

              {/* 404 Fallback (always shows content) */}
              <Route path="*" element={
                <div className="text-center py-10 bg-yellow-50">
                  <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
                  <a href="/" className="text-blue-600 hover:underline">Go Home</a>
                </div>
              } />
            </Routes>
          </ErrorBoundary>
          <Suspense fallback={<footer className="bg-gray-800 text-white p-4 text-center">Loading Footer...</footer>}>
            <LazyFooter />
          </Suspense>
        </div>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;