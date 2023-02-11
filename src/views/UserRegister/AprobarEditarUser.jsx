import { useEffect, useState } from "react";
import styles from "../Director/Director.module.css";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import CenteredNav from "../../components/Bootstrap/CenteredNav/CenteredNav";
import Sidebar from "../../components/Bootstrap/Sidebar/Sidebar";
import SidebarBody from "../../components/Bootstrap/SidebarBody/SidebarBody";
import { Empty } from "../../components/EmptyMovie/Empty";
import Spinner from "../../components/Spinner/Spinner";
import {
  axiosDelete,
  axiosGet,
} from "../../utils/api/Connection/ConnectionApi";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import {
  apiUserDelete,
  apiUserGet,
  apiUserPut,
} from "../../utils/api/Connection/ApiUser";

export default function AprobarEditarUser() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [usersPending, setUsersPending] = useState(false);

  const PATH = "users/enable";

  const getUsers = async (value) => {
    setLoading(true);
    await apiUserGet(`${PATH}/${value}`, setData);
    setLoading(false);
  };

  useEffect(() => {
    getUsers(usersPending);
  }, [usersPending]);

  const handleDelete = (idUsuario) => {
    if (window.confirm(`Seguro deseas eliminar el usuario No.: ${idUsuario}`)) {
      apiUserDelete(`users/${idUsuario}`);
      alert(`Usuario No.: ${idUsuario} ya fue eliminado con éxito!`);
      getUsers(usersPending);
    }
  };
  const handleAproved = async (idUsuario) => {
    if (window.confirm(`Seguro deseas aprobar al usuario No.: ${idUsuario}`)) {
      apiUserPut(`users/aprobarUsuario/${idUsuario}`);
      alert(`Usuario No.: ${idUsuario} fue aprobado con éxito!`);
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
            <Link
              onClick={() => handleAproved(row.idUsuario)}
              className={`btn btn-dark ${styles.linkAprobar}`}
            >
              <AiOutlineCheck />
            </Link>
          </div>
          <div>
            <Link
              onClick={() => handleDelete(row.idUsuario)}
              className={`btn btn-dark ${styles.linkEliminar}`}
            >
              <AiOutlineDelete />
            </Link>
          </div>
          <div>
            <Link
              className={`btn btn-dark ${styles.link}`}
              to={`edit/${row.idActor}`}
            >
              <AiOutlineEdit />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const customStyles = {
    header: {
      style: {
        fontSize: "22px",
        minHeight: "22px",
        paddingTop: "10px",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        backgroundColor: "#f5f5f5",
      },
    },
    headCells: {
      style: {
        fontSize: "18px",
        backgroundColor: "#f5f5f5",
      },
    },
    cells: {
      style: {
        backgroundColor: "#f5f5f5",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#f5f5f5",
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
      },
    },
  };

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
                <DataTable
                  customStyles={customStyles}
                  title="Usuarios"
                  columns={columnas}
                  data={data}
                  keyField="idUsuario"
                  pagination
                />
              }
            />
          }
        />
      )}
    </>
  );
}
