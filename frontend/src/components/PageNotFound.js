import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const locObj = useLocation();

  console.log(locObj);

  const home = () => {
    navigate("/home");
  };

  return (
    <section
      className="py-3 py-md-5 min-vh-100 d-flex align-items-center"
      style={{
        backgroundColor: "#f8f9fa",
        textAlign: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                <span className="display-1 fw-bold">4</span>
                <i
                  className="bi bi-exclamation-circle-fill text-danger display-4"
                  aria-hidden="true"
                ></i>
                <span className="display-1 fw-bold">4</span>
              </h2>
              <h3 className="h2 mb-2">Oops! You're lost.</h3>
              <p className="mb-5">
                The page you are looking for was not found.
              </p>
              <button
                className="btn btn-dark rounded-pill px-5 fs-6"
                onClick={home}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
