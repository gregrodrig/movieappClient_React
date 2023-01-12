import React from "react";
import styles from "./Gender.module.css";
import { useState, useEffect } from "react";
import { axiosGet } from "../../utils/api/Connection/ConnectionApi";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

export default function Gender() {
  const [genero, setGenero] = useState([]);

  useEffect(() => {
    axiosGet(`generos/`, setGenero);
  }, []);

  const columnas = [
    { name: "#", selector: "idGenero" },
    { name: "Genero", selector: "genero" },
    {
      name: "Opciones",
      button: true,
      cell: (row) => (
        <div>
          <Link className={styles.link} to={"" + row.idGenero}>
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
        data={genero}
        pagination
      />
    </div>
  );
}
