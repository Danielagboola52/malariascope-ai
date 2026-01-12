// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import MainNav from './components/MainNav';
import LoginPage from "./pages/LoginPage";
import HealthTool from "./pages/HealthTool";
import Doctor from "./pages/Doctor";
import Profile from "./pages/Profile";
import Signup from './pages/Signup';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Location from "./pages/Location";
import About from "./pages/About";

function AppContent() {
  const location = useLocation();
  
  // Hide navigation completely on reset password page
  const hideNavRoutes = ['/resetpassword'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Conditionally render navigation */}
      {showNav && <MainNav />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/healthtool" element={<HealthTool />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/location" element={<Location />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;