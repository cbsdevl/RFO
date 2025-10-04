import React, { Suspense } from 'react';
import VisionMission from '../components/VisionMission';

// Lazy import for Navbar
const LazyNavbar = React.lazy(() => import('../components/Navbar').catch(() => ({ default: () => <nav style={{ backgroundColor: 'blue', color: 'white', padding: '1rem', textAlign: 'center' }}><h3>Navbar Placeholder</h3></nav> })));

export default function VisionMissionPage() {
  return (
    <div>
      <Suspense fallback={<nav style={{ backgroundColor: 'lightgray', padding: '1rem', textAlign: 'center' }}><h3>Loading Navbar...</h3></nav>}>
        <LazyNavbar />
      </Suspense>
      <VisionMission />
    </div>
  );
}
