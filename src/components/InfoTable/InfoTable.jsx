import React from "react";
import styles from "../../components/InfoTable/InfoTable.module.css";
import { useState, useEffect } from "react";
import {
  axiosGet,
  axiosPost,
  axiosPut,
  axiosDelete,
} from "../../utils/api/Connection/ConnectionApi";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Empty } from "../EmptyMovie/Empty";
import Spinner from "../Spinner/Spinner";
import { useFormik } from "formik";
import styleForm from "../../views/MovieAdd/MovieAdd.module.css";
import { Control } from "../Form/Formik/Control/Control";
import { SendButton } from "../Buttons/SendButton/SendButton";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function InfoTable({
  path,
  idModel,
  columnDataName,
  inputLabel,
  formTitle,
  columnsTableHeader,
  confirmColumn,
}) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosGet(`${path}/`, setData);
    setLoading(false);
  }, [path]);

  const handleDelete = (idModel, nameModel) => {
    if (
      window.confirm(`Seguro deseas eliminar  "${nameModel}", No.: ${idModel}`)
    ) {
      axiosDelete(`${path}/${idModel}`);
      alert(
        `${formTitle} "${nameModel}", No.: ${idModel} ya fue eliminad@ con éxito!`
      );
      axiosGet(`${path}/`, setData);
    }
  };
  const customStyles = {
    table: {
      style: {
        backgroundColor: "#000000",
      },
    },
    header: {
      style: {
        fontSize: "46px",
        minHeight: "46px",
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
        paddingLeft: "8px",
        paddingRight: "8px",
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
  const columnas = [{ name: "#", selector: idModel }];
  columnsTableHeader.forEach((model, index) => {
    columnas.push({
      name: model,
      selector: columnDataName[index],
    });
  });
  columnas.push({
    name: "Acciones",
    grow: 1,
    button: true,
    cell: (row) => (
      <div className={`${styles.linkContainer}`}>
        <div>
          <Link
            onClick={() => handleDelete(row[idModel], row[confirmColumn])}
            className={`btn btn-dark ${styles.linkEliminar}`}
          >
            <AiOutlineDelete />
          </Link>
        </div>
        <div>
          <Link
            to={`/updatemodel/${row[idModel]}`}
            className={`btn btn-dark ${styles.link}`}
          >
            <AiOutlineEdit />
          </Link>
        </div>
      </div>
    ),
  });
  const formik = useFormik({
    initialValues: {
      idModel: 0,
      nameModel: "",
    },
    onSubmit: (valores, { resetForm }) => {
      valores.idModel = { idModel };
      valores.nameModel = { nameModel: columnDataName };
      try {
        if (!idModel) {
          axiosPost(`/${path}`, valores);
        } else {
          axiosPut(`/${path}`, valores);
        }
        resetForm(true);
        setFormSend(true);
      } catch (error) {
        console.log(error);
        setAdding(true);
      }
    },
    validate: (valores) => {
      let errores = {};
      //validación nameModel
      if (!valores.nameModel) {
        errores.nameModel = `Por favor ingresa un ${columnDataName}`;
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nameModel)) {
        errores.nameModel = `${columnDataName} solo puede contener letras y espacios.`;
      }
    },
  });

  return (
    <>
      {isLoading && <Spinner />}
      {!data ? (
        <Empty msg={path} />
      ) : (
        <div className={styles.container}>
          <div className={styles.formCol}>
            <form onSubmit={formik.handleSubmit} className={styleForm.form}>
              <h4>Agregar</h4>
              <br />
              <div>
                <Control
                  control="input"
                  type="text"
                  label={formTitle}
                  name={columnDataName}
                  value={formik.values.nameModel}
                  onChange={formik.handleChange}
                  error={formik.errors?.nameModel}
                  placeholder={`Favor ingresar ${inputLabel}`}
                />
              </div>
              <SendButton type="submit" content="Guardar" />
              {formSend ? (
                <p className={styles.exito}>
                  {formTitle} se agregó correctamente!
                </p>
              ) : (
                errorAdding && (
                  <p className={styles.failed}>
                    Por favor, confirma la información e intenta de nuevo!
                  </p>
                )
              )}
            </form>
          </div>
          <div className={styles.DataTableCol}>
            <DataTable
              customStyles={customStyles}
              title={formTitle}
              columns={columnas}
              data={data}
              keyField={idModel}
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
}
