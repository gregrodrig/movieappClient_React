import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

export function Search() {
  const [query, setQuery] = useSearchParams();
  const search = query.get("titulo");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type="test"
          value={search}
          placeholder="Título"
          aria-label="Search Movies"
          onChange={(e) => {
            const value = e.target.value;
            setQuery({ titulo: value });
          }}
        />
        <FaSearch className={styles.searchButton} size={20} />
      </div>
    </form>
  );
}
