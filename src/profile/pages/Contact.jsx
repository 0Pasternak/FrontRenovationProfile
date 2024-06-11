import React from "react";
import PropTypes from "prop-types";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import ContactHeader from "../pages_components/Contact/ContactHeader";
import ContactSection from "../pages_components/Contact/ContactSection";
function Contact(props) {
  return (
    <div>
      <NavBar></NavBar>
      <ContactHeader></ContactHeader>
      <ContactSection></ContactSection>

      <Footer></Footer>
    </div>
  );
}

Contact.propTypes = {};

export default Contact;
