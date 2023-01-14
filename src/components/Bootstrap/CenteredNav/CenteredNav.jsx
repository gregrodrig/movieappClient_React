import React from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

export default function CenteredNav({ titleText, btnText, modalBody }) {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-light rounded"
        aria-label="Thirteenth navbar example"
      >
        <div className="container-fluid">
          <Link
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample11"
            aria-controls="navbarsExample11"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </Link>

          <div
            className="collapse navbar-collapse d-lg-flex"
            id="navbarsExample11"
          >
            <Link className="navbar-brand col-lg-3 me-0" to="#">
              {titleText}
            </Link>
            <ul className="navbar-nav col-lg-6 justify-content-lg-center"></ul>
            <div className="d-lg-flex col-lg-3 justify-content-lg-end">
              <Modal
                titleText={titleText}
                body={modalBody}
                btnText={btnText}
                btnCloseText="Cancelar"
                btnAcept="Agregar"
              />
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
