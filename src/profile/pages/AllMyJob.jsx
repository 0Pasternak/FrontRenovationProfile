import React from "react";
import PropTypes from "prop-types";

import NavBar from "../components/NavBar";

import Footer from "../components/Footer";

import HeaderSection from "../pages_components/MyJob/HeaderSection";
import ProjectsHistory from "../pages_components/MyJob/ProjectsHistory";
function AllMyJob(props) {
  return (
    <>
      <NavBar></NavBar>
      <HeaderSection></HeaderSection>
      <ProjectsHistory></ProjectsHistory>
      <Footer></Footer>
    </>
  );
}

AllMyJob.propTypes = {};

export default AllMyJob;
