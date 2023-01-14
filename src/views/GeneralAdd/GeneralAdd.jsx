import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../../views/MovieAdd/MovieAdd.module.css";
import stylesT from "../../components/InfoTable/InfoTable.module.css";
import { SendButton } from "../../components/Buttons/SendButton/SendButton";
import { Control } from "../../components/Form/Formik/Control/Control";
import { Empty } from "../../components/EmptyMovie/Empty";
import Spinner from "../../components/Spinner/Spinner";
import {
  axiosGet,
  axiosInstance,
  axiosPost,
  axiosPut,
} from "../../utils/api/Connection/ConnectionApi";
import Sidebar from "../../components/Bootstrap/Sidebar/Sidebar";
import CenteredNav from "../../components/Bootstrap/CenteredNav/CenteredNav";
import SidebarBody from "../../components/Bootstrap/SidebarBody/SidebarBody";
export default function GeneralAdd({
  path,
  columnDataName,
  formTitle,
  inputLabel,
}) {
  const { idModel } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  const [data, setData] = useState([]);
  // const [pais, setPais] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   axiosGet(`${path}/`, setPais);
  //   setLoading(false);
  // }, []);

  const model = async () => {
    // setLoading(true);
    // axiosGet(`${path}/${idModel}`, setData);
    // formik.setValues(setData);
    // console.log(setData);
    // setLoading(false);
    setLoading(true);
    const respond = await axiosInstance.get(`${path}/${idModel}`);
    formik.setValues(respond.data);
    console.log(respond.data);
    setLoading(false);
  };

  useEffect(() => {
    if (idModel) {
      model();
    }
  }, []);

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
        <Sidebar
          content={
            <SidebarBody
              contentTop={
                <CenteredNav
                  titleText={formTitle}
                  btnText={`Agregar ${formTitle}`}
                  modalBody={""}
                />
              }
              contenButtom={
                <div className={styles.formCol}>
                  <form onSubmit={formik.handleSubmit} className={styles.form}>
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
              }
            />
          }
        />
      )}
    </>
  );
}
