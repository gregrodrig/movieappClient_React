import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Control } from "../../components/Form/Formik/Control/Control";
import styles from "../MovieAdd/MovieAdd.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { SendButton } from "../../components/Buttons/SendButton/SendButton";
import {
  apiUser,
  apiUserPost,
  apiUserPut,
} from "../../utils/api/Connection/ApiUser";
import Spinner from "../../components/Spinner/Spinner";
import { Empty } from "../../components/EmptyMovie/Empty";
import { handleGetUserData } from "../../components/UserLogin";
import Sidebar from "../../components/Bootstrap/Sidebar/Sidebar";
import SidebarBody from "../../components/Bootstrap/SidebarBody/SidebarBody";
import CenteredNav from "../../components/Bootstrap/CenteredNav/CenteredNav";

export default function AgregarEditarUser() {
  const { idUsuario } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  const navigate = useNavigate();
  const user = handleGetUserData();
  const userRol = user?.roles?.map((rol) => rol.authority);

  const PATH = "users";

  const users = async () => {
    setLoading(false);
    const respond = await apiUser.get(`${PATH}/find/${idUsuario}`);
    formik.setValues(respond.data);
    setLoading(true);
  };

  useEffect(() => {
    if (idUsuario) {
      users();
    }
    setLoading(true);
  }, []);

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
        if (!idUsuario) {
          apiUserPost(`${PATH}/save`, valores);
        } else {
          apiUserPut(`${PATH}/edit`, valores);
        }
        setLoading(true);
        setFormSend(true);
        resetForm(true);
        setTimeout(() => {
          if (!idUsuario && !userRol?.includes("Admin")) {
            navigate("/login");
          } else {
            navigate("/user");
          }
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
        errores.password = (
          <>
            {!idUsuario
              ? "¡Por favor, introduzca una contraseña!"
              : "Debe colocar una nueva contraseña, por seguridad no es mostrada en el formulario de editar"}
          </>
        );
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
        <>
          {userRol?.includes("Admin") ? (
            <Sidebar
              content={
                <SidebarBody
                  contentTop={
                    <CenteredNav
                      titleText="Listado de Usuarios"
                      btnText="Ir ahora"
                      btnLink="/user"
                    />
                  }
                  contenButtom={
                    <form
                      onSubmit={formik.handleSubmit}
                      className={styles.form}
                    >
                      {!idUsuario ? (
                        <h1>Registrar nuevo usuario</h1>
                      ) : (
                        <h1>Editar usuario</h1>
                      )}
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
                        <p className={styles.exito}>
                          {!idUsuario
                            ? "Usuario creado correctamente!"
                            : "Usuario actualizado correctamente!"}
                        </p>
                      ) : (
                        errorAdding && (
                          <p className={styles.failed}>
                            Por favor, confirma la información e intenta de
                            nuevo!
                          </p>
                        )
                      )}
                    </form>
                  }
                />
              }
            />
          ) : (
            <form onSubmit={formik.handleSubmit} className={styles.form}>
              {!idUsuario ? (
                <h1>Registrar nuevo usuario</h1>
              ) : (
                <h1>Editar usuario</h1>
              )}
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
                <p className={styles.exito}>
                  {!idUsuario
                    ? "Usuario creado correctamente!"
                    : "Usuario actualizado correctamente!"}
                </p>
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
      )}
    </>
  );
}
