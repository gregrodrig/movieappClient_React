import { AiOutlineHome, AiOutlineDashboard } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";
export default function Sidebar({ content }) {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div
          className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-black ${styles.container}`}
        >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <Link to="#" className="nav-link align-middle px-0">
                  <AiOutlineHome className="fs-4" />{" "}
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link align-middle px-0">
                  <AiOutlineDashboard className="fs-4" />{" "}
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </Link>
              </li>
            </ul>
            <hr />
            <div className="dropdown pb-4">
              <Link
                to="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="hugenerd"
                  width="30"
                  height="30"
                  className="rounded-circle"
                />
                <span className="d-none d-sm-inline mx-1">loser</span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <Link className="dropdown-item" to="#">
                    New project...
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col bg-light py-3">{content}</div>
      </div>
    </div>
  );
}
