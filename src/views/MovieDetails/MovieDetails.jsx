import styles from "./MovieDetails.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  axiosGet,
  axiosDelete,
} from "../../utils/api/Connection/ConnectionApi";
import imgCover from "../../assets/img/NoCoverImg.jpg";
import Spinner from "../../components/Spinner/Spinner";
import { Empty } from "../../components/EmptyMovie/Empty";
import { ThreeDots } from "../../components/Dropdown/ThreeDots/ThreeDots";
import { handleGetUserData } from "../../components/UserLogin";
import AgregarCriticasEnPelicula from "../Criticas/AgregarCriticasEnPelicula";
import Modal from "../../components/Bootstrap/Modal/Modal";
import CriticasEnPelicula from "../Criticas/CriticasEnPelicula";
import { SendButton } from "../../components/Buttons/SendButton/SendButton";
import { GeneralButton } from "../../components/Buttons/GeneralButton/GeneralButton";
import { apiUserGet } from "../../utils/api/Connection/ApiUser";

function MovieDetails() {
  const { idPelicula } = useParams();
  const [movie, setMovie] = useState(null);
  const [notaMedia, setnotaMedia] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const urlAPI = "http://localhost:8000/images/";
  const navigate = useNavigate();

  const user = handleGetUserData();
  const userRol = user?.roles?.map((rol) => rol.authority);

  useEffect(() => {
    setLoading(true);
    axiosGet(`peliculas/${idPelicula}`, setMovie);
    apiUserGet(`criticas/notaMedia/${idPelicula}`, setnotaMedia);
    setLoading(false);
  }, [idPelicula]);

  const handleDelete = () => {
    if (
      window.confirm(
        `Seguro deseas eliminar la película "${movie.titulo}", No.: ${idPelicula}`
      )
    ) {
      axiosDelete(`peliculas/${idPelicula}`, setMovie);
      alert(
        `La película "${movie.titulo}", No.: ${idPelicula} ya fue eliminada con éxito!`
      );
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };
  return (
    <>
      {isLoading && <Spinner />}
      {!movie ? (
        <div>
          <Empty msg="pelicula" />
        </div>
      ) : (
        <>
          <div className={styles.detailsContainer}>
            <div>
              <img
                height={500}
                className={`${styles.col} ${styles.movieImage}`}
                src={!movie.imagen ? imgCover : urlAPI + movie.imagen}
                alt={movie.titulo}
              />
              <p className={`${styles.movieDetails} ${styles.firstItem}`}>
                <strong style={{ paddingLeft: "1rem" }}>
                  Nota media:{" "}
                  <span style={{ color: "white" }}>{notaMedia}</span>
                </strong>
              </p>
            </div>
            <div className={`${styles.col} ${styles.movieDetails}`}>
              <div className={styles.menuTitle}>
                <p className={styles.firstItem}>
                  <strong>Título:</strong> {movie.titulo}
                </p>
                {userRol?.includes("Admin") ? (
                  <ThreeDots
                    item={[
                      <Link onClick={() => handleDelete()}>Eliminar</Link>,
                      <Link to={`/updatemovie/${idPelicula}`}>Actualizar</Link>,
                    ]}
                  />
                ) : null}
              </div>
              <p>
                <strong>Duración:</strong> {movie.duracion}
              </p>
              <p>
                <strong>País:</strong> {movie.paisByTblPaisIdPais.pais}
              </p>
              <p>
                <strong>Generos:</strong>{" "}
                {movie.generos.map((genero) => genero.genero).join(", ")}
              </p>
              <p>
                <strong>Directores:</strong>{" "}
                {movie.directors.map((director) => director.nombre).join(", ")}
              </p>
              <p>
                <strong>Actores:</strong>{" "}
                {movie.actors.map((actor, index) => {
                  return (
                    <span key={index}>
                      {actor.nombre} {actor.apellidos}
                      {", "}
                    </span>
                  );
                })}
              </p>
              <p>
                <strong>Año:</strong> {movie.anno}
              </p>
              <p>
                <strong>Sinopsis:</strong> {movie.sinopsis}
              </p>
              <p>
                {userRol?.includes("Admin") || userRol?.includes("Users") ? (
                  <Modal
                    btnCloseText="CANCELAR"
                    btnText="REALIZAR CRITICA"
                    body={<AgregarCriticasEnPelicula idPelicula={idPelicula} />}
                  />
                ) : (
                  <GeneralButton
                    type="submit"
                    content="REALIZAR CRITICA"
                    onClick={() => navigate("/register")}
                  />
                )}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "40px 20em",
            }}
          >
            <CriticasEnPelicula idPelicula={idPelicula} />
          </div>
        </>
      )}
    </>
  );
}

export default MovieDetails;
