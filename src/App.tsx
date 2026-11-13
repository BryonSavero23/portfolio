import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Portfolio from './pages/Portfolio';

// The admin portal (and the Supabase client it pulls in) is only needed on
// /admin, so keep it out of the bundle every public visitor downloads.
const Admin = lazy(() => import('./pages/Admin'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
              <Admin />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
