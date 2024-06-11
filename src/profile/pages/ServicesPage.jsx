import React from "react";

import NavBar from "../components/NavBar";
import HeaderSection from "../pages_components/ServicesPage/HeaderSection";
import MyJob from "../pages_components/Home/MyJob";
import RenovationTypes from "../pages_components/ServicesPage/RenovationTypes";
import Footer from "../components/Footer";

function ServicesPage() {
  return (
    <>
      <NavBar></NavBar>
      <HeaderSection></HeaderSection>
      <RenovationTypes></RenovationTypes>
      <Footer></Footer>
    </>
  );
}

ServicesPage.propTypes = {};

export default ServicesPage;
