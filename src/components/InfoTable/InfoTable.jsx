import React from "react";
import { useFormik } from "formik";
import styles from "../../components/InfoTable/InfoTable.module.css";
import stylesT from "../../views/MovieAdd/MovieAdd.module.css";
import { useState, useEffect } from "react";
import {
  axiosGet,
  axiosDelete,
  axiosInstance,
  axiosPost,
  axiosPut,
} from "../../utils/api/Connection/ConnectionApi";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Empty } from "../EmptyMovie/Empty";
import Spinner from "../Spinner/Spinner";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Sidebar from "../Bootstrap/Sidebar/Sidebar";
import CenteredNav from "../Bootstrap/CenteredNav/CenteredNav";
import GeneralAdd from "../../views/GeneralAdd/GeneralAdd";
import Modal from "../Bootstrap/Modal/Modal";
import SidebarBody from "../Bootstrap/SidebarBody/SidebarBody";
import { Control } from "../Form/Formik/Control/Control";
import { SendButton } from "../Buttons/SendButton/SendButton";

export default function InfoTable({
  path,
  idModel,
  columnDataName,
  formTitle,
  inputLabel,
  columnsTableHeader,
  confirmColumn,
}) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
            className={`btn btn-dark ${styles.link}`}
            to={`/updatemodel/${row[idModel]}`}
          >
            <AiOutlineEdit />
          </Link>
        </div>
      </div>
    ),
  });
  return (
    <>
      {isLoading && <Spinner />}
      {!data ? (
        <Empty msg={path} />
      ) : (
        <Sidebar
          content={
            <SidebarBody
              contentTop={
                <CenteredNav
                  titleText={formTitle}
                  btnText={`Agregar ${formTitle}`}
                  modalBody={GeneralModel({
                    path,
                    columnDataName,
                    formTitle,
                    inputLabel,
                  })}
                />
              }
              contenButtom={
                <DataTable
                  customStyles={customStyles}
                  title={formTitle}
                  columns={columnas}
                  data={data}
                  keyField={idModel}
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

export const GeneralModel = ({
  path,
  columnDataName,
  formTitle,
  inputLabel,
}) => {
  const { idModel } = useParams();
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);

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
        errores.nameModel = `Por favor ingresa un ${columnDataName[0]}`;
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nameModel)) {
        errores.nameModel = `${columnDataName[0]} solo puede contener letras y espacios.`;
      }
      return errores;
    },
  });
  return (
    <div className={stylesT.formCol}>
      <form onSubmit={formik.handleSubmit} className={stylesT.form}>
        {!idModel ? <h4>Agregar</h4> : <h4>Editar</h4>}
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
          <p className={stylesT.exito}>{formTitle} se agregó correctamente!</p>
        ) : (
          errorAdding && (
            <p className={stylesT.failed}>
              Por favor, confirma la información e intenta de nuevo!
            </p>
          )
        )}
      </form>
    </div>
  );
};
