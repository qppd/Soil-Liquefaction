import React from "react";
import adminLogo from "../assets/applogo.png";

export default function Modaleditbarangay() {
  return (
    <div className="modal fade" id="edit">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Municipality | Edit</h4>
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
            <form
              className="form-horizontal"
              method="POST"
              action="municipality-update"
            >
              <input type="hidden" id="edit_id" name="id" />
              <div className="form-group">
                <label htmlFor="name" className="col-sm-3 control-label">
                  Name & Logo
                </label>

                <div className="col-sm-12">
                  <input
                    type="text"
                    className="form-control"
                    id="edit_name"
                    name="name"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6">
                    <label
                      htmlFor="edit_latitude"
                      className="col-sm-6 control-label"
                    >
                      Latitude
                    </label>
                  </div>

                  <div className="col-sm-6">
                    <label
                      htmlFor="edit_longitude"
                      className="col-sm-6 control-label"
                    >
                      Longitude
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="edit_latitude"
                      name="latitude"
                    />
                  </div>

                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="edit_longitude"
                      name="longitude"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="edit_status" className="col-sm-3 control-label">
                  Status
                </label>

                <div className="col-sm-12">
                  <select
                    className="form-control"
                    id="edit_status"
                    name="status"
                    required
                  >
                    <option value="">
                      - Select -
                    </option>
                    <option value="1">Enabled</option>
                    <option value="0">Disabled</option>
                  </select>

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
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
