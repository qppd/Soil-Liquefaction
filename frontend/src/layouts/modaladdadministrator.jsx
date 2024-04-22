import React, { useState } from "react";
import userLogo from "../assets/user.jpg";

export default function ModalAddAdministrator(props) {
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [surname, setSurname] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("middlename", middlename);
      formData.append("surname", surname);
      formData.append("photo", photo);

      const response = await fetch("http://127.0.0.1:5000/administrator/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Administrator added successfully, perform any necessary actions (e.g., close modal)
        console.log("Administrator added successfully");
        props.fetchAdministrators(); // Call the function passed as prop
        $("#add").modal("hide");
      } else {
        // Handle error responses
        console.error("Failed to add administrator:", response.statusText);
      }
    } catch (error) {
      console.error(
        "Error occurred while adding administrator:",
        error.message
      );
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    const imageUrl = URL.createObjectURL(file);
    document.getElementById("administrator_photo").src = imageUrl;
  };

  return (
    <div className="modal fade" id="add">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Adminsitrator | New</h4>
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
              <p>Select a photo of the sub administrator.</p>

              <div className="form-group">
                <label htmlFor="photo" className="col-sm-3 control-label">
                  Photo
                </label>

                <div className="col-xs-3">
                  <img
                    className="box-style"
                    src={userLogo}
                    id="administrator_photo"
                    width="170px"
                    height="150px"
                    alt="Administrator"
                  />
                </div>
                <input
                  type="file"
                  placeholder=""
                  className="file-chooser"
                  onChange={handleImageChange}
                  id="photo"
                  name="photo"
                  accept="image/*"
                  required
                />
              </div>

              <p>Fill administrator's personal information below.</p>
              <div className="row">
                <div className="col-sm-5">
                  <div className="form-group">
                    <label htmlFor="surname" className="col-sm-12 control-label">
                      Last Name
                    </label>
                    <div className="col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        id="surname"
                        name="surname"
                        placeholder="Ex: Dela Cruz"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="form-group">
                    <label htmlFor="firstname" className="col-sm-12 control-label">
                      First Name
                    </label>
                    <div className="col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        name="firstname"
                        placeholder="Ex: Juan"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="middlename" className="col-sm-12 control-label">
                      Middle Initial
                    </label>
                    <div className="col-xs-12">
                      <input
                        type="text"
                        className="form-control"
                        id="middlename"
                        name="middlename"
                        placeholder="Ex: L"
                        value={middlename}
                        onChange={(e) => setMiddlename(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer justify-content-between">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
