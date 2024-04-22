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
import DataTable from "react-data-table-component";
import appLogo from "../assets/applogo.png";

export default function Barangay() {
  const [barangays, setBarangays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBarangayId, setSelectedBarangayId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchBarangays = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/barangay/fetch");
      setBarangays(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching barangays:", error);
    }
  };

  useEffect(() => {
    fetchBarangays();
  }, []);

  const handleEvaluateClick = (id) => {
    setSelectedBarangayId(id);
  };

  const handleDeleteClick = (id) => {
    setSelectedBarangayId(id);
  };

  const columns = [
    { name: "#", selector: (row, index) => index + 1 },
    { name: "Barangay Name", selector: (row) => <b>{row.name}</b> },
    {
      name: "Susceptibility",
      selector: (row) => {
        switch (row.evaluation) {
          case "1":
            return <span className="badge badge-danger">YES</span>;
          case "0":
            return <span className="badge badge-success">NO</span>;
          default:
            return <span className="badge badge-warning">PENDING</span>;
        }
      },
    },
    {
      name: "Status",
      selector: (row) =>
        row.status === 1 ? (
          <span className="badge badge-success">Active</span>
        ) : (
          <span className="badge badge-danger">Inactive</span>
        ),
    },
    {
      name: "Tools",
      cell: (row) => (
        <div>
          <a
            href="#evaluate"
            data-toggle="modal"
            className="btn btn-warning btn-sm"
            onClick={() => handleEvaluateClick(row.id)}
          >
            <i className="fas fa-add"></i> Evaluate
          </a>
          {selectedBarangayId && (
            <Modalevaluatebarangay
              barangayId={selectedBarangayId}
              fetchBarangays={fetchBarangays}
            />
          )}
          <a
            href="#delete"
            data-toggle="modal"
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteClick(row.id)}
          >
            <i className="fas fa-trash"></i> Delete
          </a>
          <Modaldeletebarangay
            barangayId={selectedBarangayId}
            fetchBarangays={fetchBarangays}
          />
        </div>
      ),
    },
  ];

  const filteredRows = searchText
    ? barangays.filter((row) =>
        Object.values(row).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : barangays;

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
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Search..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <DataTable
                      columns={columns}
                      data={filteredRows}
                      pagination
                      progressPending={loading}
                      noHeader
                      striped
                      highlightOnHover
                      responsive
                    />
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
