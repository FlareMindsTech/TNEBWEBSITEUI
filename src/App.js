import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Cec from './pages/Cec';
import ActRegulations from './pages/ActRegulations';
import ManualsAndFormsDownload from './pages/ManualsAndFormsDownload';
import ContributoryPensionScheme from './pages/ContributoryPensionScheme';
import DistributionRelatedInstructions from './pages/DistributionRelatedInstructions';
import Minnagam from './pages/Minnagam';
import HandBook from './pages/HandBook';
import TechnicalQa from './pages/TechnicalQa';
import TechnicalParameters from './pages/TechnicalParameters';
import TechnicalBooksAndManuals from './pages/TechnicalBooksAndManuals';
import News from './pages/News';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import TnebeaForms from './pages/TnebeaForms';
import ClickSpark from './components/ClickSpark';
import { SidebarProvider } from './context/SidebarContext';
import './App.css';
import logo from './assets/tnebea_logo_cropped2.png';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("visited")) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  useEffect(() => {
    const body = document.body;
    if (showSplash) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }

    return () => body.classList.remove('no-scroll');
  }, [showSplash]);

  return (
    <Router>
      <ScrollToTop />
      <SidebarProvider>
        <ClickSpark
          sparkRadius={50}
          sparkCount={10}
          extraScale={1.3}
        >
          <div className="App">
          {showSplash && (
            <div className="splash-screen">
              <div className="splash-logo-circle">
                <img src={logo} alt="TNEB Engineers Association" className="splash-logo" />
              </div>
              <div className="splash-welcome">Welcome to TNEB</div>
              <div className="splash-brand">TNEB Engineers Association</div>
              <div className="splash-subtext">Tamilnadu Electricity Board | Engineers</div>
            </div>
          )}

          <div className="app-content">
          <Routes>
            <Route path="/" element={<><Header /><Home /><Footer /></>} />
            <Route path="/cec" element={<><Header /><Cec /><Footer /></>} />
            <Route path="/act-regulations" element={<><Header /><ActRegulations /><Footer /></>} />
            <Route path="/manuals-and-forms-download" element={<><Header /><ManualsAndFormsDownload /><Footer /></>} />
            <Route path="/contributory-pension-scheme" element={<><Header /><ContributoryPensionScheme /><Footer /></>} />
            <Route path="/distribution-related-instructions" element={<><Header /><DistributionRelatedInstructions /><Footer /></>} />
            <Route path="/minnagam" element={<><Header /><Minnagam /><Footer /></>} />
            <Route path="/hand-book" element={<><Header /><HandBook /><Footer /></>} />
            <Route path="/technical-qa" element={<><Header /><TechnicalQa /><Footer /></>} />
            <Route path="/technical-parameters" element={<><Header /><TechnicalParameters /><Footer /></>} />
            <Route path="/technical-books-and-manuals" element={<><Header /><TechnicalBooksAndManuals /><Footer /></>} />
            <Route path="/news" element={<><Header /><News /><Footer /></>} />
            <Route path="/contactus" element={<><Header /><ContactUs /><Footer /></>} />
            <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
            <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
            <Route path="/forget" element={<><Navbar /><ForgotPassword /><Footer /></>} />
            <Route path="/tnebea-forms" element={<><Navbar /><TnebeaForms /><Footer /></>} />
            <Route path="/privacy-policy" element={<><Header /><PrivacyPolicy /><Footer /></>} />
            <Route path="/terms-and-conditions" element={<><Header /><TermsAndConditions /><Footer /></>} />
          </Routes>
        </div>
      </div>
        </ClickSpark>
      </SidebarProvider>
    </Router>
  );
}

export default App;
