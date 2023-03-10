import { format } from "date-fns";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CenteredNav from "../../components/Bootstrap/CenteredNav/CenteredNav";
import Sidebar from "../../components/Bootstrap/Sidebar/Sidebar";
import SidebarBody from "../../components/Bootstrap/SidebarBody/SidebarBody";
import { SendButton } from "../../components/Buttons/SendButton/SendButton";
import { Empty } from "../../components/EmptyMovie/Empty";
import { Control } from "../../components/Form/Formik/Control/Control";
import Spinner from "../../components/Spinner/Spinner";
import { handleGetUserData } from "../../components/UserLogin";
import {
  apiUserGet,
  apiUserPost,
  apiUserPut,
} from "../../utils/api/Connection/ApiUser";
import styles from "../MovieAdd/MovieAdd.module.css";

export default function AgregarEditarCriticas({ idPelicula }) {
  const { idCriticas } = useParams();
  const user = handleGetUserData();
  const userId = user.idUsuario;

  const [isLoading, setLoading] = useState(true);
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const date = format(new Date(), "yyyy-MM-dd");

  const PATH = "criticas";

  const criticas = () => {
    setLoading(true);
    apiUserGet(`${PATH}/find/${idCriticas}`, setData);
    formik.setValues(data);
    setLoading(false);
  };

  useEffect(() => {
    if (idCriticas) {
      criticas();
    }
    setLoading(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      valoracion: "",
      nota: "",
      fecha: date,
      idPelicula: parseInt(idPelicula),
      users: {
        idUsuario: userId,
      },
    },
    onSubmit: async (valores, { resetForm }) => {
      try {
        if (!idCriticas) {
          apiUserPost(`/${PATH}/save`, valores);
        } else {
          apiUserPut(`/${PATH}/edit`, valores);
        }
        resetForm(true);
        setFormSend(true);
        setTimeout(() => {
          navigate("/criticas");
        }, 2000);
      } catch (error) {
        console.log(error);
        setAdding(true);
      }
    },
    validate: (valores) => {
      let errores = {};

      //validaci??n nombre de actor
      if (!valores.valoracion) {
        errores.valoracion = "Por favor ingresa la valoraci??n sobre la cr??tica";
      } else if (!/^[a-zA-Z??-??\s]{1,40}$/.test(valores.valoracion)) {
        errores.valoracion =
          "La valoraci??n s??lo puede contener letras y espacios.";
      }
      //validaci??n apellidos
      if (!valores.nota) {
        errores.nota =
          "Por favor ingresa una nota de valor entero del 1 al 10, donde 1 es muy mala y 10 es muy buena";
      } else if (!/^\d+$/.test(valores.nota)) {
        errores.nota =
          "El valor de la nota s??lo puede contener n??meros enteros positivos sin decimales ni espacios u otros caracteres... entre 1 y 10!";
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
                titleText="Listado de Cr??tica"
                btnText="Ir ahora"
                btnLink="/criticas"
              />
            }
            contenButtom={
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                {!idCriticas ? (
                  <h1>Agregar Cr??tica</h1>
                ) : (
                  <h1>Editar Cr??tica</h1>
                )}
                <br />
                <div>
                  <Control
                    control="textarea"
                    rows="4"
                    // cols="50"
                    type="text"
                    label="Valoraci??n"
                    name="valoracion"
                    value={formik.values.valoracion}
                    onChange={formik.handleChange}
                    error={formik.errors?.valoracion}
                  />
                </div>
                <div>
                  <Control
                    control="input"
                    type="number"
                    label="Nota"
                    name="nota"
                    value={formik.values.nota}
                    onChange={formik.handleChange}
                    error={formik.errors?.nota}
                  />
                </div>
                <SendButton type="submit" content="Enviar" />
                {formSend && !idCriticas && (
                  <p className={styles.exito}>
                    Cr??tica agregada correctamente!
                  </p>
                )}
                {formSend && idCriticas && (
                  <p className={styles.exito}>Cr??tica editada correctamente!</p>
                )}
                {errorAdding && (
                  <p className={styles.failed}>
                    Por favor, confirma la informaci??n e intenta de nuevo!
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
