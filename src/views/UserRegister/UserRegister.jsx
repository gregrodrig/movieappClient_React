import React, { useState } from "react";
import { useFormik } from "formik";
import { Control } from "../../components/Form/Formik/Control/Control";
import styles from "../MovieAdd/MovieAdd.module.css";
import { useNavigate } from "react-router-dom";
import { SendButton } from "../../components/Buttons/SendButton/SendButton";
import { apiUserPost } from "../../utils/api/Connection/ApiUser";
import Spinner from "../../components/Spinner/Spinner";
import { Empty } from "../../components/EmptyMovie/Empty";

export default function UserRegister() {
  const [isLoading, setLoading] = useState(true);
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      correo: "",
      enable: false,
      roles: [
        {
          idRol: 2,
        },
      ],
    },
    onSubmit: async (valores, { resetForm }) => {
      try {
        setLoading(false);
        console.log(valores);
        apiUserPost("users/save", valores);
        console.log("Nuevo Usuario Registrado!");
        setLoading(true);
        setFormSend(true);
        resetForm(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.log(error);
        setAdding(true);
      }
    },
    validate: (valores) => {
      let errores = {};

      //validación nombre
      if (!valores.username) {
        errores.username = "Por favor ingrese su nombre completo";
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)) {
        errores.username =
          "El nombre completo sólo puede contener letras y espacios.";
      }
      //validación password
      if (!valores.password) {
        errores.password = "¡Por favor, introduzca una contraseña!";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          valores.password
        )
      ) {
        errores.password = (
          <div>
            <ul>
              <li>
                El total de la contraseña debería corresponder en el rango entre
                8 a 14.
              </li>
              <li>La contraseña debe contener la primera letra en mayúscula</li>
              <li>Debería contener un dígito alfanumérico.</li>
              <li>
                No debe contener ninguna letra a,e,i,o,u ni guion bajo que se
                corresponde con \w
              </li>
            </ul>
          </div>
        );
      }
      //validación email
      if (!valores.correo) {
        errores.correo = "¡Por favor, introduzca un correo electrónico!";
      } else if (
        !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)
      ) {
        errores.correo =
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
          <h1>Registrar nuevo usuario</h1>
          <br />
          <div>
            <Control
              control="input"
              type="text"
              label="Nombre Completo"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors?.username}
            />
          </div>
          <div>
            <Control
              control="input"
              type="text"
              label="Correo electrónico"
              name="correo"
              value={formik.values.correo}
              onChange={formik.handleChange}
              error={formik.errors?.correo}
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
            <p className={styles.exito}>Usuario creado correctamente!</p>
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
