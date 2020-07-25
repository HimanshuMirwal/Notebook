import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import MiddleTop from "../UserComponents/MiddleTop";
import Features from "../UserComponents/Features";
import Feedback from "../UserComponents/Feedback";
import About from "../UserComponents/About";
import Navbar from "../UserComponents/NavbarArea";
import Footer from "../UserComponents/Footer";

function Webpage() {
  return (
      <div className="container-fluid constainer-class">
      <Navbar />
      <MiddleTop />
      <Features />
      <About />
      <Feedback />
      <Footer />
    </div>

  );
}

export default Webpage;
