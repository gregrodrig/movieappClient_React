import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MoviesGrid.module.css";
import { axiosGet } from "../../utils/api/Connection/ConnectionApi";
import Spinner from "../../components/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Empty } from "../EmptyMovie/Empty";
import { useSearchParams } from "react-router-dom";

function MoviesGrid({ search }) {
  const [movies, setMovie] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query] = useSearchParams();
  const genero = query.get("genero");

  useEffect(() => {
    setLoading(true);
    let searchUrl = "";
    if (search) {
      searchUrl = `/peliculas/buscar/${search}`;
    } else if (genero) {
      searchUrl = `generos/peliculaPorGenero/${genero}`;
    } else {
      searchUrl = `peliculas`;
    }
    axiosGet(searchUrl, setMovie);
    setHasMore(false);
    setLoading(false);
  }, [search, genero]);

  if (!isLoading && movies.length === 0) {
    return <Empty msg="pelicula" />;
  }
  return (
    <>
      {isLoading && <Spinner />}
      {!movies ? (
        <Empty msg="pelicula" />
      ) : (
        <InfiniteScroll
          dataLength={movies.length}
          hasMore={hasMore}
          loader={<Spinner />}
          next={() => setPage((prevPage) => prevPage + 1)}
        >
          {/* <NavCustomData nameButtom="test" /> */}
          <ul className={styles.moviesGrid}>
            {movies.map((movie) => (
              <MovieCard key={movie.idPelicula} movie={movie} />
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </>
  );
}

export default MoviesGrid;
