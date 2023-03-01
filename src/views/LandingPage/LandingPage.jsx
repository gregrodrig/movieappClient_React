import { useSearchParams } from "react-router-dom";
import NavCustomData from "../../components/Bootstrap/NavCustomData/NavCustomData";
import MoviesGrid from "../../components/MoviesGrid/MoviesGrid";
import useDebounce from "../../utils/hooks/useDebounce";

function LandingPage() {
  const [query] = useSearchParams();
  const search = query.get("busqueda");

  const debouncedSearch = useDebounce(search, 1000);
  return (
    <div>
      <NavCustomData />
      <MoviesGrid key={debouncedSearch} search={debouncedSearch} />;
    </div>
  );
}

export default LandingPage;
