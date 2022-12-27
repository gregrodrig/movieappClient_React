import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Control } from "../../components/Form/Formik/Control/Control";
import styles from "./MovieAdd.module.css";
import { useNavigate } from "react-router-dom";
import { SendButton } from "../../components/Buttons/SendButton/SendButton";
import { axiosPost } from "../../utils/api/Connection/ConnectionApi";

export function MovieAdd() {
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  const navigate = useNavigate();
  const dropdownOptions = [
    { key: "Select an option", value: "" },
    { key: "Option 1", value: "option1" },
  ];

  return (
    <>
      <Formik
        initialValues={{
          titulo: "",
          duracion: "",
          signopsis: "",
          imagen: "",
          pais: "",
          anno: null,
        }}
        validate={(valores) => {
          let errores = {};

          //validación título
          if (!valores.titulo) {
            errores.titulo = "Por favor ingresa un título";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.titulo)) {
            errores.titulo = "El título solo puede contener letras y espacios.";
          }
          //validación duración
          if (!valores.duracion) {
            errores.duracion = "Por favor ingresa una duración";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.duracion)) {
            errores.duracion =
              "La duración solo puede contener letras y espacios.";
          }
          //validación signopsis
          if (!valores.signopsis) {
            errores.signopsis = "Por favor ingresa la signopsis";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.signopsis)) {
            errores.signopsis =
              "La signopsis solo puede contener letras y espacios.";
          }
          //validación imagen
          if (!valores.imagen) {
            errores.imagen = "Por favor ingresa la portada";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.imagen)) {
            errores.imagen =
              "La portada solo puede contener letras y espacios.";
          }
          //validación país
          if (!valores.pais) {
            errores.pais = "Por favor ingresa el país";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.pais)) {
            errores.pais = "El país solo puede contener letras y espacios.";
          }
          //validación año
          /*if (!valores.anno) {
            errores.anno = "Por favor ingresa el año";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.anno)) {
            errores.anno = "El año solo puede contener letras y espacios.";
          }*/
          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          axiosPost(`peliculas/`, valores);
          setFormSend(true);
          setAdding(true);
          setTimeout(() => {
            setFormSend(false);
            navigate("/");
          }, 3000);
        }}
      >
        {({ errors }) => (
          <Form className={styles.form}>
            <h1>Agregar película</h1>
            <br />
            <div>
              <Control
                control="input"
                type="text"
                label="Título"
                name="titulo"
              />
            </div>
            <div>
              <Control
                control="input"
                type="text"
                label="Duración"
                name="duracion"
              />
            </div>
            <div>
              <Control
                control="textarea"
                type="text"
                label="Signopsis"
                name="signopsis"
              />
            </div>
            <div>
              <Control
                control="input"
                type="text"
                label="Portada"
                name="imagen"
              />
            </div>
            <div>
              <Control
                control="select"
                label="País"
                name="pais"
                options={dropdownOptions}
              />
            </div>
            <div>
              <Control control="date" label="Año" name="anno" />
            </div>
            <SendButton type="submit" content="Enviar" />
            {formSend ? (
              <p className={styles.exito}>Película agregada correctamente!</p>
            ) : (
              errorAdding && (
                <p className={styles.failed}>
                  Por favor, confirma la información e intenta de nuevo!
                </p>
              )
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}
