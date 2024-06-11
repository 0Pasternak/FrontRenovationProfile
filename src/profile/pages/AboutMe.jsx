import React from "react";
import PropTypes from "prop-types";

import NavBar from "../components/NavBar";

import HeaderSection from "../pages_components/AboutMe/HeaderSection";
import Presentation from "../pages_components/AboutMe/Presentation";
import Footer from "./../components/Footer";

function AboutMe(props) {
  return (
    <>
      <NavBar></NavBar>
      <HeaderSection></HeaderSection>
      <Presentation></Presentation>
      <Footer></Footer>
    </>
  );
}

AboutMe.propTypes = {};

export default AboutMe;
