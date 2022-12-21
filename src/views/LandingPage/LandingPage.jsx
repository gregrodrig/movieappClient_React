import MoviesGrid from "../../components/MoviesGrid/MoviesGrid";
import useDebounce from "../../utils/hooks/useDebounce";
import { UseQuery } from "../../utils/hooks/UseQuery";

function LandingPage() {
  const query = UseQuery();
  const search = query.get("titulo");

  const debouncedSearch = useDebounce(search, 1000);
  return (
    <div>
      <MoviesGrid key={debouncedSearch} search={debouncedSearch} />;
    </div>
  );
}

export default LandingPage;
