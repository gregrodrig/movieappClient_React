import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styles from "../Director/Director.module.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Empty } from "../../components/EmptyMovie/Empty";
import Spinner from "../../components/Spinner/Spinner";
import { apiUserDelete, apiUserGet } from "../../utils/api/Connection/ApiUser";
import { handleGetUserData } from "../../components/UserLogin";

export default function CriticasEnPelicula({ idPelicula }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const PATH = "criticas";

  const user = handleGetUserData();
  const userRol = user?.roles?.map((rol) => rol.authority);

  const getCriticas = async () => {
    setLoading(true);
    await apiUserGet(`${PATH}/porIdPelicula/${idPelicula}`, setData);
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
  const customStyles1 = {
    header: {
      style: {
        color: "#ffffff",
        fontSize: "26px",
        minHeight: "28px",
        paddingTop: "10px",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        backgroundColor: "black",
        marginBottom: "20px",
      },
    },
    headCells: {
      style: {
        color: "#e60073",
        fontSize: "24px",
        backgroundColor: "black",
      },
    },
    cells: {
      style: {
        color: "#ffffff",
        fontSize: "22px",
        backgroundColor: "black",
      },
    },
    pagination: {
      style: {
        color: "#ffffff",
        marginTop: "30px",
        fontSize: "20px",
        backgroundColor: "black",
      },
    },
  };

  const columnas = [
    {
      name: "Valoración",
      selector: (row) => row.valoracion,
      width: "22vw",
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
      name: "Acciones",
      width: "10vw",
      // grow: 2,
      button: true,
      cell: (row) => (
        <div className={`${styles.linkContainer}`}>
          {userRol?.includes("Admin") || userRol?.includes("Users") ? (
            <>
              <div>
                <Link
                  onClick={() => handleDelete(row.idCriticas)}
                  className={`btn btn-dark ${styles.linkEliminar}`}
                >
                  <AiOutlineDelete />
                </Link>
              </div>
              <div hidden>
                <Link
                  className={`btn btn-dark ${styles.link}`}
                  to={`edit/${row.idCriticas}`}
                >
                  <AiOutlineEdit />
                </Link>
              </div>
            </>
          ) : null}
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
        <DataTable
          customStyles={customStyles1}
          title={`Críticas realizadas por nuestros usuarios`}
          columns={columnas}
          data={data}
          keyField="idCriticas"
          pagination
        />
      )}
    </>
  );
}
