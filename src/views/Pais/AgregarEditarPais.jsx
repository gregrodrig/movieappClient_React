import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CenteredNav from "../../components/Bootstrap/CenteredNav/CenteredNav";
import Sidebar from "../../components/Bootstrap/Sidebar/Sidebar";
import SidebarBody from "../../components/Bootstrap/SidebarBody/SidebarBody";
import { SendButton } from "../../components/Buttons/SendButton/SendButton";
import { Control } from "../../components/Form/Formik/Control/Control";
import Spinner from "../../components/Spinner/Spinner";
import {
  axiosInstance,
  axiosPost,
  axiosPut,
} from "../../utils/api/Connection/ConnectionApi";
import styles from "../MovieAdd/MovieAdd.module.css";

export default function AgregarEditarPais() {
  const { idPais } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  const navigate = useNavigate();

  const PATH = "pais";

  const country = async () => {
    setLoading(true);
    const respond = await axiosInstance.get(`${PATH}/${idPais}`);
    formik.setValues(respond.data);
    setLoading(false);
  };

  useEffect(() => {
    if (idPais) {
      country();
    }
    setLoading(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      idPais: 0,
      pais: "",
    },
    onSubmit: async (valores, { resetForm }) => {
      try {
        if (!idPais) {
          axiosPost(`/${PATH}`, valores);
        } else {
          axiosPut(`/${PATH}`, valores);
        }
        resetForm(true);
        setFormSend(true);
        setTimeout(() => {
          navigate("/pais");
        }, 2000);
      } catch (error) {
        console.log(error);
        setAdding(true);
      }
    },
    validate: (valores) => {
      let errores = {};

      //validación nombre de pais
      if (!valores.pais) {
        errores.pais = "Por favor ingresa un nombre de país";
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.pais)) {
        errores.pais =
          "El nombre de país sólo puede contener letras y espacios.";
      }
      return errores;
    },
  });
  return (
    <>
      {isLoading && <Spinner />}
      <Sidebar
        content={
          <SidebarBody
            contentTop={
              <CenteredNav
                titleText="Listado de Países"
                btnText="Ir ahora"
                btnLink="/pais"
              />
            }
            contenButtom={
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                {!idPais ? <h1>Agregar País</h1> : <h1>Editar País</h1>}
                <br />
                <div>
                  <Control
                    control="input"
                    type="text"
                    label="Nombre"
                    name="pais"
                    value={formik.values.pais}
                    onChange={formik.handleChange}
                    error={formik.errors?.pais}
                  />
                </div>
                <SendButton type="submit" content="Enviar" />
                {formSend && !idPais && (
                  <p className={styles.exito}>País agregado correctamente!</p>
                )}
                {formSend && idPais && (
                  <p className={styles.exito}>País editado correctamente!</p>
                )}
                {errorAdding && (
                  <p className={styles.failed}>
                    Por favor, confirma la información e intenta de nuevo!
                  </p>
                )}
              </form>
            }
          />
        }
      />
    </>
  );
}
