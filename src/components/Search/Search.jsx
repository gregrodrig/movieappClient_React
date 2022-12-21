import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UseQuery } from "../../utils/hooks/UseQuery";

export function Search() {
  const query = UseQuery();
  const search = query.get("titulo");

  const navigate = useNavigate();

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
            navigate(`/?titulo=${value}`);
          }}
        />
        <FaSearch className={styles.searchButton} size={20} />
      </div>
    </form>
  );
}
