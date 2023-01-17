import styles from "./NavCustomData.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosGet } from "../../../utils/api/Connection/ConnectionApi";
import { Empty } from "../../EmptyMovie/Empty";
import Spinner from "../../Spinner/Spinner";

import { GeneralButton } from "../../Buttons/GeneralButton/GeneralButton";

export default function NavCustomData({ nameButtom }) {
  const [genero, setGenero] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const gener = () => {
    setLoading(true);
    axiosGet(`generos`, setGenero);
    setLoading(false);
  };
  useEffect(() => {
    gener();
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {!genero ? (
        <Empty msg="pelicula" />
      ) : (
        <div className={styles.container}>
          <ul className="nav nav-pills nav-justified">
            <li className="nav-item">
              {genero.map((gener) => (
                <GeneralButton
                  type=""
                  key={gener.idGenero}
                  value={gener.idGenero}
                  content={gener.genero}
                />
              ))}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
