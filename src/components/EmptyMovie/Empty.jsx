import styles from "./Empty.module.css";

export function Empty({ msg }) {
  switch (msg) {
    case "pelicula":
      return <p className={styles.center}>No hay películas para mostrar!</p>;
    case "actores":
      return <p className={styles.center}>No hay actores para mostrar!</p>;
    case "paises":
      return (
        <p className={styles.center}>
          No se han cargado los países desde la Base de datos!
        </p>
      );
    default:
      return null;
  }
}
