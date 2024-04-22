import React, { useState, useEffect } from "react";
import axios from "axios";
import adminLogo from "../assets/applogo.png";

export default function Modalevaluatebarangay(props) {
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [evaluationData, setEvaluationData] = useState({
    id: props.barangayId, // Set the id received from props
    pi: "",
    n: "",
    moisture: "",
    d50: "",
    fc: "",
    gwl: "",
  });
  

  const fetchBarangays = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/barangay/fetch");
      setBarangays(response.data); // Assuming you have setBarangays defined as a state setter
    } catch (error) {
      console.error("Error fetching barangays:", error);
    }
  };
  // Update evaluationData.id when props.barangayId changes
  useEffect(() => {
    setEvaluationData((prevData) => ({
      ...prevData,
      id: props.barangayId,
    }));
  }, [props.barangayId]);

  const handleEvaluation = () => {
    axios
      .post("http://127.0.0.1:5000/evaluate", evaluationData)
      .then((response) => {
        setEvaluationResult(response.data.result);

        // Update liquefaction column in the database
        axios
          .put(`http://127.0.0.1:5000/barangay/update/${evaluationData.id}`, {
            liquefaction: response.data.result === "Yes" ? 1 : 0,
          })
          .then((response) => {
            console.log("Liquefaction column updated successfully");

            // Reload table data after updating
            props.fetchBarangays(); // Call the function passed as prop

            // Clear input fields
            setEvaluationData({
              id: props.barangayId,
              pi: "",
              n: "",
              moisture: "",
              d50: "",
              fc: "",
              gwl: "",
            });

            // Close the modal
            $("#evaluate").modal("hide");
          })
          .catch((error) => {
            console.error("Error updating liquefaction column:", error);
          });
      })
      .catch((error) => {
        console.error("Error evaluating barangay:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEvaluationData({ ...evaluationData, [name]: value });

    
  };

  return (
    <div className="modal fade" id="evaluate">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Barangay | Evaluate</h4>
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
            <input type="hidden" id="edit_id" name="id" />
            <div className="row">
              
              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="n" className="control-label">
                    SPT-N Value
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="n"
                    name="n"
                    value={evaluationData.n}
                    onChange={handleChange}
                    placeholder="SPT-N Value"
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="pi" className="control-label">
                    Plasticity Index
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pi"
                    name="pi"
                    value={evaluationData.pi}
                    onChange={handleChange}
                    placeholder="Plasticity Index"
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="moisture" className="control-label">
                    Moisture Content
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="moisture"
                    name="moisture"
                    value={evaluationData.moisture}
                    onChange={handleChange}
                    placeholder="Moisture Content"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="d50" className="control-label">
                    D50
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="d50"
                    name="d50"
                    value={evaluationData.d50}
                    onChange={handleChange}
                    placeholder="D50"
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="finesContent" className="control-label">
                    Fines Content
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fc"
                    name="fc"
                    value={evaluationData.fc}
                    onChange={handleChange}
                    placeholder="Fines Content"
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="groundWaterLevel" className="control-label">
                    Ground Water Level
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="gwl"
                    name="gwl"
                    value={evaluationData.gwl}
                    onChange={handleChange}
                    placeholder="Ground Water Level"
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
            {/* <button type="submit" className="btn btn-warning">
              Evaluate
            </button> */}

            <button className="btn btn-warning" onClick={handleEvaluation}>
              Evaluate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
