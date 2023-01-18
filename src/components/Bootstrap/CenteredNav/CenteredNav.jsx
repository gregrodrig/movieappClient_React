import React from "react";
import { Link } from "react-router-dom";

export default function CenteredNav({ titleText, btnText, btnLink }) {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-light rounded"
        aria-label="Thirteenth navbar example"
      >
        <div className="container-fluid">
          <Link
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsModelsList"
            aria-controls="navbarsModelsList"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Link>

          <div
            className="collapse navbar-collapse d-lg-flex"
            id="navbarsModelsList"
          >
            <Link className="navbar-brand col-lg-3 me-0" to="#">
              {titleText}
            </Link>
            <ul className="navbar-nav col-lg-6 justify-content-lg-center"></ul>
            <div className="d-lg-flex col-lg-3 justify-content-lg-end">
              <Link to={btnLink} className={`btn btn-dark`}>
                {btnText}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <hr className="border border-dark border-2 opacity-50" />
      </div>
    </>
  );
}
