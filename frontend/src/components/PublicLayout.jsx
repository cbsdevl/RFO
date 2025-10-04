import { lazy, Suspense } from 'react';

// Lazy imports for public layout components
const LazyNavbar = lazy(() => import('./Navbar').catch(() => ({ default: () => <nav style={{ backgroundColor: 'blue', color: 'white', padding: '1rem', textAlign: 'center' }}><h3>Navbar Placeholder</h3></nav> })));
const LazyFooter = lazy(() => import('./Footer').catch(() => ({ default: () => <footer style={{ backgroundColor: 'darkblue', color: 'white', padding: '1rem', textAlign: 'center' }}><p>Footer Placeholder</p></footer> })));

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<nav style={{ backgroundColor: 'lightgray', padding: '1rem', textAlign: 'center' }}><h3>Loading Navbar...</h3></nav>}>
        <LazyNavbar />
      </Suspense>

      {children}

    </div>
  );
}
