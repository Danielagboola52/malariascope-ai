// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import MainNav from './components/MainNav';
import LoginPage from "./pages/LoginPage";
import HealthTool from "./pages/HealthTool";
import Doctor from "./pages/Doctor";
import Profile from "./pages/Profile";
import Signup from './pages/Signup';
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Single unified navigation component */}
        <MainNav />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/healthtool" element={<HealthTool />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;