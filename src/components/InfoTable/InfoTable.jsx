import React from "react";
import styles from "./InfoTable.module.css";
import { useState, useEffect } from "react";
import { axiosGet } from "../../utils/api/Connection/ConnectionApi";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Empty } from "../EmptyMovie/Empty";
import Spinner from "../Spinner/Spinner";
import { useFormik } from "formik";

export default function InfoTable({
  path,
  idModel,
  nameModel,
  tableNameModel,
}) {
  const [model, setModel] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosGet(`${path}/`, setModel);
    setLoading(false);
  }, [path]);

  const columnas = [
    { name: "#", selector: idModel },
    { name: tableNameModel, selector: nameModel },
    {
      name: "Acciones",
      button: true,
      cell: (row) => (
        <div className={`col-xs-8 ${styles.linkContainer}`}>
          <div>
            <Link
              className={`btn btn-dark ${styles.linkEliminar}`}
              to={"" + row[idModel]}
            >
              Eliminar
            </Link>
          </div>
          {" | "}
          <div>
            <Link className={`btn btn-dark ${styles.link}`} to="">
              Actualizar
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const formik = useFormik({
    initialValues: {},
    onSubmit: (valores, { resetForm }) => {},
    validate: (valores) => {},
  });

  return (
    <>
      {isLoading && <Spinner />}
      {!model ? (
        <Empty msg={path} />
      ) : (
        <div className={styles.container}>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <p>HOLA COLUMNA IZQUIERDA</p>
            </form>
          </div>
          <div>
            <DataTable
              className={styles.dataContainer}
              columns={columnas}
              data={model}
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
}
