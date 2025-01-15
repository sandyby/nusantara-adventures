// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { NavbarProvider } from './contexts/NavbarContext';
import { Toaster } from 'react-hot-toast';

import Home from './pages/HomePage';
import About from './pages/AboutPage';
import TermsAndConditions from './pages/TermsAndConditions';
import Contact from './pages/Contact';
import Destinations from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import Experiences from './pages/ExperiencesPage';
import Blogs from './pages/BlogsPage';
import NotFound from './pages/NotFoundPage';

function App() {
  return (
    <NavbarProvider>
      <ReactLenis root>
        <Router>
          <Navbar />
          <AnimatePresence mode="wait">
            <ScrollToTop />
            <Toaster
              position="top-right"
              containerStyle={{
                top: '100px',
                right: '10px',
              }}
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#fff',
                  color: '#334155',
                  padding: '16px',
                  borderRadius: '0.75rem',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // shadow-lg
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#ffffff',
                  },
                  style: {
                    border: '1px solid #10b981',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#ffffff',
                  },
                  style: {
                    border: '1px solid #ef4444',
                  },
                },
              }}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:destinationId" element={<DestinationDetailPage />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/experiences/:category" element={<Experiences />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </Router>
      </ReactLenis>
    </NavbarProvider>
  );
}

export default App;
