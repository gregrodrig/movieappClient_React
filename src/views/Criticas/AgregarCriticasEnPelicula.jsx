import { format } from "date-fns";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SendButton } from "../../components/Buttons/SendButton/SendButton";
import { Control } from "../../components/Form/Formik/Control/Control";
import { handleGetUserData } from "../../components/UserLogin";
import { apiUserPost, apiUserPut } from "../../utils/api/Connection/ApiUser";
import styles from "../MovieAdd/MovieAdd.module.css";

export default function AgregarCriticasEnPelicula({ idPelicula }) {
  const { idCriticas } = useParams();
  const user = handleGetUserData();
  const userId = user.idUsuario;
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  // const navigate = useNavigate();

  const date = format(new Date(), "yyyy-MM-dd");

  const PATH = "criticas";

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
          console.log(valores);
          apiUserPost(`/${PATH}/save`, valores);
        } else {
          apiUserPut(`/${PATH}/edit`, valores);
        }
        resetForm(true);
        setFormSend(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.log(error);
        setAdding(true);
      }
    },
    validate: (valores) => {
      let errores = {};

      //validación nombre de actor
      if (!valores.valoracion) {
        errores.valoracion = "Por favor ingresa la valoración sobre la crítica";
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.valoracion)) {
        errores.valoracion =
          "La valoración sólo puede contener letras y espacios.";
      }
      //validación apellidos
      if (!valores.nota) {
        errores.nota =
          "Por favor ingresa una nota de valor entero del 1 al 10, donde 1 es muy mala y 10 es muy buena";
      } else if (!/^\d+$/.test(valores.nota)) {
        errores.nota =
          "El valor de la nota sólo puede contener números enteros positivos sin decimales ni espacios u otros caracteres... entre 1 y 10!";
      }
      return errores;
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.formDetailMovie}>
        <h4 style={{ color: "black" }}>Agrega una Crítica</h4>
        <br />
        <div>
          <Control
            control="textarea"
            rows="4"
            // cols="50"
            type="text"
            label="Valoración"
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
            min="0"
            max="10"
            name="nota"
            value={formik.values.nota}
            onChange={formik.handleChange}
            error={formik.errors?.nota}
          />
        </div>
        <SendButton type="submit" content="Enviar" />
        {formSend && !idCriticas && (
          <p className={styles.exito}>Crítica agregada correctamente!</p>
        )}
        {formSend && idCriticas && (
          <p className={styles.exito}>Crítica editada correctamente!</p>
        )}
        {errorAdding && (
          <p className={styles.failed}>
            Por favor, confirma la información e intenta de nuevo!
          </p>
        )}
      </form>
    </>
  );
}
