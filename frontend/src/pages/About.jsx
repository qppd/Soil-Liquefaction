import React from "react";
import Navbar from "../layouts/navbar";
import Menubar from "../layouts/menubar";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import Scripts from "../layouts/scripts";
import appLogo from "../assets/applogo.png";
import aboutBg from "../assets/images/about.jpg";

export default function About() {
  return (
    <main className="hold-transition layout-top-nav">
      <Header />
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <img
            className="animation__shake"
            src={appLogo}
            alt="Soil Liquefaction"
            height="180"
            width="180"
          />
          <h1 >Soil Liquefaction</h1>
        </div>

        <Navbar />
        <Menubar />
        <div className="content-wrapper" style={{ position: "relative" }}>
          <div className="blur-background" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: `url(${aboutBg})`, filter: "blur(1px)" }} />
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <h2 style={{ marginTop: "20px", color: "white", fontSize: "20px" }}>Soil Liquefaction</h2>
                  <p style={{ color: "white", fontSize: "15px", textIndent: "20px" }}>Soil liquefaction is a critical phenomenon that happens when saturated or partly saturated soil loses its strength and stiffness, making it act like a liquid during an earthquake or other rapid loading conditions. In this web application, the susceptibility of barangays in Guagua, Pampanga to soil liquefaction can be determined through a trained model using Random Forest Algorithm. This website accepts 6 input variables to determine the susceptibility to liquefaction of a barangay. The input variables include Standard Penetration Test Value(N-Value), Natural Moisture Content (ω), Plasticity Index(PI), Fines Content(FC), Average Grain Size (D50), and Groundwater Level(GWL). After inputting these variables, the model will determine the susceptibility by displaying Yes or No. Finally, once the name of the barangay and its susceptibility to liquefaction are saved, this webapp can print the hazard map of Guagua, Pampanga.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="about-section" style={{ background: "white", padding: "20px", position: "absolute", bottom: 0, left: 0, width: "100%" }}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <h2 style={{ color: "black", fontSize: "20px" }}>About Us</h2>
                  <p style={{ color: "black", fontSize: "15px", textIndent: "20px" }}>This web application is the product of the research conducted by Abigan, Juliana Marie C., Dela Cruz, Trixie B., Dumantay, Mark Benedic E., Feliciano, Mikaella E., and Gigante, Reigner C., 4th year college students in Don Honorio Ventura State University - Main Campus. The study is entitled “Soil Liquefaction Susceptibility Mapping Using a Machine Learning Algorithm: A Case of Guagua, Pampanga.”</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
      <Scripts />
    </main>
  );
}
