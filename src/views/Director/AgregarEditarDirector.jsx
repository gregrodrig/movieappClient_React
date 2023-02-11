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

export default function AgregarEditarDirector() {
  const { idDirector } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  const navigate = useNavigate();

  const PATH = "directores";

  const direct = async () => {
    setLoading(true);
    const respond = await axiosInstance.get(`${PATH}/${idDirector}`);
    formik.setValues(respond.data);
    setLoading(false);
  };

  useEffect(() => {
    if (idDirector) {
      direct();
    }
    setLoading(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      idDirector: 0,
      nombre: "",
    },
    onSubmit: async (valores, { resetForm }) => {
      try {
        if (!idDirector) {
          axiosPost(`/${PATH}`, valores);
        } else {
          axiosPut(`/${PATH}`, valores);
        }
        resetForm(true);
        setFormSend(true);
        setTimeout(() => {
          navigate("/director");
        }, 2000);
      } catch (error) {
        console.log(error);
        setAdding(true);
      }
    },
    validate: (valores) => {
      let errores = {};

      //validación nombre
      if (!valores.nombre) {
        errores.nombre = "Por favor ingresa un nombre";
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
        errores.nombre = "El nombre solo puede contener letras y espacios.";
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
                titleText="Listado de Directores"
                btnText="Ir ahora"
                btnLink="/director"
              />
            }
            contenButtom={
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                {!idDirector ? (
                  <h1>Agregar Director</h1>
                ) : (
                  <h1>Editar Director</h1>
                )}
                <br />
                <div>
                  <Control
                    control="input"
                    type="text"
                    label="Nombre"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    error={formik.errors?.nombre}
                  />
                </div>
                <SendButton type="submit" content="Enviar" />
                {formSend && !idDirector && (
                  <p className={styles.exito}>
                    Director agregado correctamente!
                  </p>
                )}
                {formSend && idDirector && (
                  <p className={styles.exito}>
                    Director editado correctamente!
                  </p>
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
