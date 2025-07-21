// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#33444E] text-white text-center py-4">
      <p className="text-sm">&copy; {new Date().getFullYear()} MalariaScope AI</p>
    </footer>
  );
};

export default Footer;
