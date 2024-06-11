import React from "react";

import NavBar from "./../components/NavBar";
import Header from "./../pages_components/Home/Header";
import SectionStats from "./../pages_components/Home/SectionStats";
import BudgetRequest from "./../pages_components/Home/BudgetRequest";
import Services from "./../pages_components/Home/Services";
import MyJob from "./../pages_components/Home/MyJob";
import Contacto from "./../pages_components/Home/Contacto";
import Footer from "./../components/Footer";

function Home() {
  return (
    <>
      <NavBar></NavBar>
      <Header></Header>
      <SectionStats></SectionStats>
      <BudgetRequest></BudgetRequest>
      <Services></Services>
      <MyJob></MyJob>
      <Contacto></Contacto>
      <Footer></Footer>
    </>
  );
}

export default Home;
