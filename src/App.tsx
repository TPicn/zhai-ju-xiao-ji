import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/ui/PageTransition';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import LoadingPage from './pages/LoadingPage';
import ReportPage from './pages/ReportPage';
import KnowledgePage from './pages/KnowledgePage';
import KnowledgeDetailPage from './pages/KnowledgeDetailPage';
import BaziPage from './pages/BaziPage';

function RouteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition className="min-h-dvh">
      {children}
    </PageTransition>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RouteWrapper><HomePage /></RouteWrapper>} />
        <Route path="/upload" element={<RouteWrapper><UploadPage /></RouteWrapper>} />
        <Route path="/loading" element={<RouteWrapper><LoadingPage /></RouteWrapper>} />
        <Route path="/report" element={<RouteWrapper><ReportPage /></RouteWrapper>} />
        <Route path="/knowledge" element={<RouteWrapper><KnowledgePage /></RouteWrapper>} />
        <Route path="/knowledge/:id" element={<RouteWrapper><KnowledgeDetailPage /></RouteWrapper>} />
        <Route path="/bazi" element={<RouteWrapper><BaziPage /></RouteWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/zhai-ju-xiao-ji">
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
