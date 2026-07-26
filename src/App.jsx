import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageNotFound from '@/pages/PageNotFound';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import VoyageurPage from '@/pages/VoyageurPage';
import ProprietairePage from '@/pages/ProprietairePage';
import Admin from '@/pages/Admin';
import Maintenance from '@/pages/Maintenance';
import MentionsLegales from '@/pages/MentionsLegales';
import PolitiqueConfidentialite from '@/pages/PolitiqueConfidentialite';
import ErrorBoundary from '@/components/ErrorBoundary';
import { fetchSettings } from '@/lib/rentalsApi';

function AdminGuard() {
  if (sessionStorage.getItem("locazen_admin") === "true") {
    return <Admin />;
  }
  return <Navigate to="/" replace />;
}

function AppContent() {
  const [maintenance, setMaintenance] = useState(false);
  const [checked, setChecked] = useState(false);
  const isAdmin = sessionStorage.getItem("locazen_admin") === "true";
  const { pathname } = useLocation();
  const isAdminPath = pathname.includes("locazen-admin");

  useEffect(() => {
    fetchSettings()
      .then((s) => setMaintenance(s.maintenance === "true"))
      .catch(() => {})
      .finally(() => setChecked(true));
  }, []);

  if (!checked) return <div className="min-h-screen bg-[#F0F9FF]" />;

  if (maintenance && !isAdmin) {
    return (
      <Routes>
        <Route path="/locazen-admin" element={<AdminGuard />} />
      <Route path="*" element={<Maintenance />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/voyageur" element={<VoyageurPage />} />
      <Route path="/proprietaire" element={<ProprietairePage />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      <Route path="/locazen-admin" element={<AdminGuard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App

