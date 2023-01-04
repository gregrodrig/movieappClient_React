import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Control } from "../../components/Form/Formik/Control/Control";
import styles from "./MovieAdd.module.css";
import style from "../../components/Form/Formik/Input/Input.module.css";
import stylesT from "../../components/Form/Formik/TextError/TextError.module.css";
import { useNavigate } from "react-router-dom";
import { SendButton } from "../../components/Buttons/SendButton/SendButton";
import {
  axiosGet,
  axiosInstance,
} from "../../utils/api/Connection/ConnectionApi";
import Spinner from "../../components/Spinner/Spinner";
import { Empty } from "../../components/EmptyMovie/Empty";

export function MovieAdd() {
  const [isLoading, setLoading] = useState(true);
  const [formSend, setFormSend] = useState(false);
  const [errorAdding, setAdding] = useState(false);
  const navigate = useNavigate();
  const [tblPaisIdPais, setPais] = useState(1);
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosGet("pais/", setPaises);
    setLoading(false);
  }, []);

  const idPais = (paises.values = tblPaisIdPais);

  if (!isLoading && paises.length === 0) {
    return <Empty msg="paises" />;
  }
  return (
    <>
      {isLoading && <Spinner />}
      {!paises ? (
        <Empty msg="paises" />
      ) : (
        <Formik
          initialValues={{
            idPelicula: 0,
            titulo: "",
            duracion: "",
            sinopsis: "",
            imagen: "",
            anno: "",
            tblPaisIdPais: idPais,
          }}
          validate={(valores) => {
            let errores = {};

            //validación título
            if (!valores.titulo) {
              errores.titulo = "Por favor ingresa un título";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.titulo)) {
              errores.titulo =
                "El título solo puede contener letras y espacios.";
            }
            //validación duración
            if (!valores.duracion) {
              errores.duracion = "Por favor ingresa una duración";
            } else if (!/^\d+$/.test(valores.duracion)) {
              errores.duracion =
                "La duración solo puede contener números enteros positivos sin decimales ni espacios u otros caracteres.";
            }
            //validación sinopsis
            if (!valores.sinopsis) {
              errores.sinopsis = "Por favor ingresa la sinopsis";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.sinopsis)) {
              errores.sinopsis =
                "La sinopsis solo puede contener letras y espacios.";
            }
            //validación imagen
            if (!valores.imagen) {
              errores.imagen = "Por favor ingresa la portada";
            } else if (!/.*(png|jpg|jpeg|gif)$/.test(valores.imagen)) {
              errores.imagen =
                "La portada solo puede contener letras y espacios.";
            }
            //validación año
            if (!valores.anno) {
              errores.anno = "Por favor ingresa el año";
            } else if (
              !/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(
                valores.anno
              )
            ) {
              errores.anno = "El año solo puede contener yyyy-mm-dd.";
            }
            return errores;
          }}
          onSubmit={async (valores, { resetForm }) => {
            valores.tblPaisIdPais = idPais;
            try {
              const request = await axiosInstance.post(`/peliculas`, valores);
              console.log(request);
              resetForm(true);
              setFormSend(true);
              setTimeout(() => {
                navigate("/");
              }, 3000);
            } catch (error) {
              console.log(error);
              setAdding(true);
            }
            console.log(valores);
            console.log("ya envié la imagen");
          }}
        >
          {({ errors, setFieldValue }) => (
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
                  label="Sinopsis"
                  name="sinopsis"
                />
              </div>
              <div>
                <Control
                  control="input"
                  label="Año"
                  name="anno"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div>
                <Control
                  control="select"
                  label="Pais"
                  name={tblPaisIdPais}
                  options={paises}
                  onValue={setPais}
                />
              </div>
              <div>
                <label htmlFor="imagen">Portada</label>
                <input
                  className={style.field}
                  type="file"
                  name="imagen"
                  onChange={async (event) => {
                    const img = event.target.files[0];
                    const formData = new FormData();
                    formData.append("image", img);
                    try {
                      const request = await axiosInstance.post(
                        `/upload`,
                        formData
                      );
                      setFieldValue("imagen", request.data);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                />
                {errors.imagen && (
                  <p className={stylesT.error}>{errors.imagen}</p>
                )}
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
      )}
    </>
  );
}