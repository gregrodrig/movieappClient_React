import { useEffect, useState } from "react";
import styles from "./Director.module.css";
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
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function Actor() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const PATH = "directores";

  const direct = () => {
    setLoading(true);
    axiosGet(`${PATH}/`, setData);
    setLoading(false);
  };

  useEffect(() => {
    direct();
  }, []);

  const handleDelete = (idDirector, nameDirector) => {
    if (
      window.confirm(
        `Seguro deseas eliminar  "${nameDirector}", No.: ${idDirector}`
      )
    ) {
      axiosDelete(`${PATH}/${idDirector}`);
      alert(
        `Director(a) "${nameDirector}", No.: ${idDirector} ya fue eliminad@ con éxito!`
      );
      axiosGet(`${PATH}/`, setData);
    }
  };
  const columnas = [
    {
      name: "#",
      selector: (row) => row.idDirector,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
    },
    {
      name: "Acciones",
      grow: 1,
      button: true,
      cell: (row) => (
        <div className={`${styles.linkContainer}`}>
          <div>
            <Link
              onClick={() => handleDelete(row.idDirector, row.nombre)}
              className={`btn btn-dark ${styles.linkEliminar}`}
            >
              <AiOutlineDelete />
            </Link>
          </div>
          <div>
            <Link
              className={`btn btn-dark ${styles.link}`}
              to={`edit/${row.idDirector}`}
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
                  titleText="Nuevo Director"
                  btnText="Agregar"
                  btnLink="add"
                />
              }
              contenButtom={
                <DataTable
                  customStyles={customStyles}
                  title="Director"
                  columns={columnas}
                  data={data}
                  keyField="idDirector"
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
