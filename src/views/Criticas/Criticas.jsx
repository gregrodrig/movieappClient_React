import { useEffect, useState } from "react";
import styles from "../Director/Director.module.css";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import CenteredNav from "../../components/Bootstrap/CenteredNav/CenteredNav";
import Sidebar from "../../components/Bootstrap/Sidebar/Sidebar";
import SidebarBody from "../../components/Bootstrap/SidebarBody/SidebarBody";
import { Empty } from "../../components/EmptyMovie/Empty";
import Spinner from "../../components/Spinner/Spinner";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { apiUserDelete, apiUserGet } from "../../utils/api/Connection/ApiUser";
import { customStyles } from "../../css/tableStyle";

export default function Criticas() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const PATH = "criticas";

  const getCriticas = async () => {
    setLoading(true);
    await apiUserGet(`${PATH}/all`, setData);
    setLoading(false);
  };

  useEffect(() => {
    getCriticas();
  }, []);

  const handleDelete = (idCriticas) => {
    if (
      window.confirm(`Seguro deseas eliminar la crítica No.: ${idCriticas}?`)
    ) {
      apiUserDelete(`${PATH}/${idCriticas}`);
      alert(`Crítica No.: ${idCriticas} ya fue eliminada con éxito!`);
      getCriticas();
    }
  };
  const columnas = [
    {
      name: "#",
      selector: (row) => row.idCriticas,
      width: "6vw",
    },
    {
      name: "Valoración",
      selector: (row) => row.valoracion,
    },
    {
      name: "Nota",
      selector: (row) => row.nota,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
    {
      name: "Película",
      selector: (row) => row.idPelicula,
    },
    {
      name: "Usuario",
      selector: (row) => row.users.username,
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
              onClick={() => handleDelete(row.idCriticas)}
              className={`btn btn-dark ${styles.linkEliminar}`}
            >
              <AiOutlineDelete />
            </Link>
          </div>
          <div>
            <Link
              className={`btn btn-dark ${styles.link}`}
              to={`edit/${row.idCriticas}`}
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
                  titleText="Nueva Crítica"
                  btnText="Agregar"
                  btnLink="/"
                />
              }
              contenButtom={
                <DataTable
                  customStyles={customStyles}
                  title="Críticas"
                  columns={columnas}
                  data={data}
                  keyField="idCriticas"
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
