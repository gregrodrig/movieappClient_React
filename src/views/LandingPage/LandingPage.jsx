import MoviesGrid from "../../components/MoviesGrid/MoviesGrid";
import { Search } from "../../components/Search/Search";
function LandingPage() {
  return (
    <div>
      <Search />
      <MoviesGrid />;
    </div>
  );
}

export default LandingPage;
