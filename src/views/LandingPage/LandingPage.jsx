import { useSearchParams } from "react-router-dom";
import MoviesGrid from "../../components/MoviesGrid/MoviesGrid";
import useDebounce from "../../utils/hooks/useDebounce";

function LandingPage() {
  const [query] = useSearchParams();
  const search = query.get("titulo");

  const debouncedSearch = useDebounce(search, 1000);
  return (
    <div>
      <MoviesGrid key={debouncedSearch} search={debouncedSearch} />;
    </div>
  );
}

export default LandingPage;
