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
import LearningPage from './pages/LearningPage';
import LearningDetailPage from './pages/LearningDetailPage';
import DaoismPage from './pages/DaoismPage';
import DaoismCategoryPage from './pages/DaoismCategoryPage';
import DaoismDetailPage from './pages/DaoismDetailPage';

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
        <Route path="/learning" element={<RouteWrapper><LearningPage /></RouteWrapper>} />
        <Route path="/learning/:id" element={<RouteWrapper><LearningDetailPage /></RouteWrapper>} />
        <Route path="/daojia" element={<RouteWrapper><DaoismPage /></RouteWrapper>} />
        <Route path="/daojia/:category" element={<RouteWrapper><DaoismCategoryPage /></RouteWrapper>} />
        <Route path="/daojia/:category/:id" element={<RouteWrapper><DaoismDetailPage /></RouteWrapper>} />
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
