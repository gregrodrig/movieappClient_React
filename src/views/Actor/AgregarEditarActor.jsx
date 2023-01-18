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
  axiosGet,
  axiosInstance,
  axiosPost,
  axiosPut,
} from "../../utils/api/Connection/ConnectionApi";
import styles from "../MovieAdd/MovieAdd.module.css";

export default function AgregarEditarActor() {
  const { idActor } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  const navigate = useNavigate();
  const [paises, setPaises] = useState([]);
  const [tblPaisIdPais, setPais] = useState(1);

  useEffect(() => {
    setLoading(true);
    axiosGet("pais/", setPaises);
    setLoading(false);
  }, []);

  const idPais = (paises.values = tblPaisIdPais);
  const PATH = "actores";

  const actors = async () => {
    setLoading(true);
    const respond = await axiosInstance.get(`${PATH}/${idActor}`);
    formik.setValues(respond.data);
    setLoading(false);
  };

  useEffect(() => {
    if (idActor) {
      actors();
    }
    setLoading(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      idActor: 0,
      nombre: "",
      apellidos: "",
      fechaNacimiento: "",
      tblPaisIdPais: 0,
    },
    onSubmit: async (valores, { resetForm }) => {
      valores.tblPaisIdPais = idPais;
      try {
        if (!idActor) {
          axiosPost(`/${PATH}`, valores);
        } else {
          axiosPut(`/${PATH}`, valores);
        }
        resetForm(true);
        setFormSend(true);
        setTimeout(() => {
          navigate("/actor");
        }, 2000);
      } catch (error) {
        console.log(error);
        setAdding(true);
      }
    },
    validate: (valores) => {
      let errores = {};

      //validación nombre de actor
      if (!valores.nombre) {
        errores.nombre = "Por favor ingresa un nombre del actor";
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
        errores.nombre =
          "El nombre del actor sólo puede contener letras y espacios.";
      }
      //validación apellidos
      if (!valores.apellidos) {
        errores.apellidos = "Por favor ingresa apellidos del actor";
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellidos)) {
        errores.apellidos =
          "Los apellidos del actor sólo pueden contener letras y espacios.";
      }
      //validación fechaNacimiento
      // if (!valores.fechaNacimiento) {
      //   errores.fechaNacimiento =
      //     "Por favor ingresa fecha de nacimiento del actor";
      // } else if (!/^\d+$/.test(valores.fechaNacimiento)) {
      //   errores.fechaNacimiento =
      //     "La fecha de nacimiento del actor sólo pueden contener números enteros positivos sin decimales ni espacios u otros caracteres..";
      // }
      //validación país
      // if (!valores.tblPaisIdPais) {
      //   errores.tblPaisIdPais = "Por favor ingresa el país del actor";
      // } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.tblPaisIdPais)) {
      //   errores.tblPaisIdPais =
      //     "El país del actor sólo pueden contener letras y espacios.";
      // }
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
                titleText="Listado de Actores"
                btnText="Ir ahora"
                btnLink="/actor"
              />
            }
            contenButtom={
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                {!idActor ? <h1>Agregar Actor</h1> : <h1>Editar Actor</h1>}
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
                <div>
                  <Control
                    control="input"
                    type="text"
                    label="Apellidos"
                    name="apellidos"
                    value={formik.values.apellidos}
                    onChange={formik.handleChange}
                    error={formik.errors?.apellidos}
                  />
                </div>
                <div>
                  <Control
                    control="input"
                    type="text"
                    label="Fecha de Nacimiento"
                    name="fechaNacimiento"
                    value={formik.values.fechaNacimiento}
                    onChange={formik.handleChange}
                    error={formik.errors?.fechaNacimiento}
                    placeholder="YYYY-MM-DD"
                  />
                </div>
                <div>
                  <Control
                    control="select"
                    label="País"
                    name={tblPaisIdPais}
                    value={formik.values.tblPaisIdPais}
                    onChange={formik.handleChange}
                    error={formik.errors?.tblPaisIdPais}
                    options={paises}
                    onValue={setPais}
                  />
                </div>
                <SendButton type="submit" content="Enviar" />
                {formSend && !idActor && (
                  <p className={styles.exito}>Actor agregado correctamente!</p>
                )}
                {formSend && idActor && (
                  <p className={styles.exito}>Actor editado correctamente!</p>
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
