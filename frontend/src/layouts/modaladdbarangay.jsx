import React, { useState } from "react";
import adminLogo from "../assets/applogo.png";

export default function ModalAddBarangay(props) {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("http://127.0.0.1:5000/barangay/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });

      if (response.ok) {
        // Barangay added successfully, perform any necessary actions (e.g., close modal)
        console.log("Barangay added successfully");
        props.fetchBarangays(); // Call the function passed as prop
        $('#add').modal('hide');

      } else {
        // Handle error responses
        console.error("Failed to add barangay:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while adding barangay:", error.message);
    }
  };

  return (
    <div className="modal fade" id="add">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Barangay | New</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="form-horizontal" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="col-sm-3 control-label">
                  Name
                </label>
                <div className="col-sm-12">
                  <input
                    type="text"
                    className="form-control"
                    id="add_name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              
            </form>
          </div>
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
