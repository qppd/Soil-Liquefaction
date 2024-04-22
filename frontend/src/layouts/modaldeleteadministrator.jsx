import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios library
import adminLogo from "../assets/applogo.png";

export default function ModalDeleteAdministrator(props) {
  const [deletionData, setDeletionData] = useState({
    id: props.administratorId, // Set the id received from props
  });

  useEffect(() => {
    setDeletionData((prevData) => ({
      ...prevData,
      id: props.administratorId,
    }));
  }, [props.administratorId]);

  const handleDeletion = () => {
    axios
      .delete(`http://127.0.0.1:5000/administrator/delete/${deletionData.id}`, {})
      .then((response) => {
        console.log("Administrator deleted successfully");

        // Reload table data after updating
        props.fetchAdministrators(); // Call the function passed as prop

        // Clear input fields
        setDeletionData({
          id: props.administratorId,
        });

        // Close the modal
        $("#delete").modal("hide");
      })
      .catch((error) => {
        console.error("Error deleting barangay:", error);
      });
  };

  return (
    <div className="modal fade" id="delete">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Administrator | Delete</h4>
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
            <input type="hidden" id="delete_id" name="id" />
            <div className="text-center">
              <h2 className="bold">
                {" "}
                Are you sure you want to delete this Administrator?
              </h2>
            </div>

            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
              <button className="btn btn-danger" onClick={handleDeletion}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
