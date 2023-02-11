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
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function Gender() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const PATH = "generos";

  const direct = () => {
    setLoading(true);
    axiosGet(`${PATH}/`, setData);
    setLoading(false);
  };

  useEffect(() => {
    direct();
  }, []);

  const handleDelete = (idGenero, nameGenero) => {
    if (
      window.confirm(
        `Seguro deseas eliminar  "${nameGenero}", No.: ${idGenero}`
      )
    ) {
      axiosDelete(`${PATH}/${idGenero}`);
      alert(
        `Genero "${nameGenero}", No.: ${idGenero} ya fue eliminado con éxito!`
      );
      axiosGet(`${PATH}/`, setData);
    }
  };
  const columnas = [
    {
      name: "#",
      selector: (row) => row.idGenero,
    },
    {
      name: "Nombre",
      selector: (row) => row.genero,
    },
    {
      name: "Acciones",
      grow: 1,
      button: true,
      cell: (row) => (
        <div className={`${styles.linkContainer}`}>
          <div>
            <Link
              onClick={() => handleDelete(row.idGenero, row.genero)}
              className={`btn btn-dark ${styles.linkEliminar}`}
            >
              <AiOutlineDelete />
            </Link>
          </div>
          <div>
            <Link
              className={`btn btn-dark ${styles.link}`}
              to={`edit/${row.idGenero}`}
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
                  titleText="Nuevo Genero"
                  btnText="Agregar"
                  btnLink="add"
                />
              }
              contenButtom={
                <DataTable
                  customStyles={customStyles}
                  title="Genero"
                  columns={columnas}
                  data={data}
                  keyField="idGenero"
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
