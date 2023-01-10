import React from "react";
import styles from "./Director.module.css";
import { useState, useEffect } from "react";
import { axiosGet } from "../../utils/api/Connection/ConnectionApi";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

export default function Director() {
  const [director, setDirector] = useState([]);

  useEffect(() => {
    axiosGet(`directores/`, setDirector);
  }, []);

  const columnas = [
    { name: "#", selector: "idDirector" },
    { name: "Director", selector: "nombre" },
    {
      name: "Opciones",
      button: true,
      cell: (row) => (
        <div>
          <Link className={styles.link} to={"" + row.idDirector}>
            Eliminar
          </Link>
          {" | "}
          <Link className={styles.link} to="">
            Actualizar
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div className={`${styles.container}`}>
      <DataTable
        className={`${styles.dataContainer}`}
        columns={columnas}
        data={director}
        pagination
      />
    </div>
  );
}
