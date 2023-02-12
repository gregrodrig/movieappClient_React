import { useEffect, useState } from "react";
import styles from "../Director/Director.module.css";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import CenteredNav from "../../components/Bootstrap/CenteredNav/CenteredNav";
import Sidebar from "../../components/Bootstrap/Sidebar/Sidebar";
import SidebarBody from "../../components/Bootstrap/SidebarBody/SidebarBody";
import { Empty } from "../../components/EmptyMovie/Empty";
import Spinner from "../../components/Spinner/Spinner";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import {
  apiUserDelete,
  apiUserGet,
  apiUserPut,
} from "../../utils/api/Connection/ApiUser";
import { customStyles } from "../../css/tableStyle";
import style from "./UserRegister.module.css";

export default function UserRegister() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [usersPending, setUsersPending] = useState(false);

  const PATH = "users/enable";

  const callUser = async (value) => {
    await apiUserGet(`${PATH}/${value}/`, setData);
    setUsersPending(value);
    return getUsers(value);
  };

  const getUsers = async (value) => {
    setLoading(true);
    await apiUserGet(`${PATH}/${value}`, setData);
    setLoading(false);
  };

  useEffect(() => {
    getUsers(usersPending);
  }, [usersPending]);

  const handleDelete = (idUsuario, userName) => {
    if (
      window.confirm(
        `Seguro deseas eliminar el usuario ${userName}, No.: ${idUsuario}?`
      )
    ) {
      apiUserDelete(`users/${idUsuario}`);
      alert(
        `Usuario ${userName}, No.: ${idUsuario} ya fue eliminado con éxito!`
      );
      getUsers(usersPending);
    }
  };
  const handleAproved = async (idUsuario, userName) => {
    if (
      window.confirm(
        `Seguro deseas aprobar al usuario ${userName}, No.: ${idUsuario}?`
      )
    ) {
      apiUserPut(`users/aprobarUsuario/${idUsuario}`);
      alert(`Usuario ${userName}, No.: ${idUsuario} fue aprobado con éxito!`);
      getUsers(usersPending);
    }
  };
  const columnas = [
    {
      name: "#",
      selector: (row) => row.idUsuario,
      width: "6vw",
    },
    {
      name: "Nombre completo",
      selector: (row) => row.username,
    },
    {
      name: "Correo electronico",
      selector: (row) => row.correo,
    },
    {
      name: "Rol",
      selector: (row) => row.roles?.map((rol) => rol.authority),
      width: "10vw",
    },
    {
      name: "Acciones",
      width: "10vw",
      // grow: 2,
      button: true,
      cell: (row) => (
        <div className={`${styles.linkContainer}`}>
          <div>
            {usersPending ? null : (
              <Link
                onClick={() => handleAproved(row.idUsuario, row.username)}
                className={`btn btn-dark ${styles.linkAprobar}`}
              >
                <AiOutlineCheck />
              </Link>
            )}
          </div>
          <div>
            <Link
              onClick={() => handleDelete(row.idUsuario, row.username)}
              className={`btn btn-dark ${styles.linkEliminar}`}
            >
              <AiOutlineDelete />
            </Link>
          </div>
          <div>
            <Link
              className={`btn btn-dark ${styles.link}`}
              to={`edit/${row.idUsuario}`}
            >
              <AiOutlineEdit />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Spinner />}
      {!data ? (
        <Empty msg="" />
      ) : (
        <Sidebar
          content={
            <SidebarBody
              contentTop={
                <CenteredNav
                  titleText="Nuevo Usuario"
                  btnText="Agregar"
                  btnLink="add"
                />
              }
              contenButtom={
                <>
                  <div style={{ margin: "1em 0px 1.6em" }}>
                    <Link
                      className={!usersPending ? "active" : "inactive"}
                      onClick={() => {
                        callUser(false);
                      }}
                    >
                      Pendiente
                    </Link>{" "}
                    <Link
                      className={usersPending ? "active" : "inactive"}
                      onClick={() => {
                        callUser(true);
                      }}
                    >
                      Aprobado
                    </Link>
                  </div>
                  <DataTable
                    customStyles={customStyles}
                    title=" "
                    columns={columnas}
                    data={data}
                    keyField="idUsuario"
                    pagination
                  />
                </>
              }
            />
          }
        />
      )}
    </>
  );
}
