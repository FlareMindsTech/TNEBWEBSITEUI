import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Cec from './pages/Cec';
import Regional from './pages/Regional';
import Branchsecretary from './pages/Branchsecretary';
import ActRegulations from './pages/ActRegulations';
import ManualsAndFormsDownload from './pages/ManualsAndFormsDownload';
import ContributoryPensionScheme from './pages/ContributoryPensionScheme';
import DistributionRelatedInstructions from './pages/DistributionRelatedInstructions';
import Minnagam from './pages/Minnagam';
import Minthiran from './pages/Minthiran';
import MinthiranBookDetail from './pages/MinthiranBookDetail';
import HandBook from './pages/HandBook';
import TechnicalQa from './pages/TechnicalQa';
import TechnicalParameters from './pages/TechnicalParameters';
import TechnicalBooksAndManuals from './pages/TechnicalBooksAndManuals';
import News from './pages/News';
import ContactUs from './pages/ContactUs';
import ForgotPassword from './pages/ForgotPassword';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import TnebeaForms from './pages/TnebeaForms';
import RoleOf from './pages/RoleOf';
import IntroScreen from './components/IntroScreen';
// import ClickSpark from './components/ClickSpark';
import { SidebarProvider } from './context/SidebarContext';
import './App.css';
import logo from './assets/tnebea_logo_cropped2.png';
import PrivacyPolicy from './pages/PrivacyPolicy';
import BoardProceedings from "./pages/BoardProceedings";
import Photogallery from './pages/Photogallery';
import GalleryDetail from './pages/GalleryDetail';
import TermsAndConditions from './pages/TermsAndConditions';
import Importantnotices from "./components/Importantnotices";

function App() {
  // const [showIntro, setShowIntro] = useState(() => {
  //   // Check if intro has been shown before
  //   const introCompleted = sessionStorage.getItem("intro_completed");
  //   // Show intro if not completed
  //   return !introCompleted;
  // });
  // const [showApp, setShowApp] = useState(() => {
  //   // Show app directly if intro was already completed
  //   const introCompleted = sessionStorage.getItem("intro_completed");
  //   return introCompleted;
  // });

  // // Handle intro completion - show main app
  // const handleIntroComplete = () => {
  //   setShowIntro(false);
  //   // Mark intro as completed
  //   sessionStorage.setItem("intro_completed", "true");
  //   // Show main app immediately
  //   setShowApp(true);
  // };

  // // Prevent scrolling during intro
  // useEffect(() => {
  //   const body = document.body;
  //   if (showIntro) {
  //     body.classList.add('no-scroll');
  //   } else {
  //     body.classList.remove('no-scroll');
  //   }

  //   return () => body.classList.remove('no-scroll');
  // }, [showIntro]);

  return (
    <Router>
      <ScrollToTop />
      <SidebarProvider>
        {/* <ClickSpark
          sparkRadius={50}
          sparkCount={10}
          extraScale={1.3}
        > */}
          <div className="App">
          {/* Intro Screen */}
          {/* {showIntro && <IntroScreen onComplete={handleIntroComplete} />} */}

          
          <div className="app-content">
          <Routes>
            <Route path="/" element={<><Header /><Home /><Footer /></>} />
            <Route path="/cec" element={<><Header /><Cec /><Footer /></>} />
            <Route path="/regional" element={<><Header /><Regional /><Footer /></>} />
            <Route path="/public-secretary" element={<><Header /><Branchsecretary/><Footer /></>} />
            <Route path="/act-regulations" element={<><Header /><ActRegulations /><Footer /></>} />
            <Route path="/manuals-and-forms-download" element={<><Header /><ManualsAndFormsDownload /><Footer /></>} />
            <Route path="/contributory-pension-scheme" element={<><Header /><ContributoryPensionScheme /><Footer /></>} />
            <Route path="/distribution-related-instructions" element={<><Header /><DistributionRelatedInstructions /><Footer /></>} />
            <Route path="/Minnagam" element={<><Header /><Minnagam /><Footer /></>} />
            <Route path="/Minthiran" element={<><Header /><Minthiran /><Footer /></>} />
            <Route path="/minthiran-book/:bookId" element={<><Header /><MinthiranBookDetail /><Footer /></>} />
            <Route path="/hand-book" element={<><Header /><HandBook /><Footer /></>} />
            <Route path="/technical-qa" element={<><Header /><TechnicalQa /><Footer /></>} />
            <Route path="/technical-parameters" element={<><Header /><TechnicalParameters /><Footer /></>} />
            <Route path="/technical-books-and-manuals" element={<><Header /><TechnicalBooksAndManuals /><Footer /></>} />
            <Route path="/news" element={<><Header /><News /><Footer /></>} />
            <Route path="/contactus" element={<><Header /><ContactUs /><Footer /></>} />
            <Route path="/forget" element={<><Navbar /><ForgotPassword /><Footer /></>} />
            <Route path="/tnebea-forms" element={<><Header /><TnebeaForms /><Footer /></>} />
            <Route path="/privacy-policy" element={<><Header /><PrivacyPolicy /><Footer /></>} />
            <Route path="/terms-and-conditions" element={<><Header /><TermsAndConditions /><Footer /></>} />
            <Route path="/important-notices" element={<><Header /><Importantnotices /><Footer /></>} />
            <Route path="/board-proceedings" element={<><Header /><BoardProceedings /><Footer /></>} />
            <Route path="/photo-gallery" element={<><Header /><Photogallery /><Footer /></>} />
            <Route path="/gallery-detail/:galleryId" element={<><Header /><GalleryDetail /><Footer /></>} />
            <Route path="/role-of-honour" element={<><Header /><RoleOf /><Footer /></>} />
          </Routes>
        </div>
      
      </div>
        {/* </ClickSpark> */}
      </SidebarProvider>
    </Router>
  );
}

export default App;
