import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import LoadingPage from './pages/LoadingPage';
import ReportPage from './pages/ReportPage';
import KnowledgePage from './pages/KnowledgePage';
import KnowledgeDetailPage from './pages/KnowledgeDetailPage';
import BaziPage from './pages/BaziPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/knowledge" element={<KnowledgePage />} />
        <Route path="/knowledge/:id" element={<KnowledgeDetailPage />} />
        <Route path="/bazi" element={<BaziPage />} />
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
