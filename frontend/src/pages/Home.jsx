import React, { useState, useEffect } from "react";
import Navbar from "../layouts/navbar";
import Menubar from "../layouts/menubar";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import Scripts from "../layouts/scripts";
import Map from "./Map";
import appLogo from "../assets/applogo.png";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async operation (e.g., fetching data)
    const fetchData = async () => {
      // Assuming your async operation here
      // For demonstration, let's use setTimeout to simulate loading
      setTimeout(() => {
        // Set loading to false to hide the preloader
        setLoading(false);
      }, 2000); // Simulating 2 seconds loading time
    };

    // Call the async function
    fetchData();
  }, []); // Run only once on component mount

  return (
    <main className="hold-transition layout-top-nav">
      <Header />
      {loading && (
        <div className="preloader flex-column justify-content-center align-items-center">
          <img
            className="animation__shake"
            src={appLogo}
            alt="Soil Liquefaction"
            height="180"
            width="180"
          />
          <h1>Soil Liquefaction</h1>
        </div>
      )}
      {!loading && (
        <div className="wrapper">
          <Navbar />
          <Menubar />
          {/* <!-- Content Wrapper. Contains page content --> */}
          <div className="content-wrapper">
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1>Dashboard</h1>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Main content --> */}
            <section className="content">
              <div className="container-fluid">
                {/* <!-- Small boxes (Stat box) --> */}
                <div className="row">
                  <div className="col-md-12">
                    <Map />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      )}
      <Scripts />
    </main>
  );
}
