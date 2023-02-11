import React, { useState } from "react";
import { useFormik } from "formik";
import { Control } from "../../components/Form/Formik/Control/Control";
import styles from "../MovieAdd/MovieAdd.module.css";
import { useNavigate } from "react-router-dom";
import { SendButton } from "../../components/Buttons/SendButton/SendButton";
import { apiUser } from "../../utils/api/Connection/ApiUser";
import Spinner from "../../components/Spinner/Spinner";
import { Empty } from "../../components/EmptyMovie/Empty";

export default function Login() {
  const [isLoading, setLoading] = useState(true);
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (valores, { resetForm }) => {
      try {
        const URL = valores.email + "/" + valores.password;
        setLoading(true);
        const result = await apiUser.get("users/login/" + URL);
        if (result.data) {
          localStorage.setItem("User", JSON.stringify(result.data));
          setFormSend(true);
          resetForm(true);
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1500);
        }
      } catch (error) {
        console.log(error);
        console.log("Usuario no existe!");
        setLoading(true);
        setFormSend(false);
        setAdding(true);
      }
    },
    validate: (valores) => {
      let errores = {};

      //validación password
      if (!valores.password) {
        errores.password = "¡Por favor, introduzca una contraseña!";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          valores.password
        )
      ) {
        errores.password = "Contraseña incorrecta";
      }
      //validación email
      if (!valores.email) {
        errores.email = "¡Por favor, introduzca un correo electrónico!";
      } else if (
        !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)
      ) {
        errores.email =
          "El correo electrónico solo puede contener letras, números, caracteres especiales y guiones bajo.";
      }
      return errores;
    },
  });
  return (
    <>
      {!isLoading ? (
        <>
          <Empty msg="login" />
          <Spinner />
        </>
      ) : (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <h1>Iniciar Sesion</h1>
          <br />
          <div>
            <Control
              control="input"
              type="text"
              label="Correo electrónico"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors?.email}
            />
          </div>
          <div>
            <Control
              control="input"
              type="password"
              label="Contraseña"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors?.password}
            />
          </div>
          <SendButton type="submit" content="Enviar" />
          {formSend ? (
            <p className={styles.exito}>Sesion iniciada correctamente!</p>
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
