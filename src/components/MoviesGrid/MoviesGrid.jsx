import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MoviesGrid.module.css";
import { axiosGet } from "../../utils/api/Connection/ConnectionApi";
import Spinner from "../../components/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Empty } from "../EmptyMovie/Empty";

function MoviesGrid({ search }) {
  const [movies, setMovie] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    const searchUrl = search ? `/peliculas/titulo/${search}` : `peliculas`;
    axiosGet(searchUrl, setMovie);
    setHasMore(false);
    setLoading(false);
  }, [search, page]);

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
