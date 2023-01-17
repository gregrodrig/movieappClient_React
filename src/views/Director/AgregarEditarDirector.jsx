import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { SendButton } from "../../components/Buttons/SendButton/SendButton";
import { Empty } from "../../components/EmptyMovie/Empty";
import { Control } from "../../components/Form/Formik/Control/Control";
import Spinner from "../../components/Spinner/Spinner";
import {
  axiosGet,
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
  const [director, setDirector] = useState([]);

  const PATH = "directores";

  const direct = async () => {
    setLoading(true);
    const respond = await axiosInstance.get(`${PATH}/${idDirector}`);
    formik.setValues(respond.data);
    console.log(respond.data);
    setLoading(false);
  };

  useEffect(() => {
    if (idDirector) {
      direct();
    }
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
          navigate("/");
        }, 3000);
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
      {!director ? (
        <Empty msg="director" />
      ) : (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          {!idDirector ? <h1>Agregar Director</h1> : <h1>Editar Director</h1>}
          {JSON.stringify(formik.values)}
          {JSON.stringify(isLoading)}
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
          {formSend ? (
            <p className={styles.exito}>Director agregado correctamente!</p>
          ) : (
            errorAdding && (
              <p className={styles.failed}>
                Por favor, confirma la información e intenta de nuevo!
              </p>
            )
          )}
        </form>
      )}
    </>
  );
}
