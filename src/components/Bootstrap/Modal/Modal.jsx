import { Link } from "react-router-dom";

export default function Modal({
  titleText,
  body,
  btnCloseText,
  btnAcept,
  btnText,
}) {
  return (
    <>
      <Link
        type="button"
        className="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        {btnText}
      </Link>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {titleText}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{body}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                {btnCloseText}
              </button>
              <button type="button" className="btn btn-primary" hidden>
                {btnAcept}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
