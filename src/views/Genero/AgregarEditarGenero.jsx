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

export default function AgregarEditarGenero() {
  const { idGenero } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  const navigate = useNavigate();

  const PATH = "generos";

  const gener = async () => {
    setLoading(true);
    const respond = await axiosInstance.get(`${PATH}/${idGenero}`);
    formik.setValues(respond.data);
    setLoading(false);
  };

  useEffect(() => {
    if (idGenero) {
      gener();
    }
    setLoading(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      idGenero: 0,
      genero: "",
    },
    onSubmit: async (valores, { resetForm }) => {
      try {
        if (!idGenero) {
          axiosPost(`/${PATH}`, valores);
        } else {
          axiosPut(`/${PATH}`, valores);
        }
        resetForm(true);
        setFormSend(true);
        setTimeout(() => {
          navigate("/genero");
        }, 2000);
      } catch (error) {
        console.log(error);
        setAdding(true);
      }
    },
    validate: (valores) => {
      let errores = {};

      //validación nombre de genero
      if (!valores.genero) {
        errores.genero = "Por favor ingresa un nombre de genero";
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.genero)) {
        errores.genero =
          "El nombre de genero solo puede contener letras y espacios.";
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
                titleText="Listado de Generos"
                btnText="Ir ahora"
                btnLink="/genero"
              />
            }
            contenButtom={
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                {!idGenero ? <h1>Agregar Genero</h1> : <h1>Editar Genero</h1>}
                <br />
                <div>
                  <Control
                    control="input"
                    type="text"
                    label="Nombre"
                    name="genero"
                    value={formik.values.genero}
                    onChange={formik.handleChange}
                    error={formik.errors?.genero}
                  />
                </div>
                <SendButton type="submit" content="Enviar" />
                {formSend && !idGenero && (
                  <p className={styles.exito}>Genero agregado correctamente!</p>
                )}
                {formSend && idGenero && (
                  <p className={styles.exito}>Genero editado correctamente!</p>
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
