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
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cec" element={<Cec />} />
          <Route path="/act-regulations" element={<ActRegulations />} />
          <Route path="/manuals-and-forms-download" element={<ManualsAndFormsDownload />} />
          <Route path="/contributory-pension-scheme" element={<ContributoryPensionScheme />} />
          <Route path="/distribution-related-instructions" element={<DistributionRelatedInstructions />} />
          <Route path="/minnagam" element={<Minnagam />} />
          <Route path="/hand-book" element={<HandBook />} />
          <Route path="/technical-qa" element={<TechnicalQa />} />
          <Route path="/technical-parameters" element={<TechnicalParameters />} />
          <Route path="/technical-books-and-manuals" element={<TechnicalBooksAndManuals />} />
          <Route path="/news" element={<News />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
