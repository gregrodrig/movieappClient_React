import {
  AiOutlineSound,
  AiOutlineUser,
  AiOutlineComment,
  AiOutlineUsergroupAdd,
  AiOutlinePlaySquare,
  AiOutlineGlobal,
  AiOutlineSmile,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";

export default function Sidebar({ content }) {
  let links = [
    {
      label: "Usuarios",
      labelList: "Listado",
      linkList: "/user",
      labelAdd: "Agregar",
      linkAdd: "/user/add",
      icon: <AiOutlineUsergroupAdd className="fs-4" />,
    },
    {
      label: "Director",
      labelList: "Listado",
      linkList: "/director",
      labelAdd: "Agregar",
      linkAdd: "/director/add",
      icon: <AiOutlineSound className="fs-4" />,
    },
    {
      label: "Actor",
      labelList: "Listado",
      linkList: "/actor",
      labelAdd: "Agregar",
      linkAdd: "/actor/add",
      icon: <AiOutlineUser className="fs-4" />,
    },
    {
      label: "Películas",
      labelList: "Listado",
      linkList: "/",
      labelAdd: "Agregar",
      linkAdd: "/addmovie",
      icon: <AiOutlinePlaySquare className="fs-4" />,
    },
    {
      label: "Genero",
      labelList: "Listado",
      linkList: "/genero",
      labelAdd: "Agregar",
      linkAdd: "/genero/add",
      icon: <AiOutlineSmile className="fs-4" />,
    },
    {
      label: "País",
      labelList: "Listado",
      linkList: "/pais",
      labelAdd: "Agregar",
      linkAdd: "/pais/add",
      icon: <AiOutlineGlobal className="fs-4" />,
    },
    {
      label: "Criticas",
      labelList: "Listado",
      linkList: "/criticas",
      labelAdd: "Agregar",
      linkAdd: "/criticas/add",
      icon: <AiOutlineComment className="fs-4" />,
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div
          className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-black ${styles.container}`}
        >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              key="Menu"
              to=""
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start list-unstyled ps-0"
              id="menu"
            >
              {links.map((link, index) => {
                return (
                  <li className="mb-1">
                    <Link
                      key={index}
                      className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed medium"
                      data-bs-toggle="collapse"
                      data-bs-target="#dashboard-collapse"
                      aria-expanded="false"
                    >
                      {link.icon}
                      <span className="ms-1 d-none d-sm-inline">
                        {link.label}
                      </span>
                    </Link>
                    <div className="collapse" id="dashboard-collapse">
                      <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 medium">
                        <li className="nav-item">
                          <Link
                            key="ContentList"
                            to={link.linkList}
                            className="link-dark d-inline-flex text-decoration-none rounded"
                          >
                            {link.labelList}
                          </Link>
                        </li>
                        <li>
                          <Link
                            key="ContentAdd"
                            to={link.linkAdd}
                            className="link-dark d-inline-flex text-decoration-none rounded"
                          >
                            {link.labelAdd}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col bg-light py-3">{content}</div>
      </div>
    </div>
  );
}
