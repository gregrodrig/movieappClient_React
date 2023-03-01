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
      icon: <AiOutlineUsergroupAdd className="fs-4" />,
      children: [
        {
          link: "/user/add",
          label: "Agregar",
        },
        {
          link: "/user",
          label: "Listado",
        },
      ],
    },
    {
      label: "Director",
      icon: <AiOutlineSound className="fs-4" />,
      children: [
        {
          link: "/director/add",
          label: "Agregar",
        },
        {
          link: "/director",
          label: "Listado",
        },
      ],
    },
    {
      label: "Actor",
      icon: <AiOutlineUser className="fs-4" />,
      children: [
        {
          link: "/actor/add",
          label: "Agregar",
        },
        {
          link: "/actor",
          label: "Listado",
        },
      ],
    },
    {
      label: "Películas",
      icon: <AiOutlinePlaySquare className="fs-4" />,
      children: [
        {
          link: "/addmovie",
          label: "Agregar",
        },
        {
          link: "/",
          label: "Listado",
        },
      ],
    },
    {
      label: "Genero",
      icon: <AiOutlineSmile className="fs-4" />,
      children: [
        {
          link: "/genero/add",
          label: "Agregar",
        },
        {
          link: "/genero",
          label: "Listado",
        },
      ],
    },
    {
      label: "País",
      icon: <AiOutlineGlobal className="fs-4" />,
      children: [
        {
          link: "/pais/add",
          label: "Agregar",
        },
        {
          link: "/pais",
          label: "Listado",
        },
      ],
    },
    {
      label: "Críticas",
      icon: <AiOutlineComment className="fs-4" />,
      children: [
        {
          link: "/",
          label: "Agregar",
        },
        {
          link: "/criticas",
          label: "Listado",
        },
      ],
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
              className={`nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start list-unstyled ps-0 ${styles.containerLi}`}
              id="menu"
            >
              {links.map((link, index) => {
                return (
                  <li className={`mb-1 ${styles.containerDetails} `}>
                    <Link
                      key={index}
                      className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed medium"
                      data-bs-toggle="collapse"
                      data-bs-target={`#dashboard-collapse-${index}`}
                      aria-expanded="false"
                    >
                      {link.icon}
                      <span className="ms-1 d-none d-sm-inline">
                        {link.label}
                      </span>
                    </Link>
                    <div
                      className={`collapse`}
                      id={`dashboard-collapse-${index}`}
                    >
                      <ul
                        className={`btn-toggle-nav list-unstyled fw-normal pb-1 medium ${styles.containerDetailsLink}`}
                      >
                        {link.children?.map((child, index) => {
                          return (
                            <li className="nav-item" key={index}>
                              <Link
                                to={child.link}
                                className="link-light d-inline-flex text-decoration-none rounded"
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
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
