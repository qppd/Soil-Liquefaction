import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layouts/navbar";
import Menubar from "../layouts/menubar";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import Scripts from "../layouts/scripts";
import Modaladdbarangay from "../layouts/modaladdbarangay";
import Modaleditbarangay from "../layouts/modaleditbarangay";
import Modaldeletebarangay from "../layouts/modaldeletebarangay";
import Modalevaluatebarangay from "../layouts/modalevaluatebarangay";
import appLogo from "../assets/applogo.png";

export default function Barangay() {
  const [barangays, setBarangays] = useState([]);
  const [dataTableInitialized, setDataTableInitialized] = useState(false);
  const [selectedBarangayId, setSelectedBarangayId] = useState(null);

  const handleEvaluateClick = (id) => {
    setSelectedBarangayId(id);
  };

  const handleDeleteClick = (id) => {
    setSelectedBarangayId(id);
  };

  const fetchBarangays = async () => {
    // Define fetchBarangays here
    try {
      const response = await axios.get("http://127.0.0.1:5000/barangay/fetch");
      console.log("Response from backend:", response);

      // Set the parsed data directly
      setBarangays(response.data);
      setDataTableInitialized(true); // Set DataTable initialization flag
    } catch (error) {
      console.error("Error fetching barangays:", error);
    }
  };

  useEffect(() => {
    fetchBarangays();
  }, []);

  useEffect(() => {
    if (dataTableInitialized) {
      // Initialize DataTable when component mounts and data is fetched
      $("#example3")
        .DataTable()
        .buttons()
        .container()
        .appendTo("#example3_wrapper .col-md-6:eq(0)");
    }
  }, [dataTableInitialized]); // Ensure this effect runs when dataTableInitialized changes

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
          <h1>Soil Liquefaction</h1>
        </div>

        <Navbar />
        <Menubar />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Barangay</h1>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-header">
                    <a
                      href="#add"
                      data-toggle="modal"
                      className="btn btn-primary btn-sm"
                    >
                      <i className="fas fa-plus"></i> New
                    </a>
                    <Modaladdbarangay fetchBarangays={fetchBarangays} />
                  </div>
                  <div className="card-body">
                    {dataTableInitialized ? (
                      <table
                        id="example3"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Barangay Name</th>
                            <th>Susceptibility</th>
                            <th>Status</th>
                            <th>Tools</th>
                          </tr>
                        </thead>
                        <tbody>
                          {barangays &&
                            barangays.map((barangay, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <b>{barangay.name}</b>
                                </td>
                                <td>
                                  {barangay.evaluation === "1" ? (
                                    <span className="badge badge-danger">
                                      YES
                                    </span>
                                  ) : barangay.evaluation === "0" ? (
                                    <span className="badge badge-success">
                                      NO
                                    </span>
                                  ) : (
                                    <span className="badge badge-warning">
                                      PENDING
                                    </span>
                                  )}
                                </td>

                                <td>
                                  {barangay.status === 1 ? (
                                    <span className="badge badge-success">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="badge badge-danger">
                                      Inactive
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <a
                                    href="#evaluate"
                                    data-toggle="modal"
                                    className="btn btn-warning btn-sm"
                                    onClick={() =>
                                      handleEvaluateClick(barangay.id)
                                    } // Pass barangay.id when button is clicked
                                  >
                                    <i className="fas fa-add"></i> Evaluate
                                  </a>

                                  {selectedBarangayId && (
                                    <Modalevaluatebarangay
                                      barangayId={selectedBarangayId}
                                      fetchBarangays={fetchBarangays}
                                    />
                                  )}
                                  {/* <a
                                    href="#edit"
                                    data-toggle="modal"
                                    className="btn btn-success btn-sm"
                                  >
                                    <i className="fas fa-edit"></i> Edit
                                  </a>
                                  <Modaleditbarangay /> */}
                                  <a
                                    href="#delete"
                                    data-toggle="modal"
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      handleDeleteClick(barangay.id)
                                    } // Pass barangay.id when button is clicked
                                  >
                                    <i className="fas fa-trash"></i> Delete
                                  </a>
                                  <Modaldeletebarangay
                                    barangayId={selectedBarangayId}
                                    fetchBarangays={fetchBarangays}
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                        <tfoot></tfoot>
                      </table>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
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
