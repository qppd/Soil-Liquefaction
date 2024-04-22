import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layouts/navbar";
import Menubar from "../layouts/menubar";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import Scripts from "../layouts/scripts";
import Modaladdadministrator from "../layouts/modaladdadministrator";
import Modaldeleteadministrator from "../layouts/modaldeleteadministrator";
import DataTable from "react-data-table-component";
import appLogo from "../assets/applogo.png";

export default function Administrator() {
  const [administrators, setAdministrators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdministratorId, setSelectedAdministratorId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchAdministrators = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/administrator/fetch"
      );

      console.log(response.data);
      setAdministrators(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching administrators:", error);
    }
  };

  useEffect(() => {
    fetchAdministrators();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedAdministratorId(id);
  };

  const columns = [
    { name: "#", selector: (row, index) => index + 1 },
    { name: "ID", selector: (row) => row.user_id },
    {
      name: "Name",
      selector: (row) => `${row.surname}, ${row.firstname} ${row.middlename}`,
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
            href="#delete"
            data-toggle="modal"
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteClick(row.id)}
          >
            <i className="fas fa-trash"></i> Delete
          </a>
          <Modaldeleteadministrator
            administratorId={selectedAdministratorId}
            fetchAdministrators={fetchAdministrators}
          />
        </div>
      ),
    },
  ];

  const filteredRows = searchText
    ? administrators.filter((row) =>
        Object.values(row).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : administrators;

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
                  <h1>Administrators</h1>
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
                    <Modaladdadministrator fetchAdministrators={fetchAdministrators} />
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
