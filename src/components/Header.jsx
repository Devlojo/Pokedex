import pokemonLogo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img src={pokemonLogo} alt="Logo pokémon" />
        </Link>
        <div className="header-button-container">
          <Link to="/pokemon/">
            <button>Pokemons</button>
          </Link>
          <Link to="/type/">
            <button>Types</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
