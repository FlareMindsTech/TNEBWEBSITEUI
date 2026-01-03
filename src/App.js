import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
