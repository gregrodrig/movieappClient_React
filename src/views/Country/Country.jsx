import React from "react";
import styles from "./Country.module.css";
import { useState, useEffect } from "react";
import { axiosGet } from "../../utils/api/Connection/ConnectionApi";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

export default function Country() {
  const [pais, setPais] = useState([]);

  useEffect(() => {
    axiosGet(`pais/`, setPais);
  }, []);

  const columnas = [
    { name: "#", selector: "idPais" },
    { name: "Pais", selector: "pais" },
    {
      name: "Opciones",
      button: true,
      cell: (row) => (
        <div>
          <Link className={styles.link} to={"" + row.idPais}>
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
        data={pais}
        pagination
      />
    </div>
  );
}
