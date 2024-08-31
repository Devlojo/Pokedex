import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Type = () => {
  const { type } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/type/${type}`
        );

        // On stocke la liste des pokemons
        const pokemonList = response.data.pokemon;

        // on creer un objet vide qui va servir à ajouter les images des différents pokémons
        const imageObject = {};

        // on boucle sur la liste des pokémons
        for (let pokemon of pokemonList) {
          // On fait une requete axios vers l'api qui mene a l'url de chaque pokemon
          const pokemonDetails = await axios.get(pokemon.pokemon.url);

          if (!pokemonDetails.data.sprites.front_default) {
            imageObject[
              pokemon.pokemon.name
            ] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.data.id}.png`;
          } else {
            // on ajoute l'objet imageObject une clé qui porte le nom du pokemon qui prendra en valeur son image
            imageObject[pokemon.pokemon.name] =
              pokemonDetails.data.sprites.front_default;
          }
        }
        setData(response.data.pokemon);
        setImages(imageObject);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : (
    <main className="container">
      <h1>Type : {type}</h1>
      <div className="pokemon-container">
        {data.map((pokemon, index) => {
          return (
            <div
              className="pokemon-items"
              key={index}
              onClick={() => {
                navigate(`/pokemon/${pokemon.pokemon.name}`);
              }}
            >
              {" "}
              <h2>{pokemon.pokemon.name}</h2>
              {console.log(images)}
              {images[pokemon.pokemon.name] ? (
                <img
                  src={images[pokemon.pokemon.name]}
                  alt={pokemon.pokemon.name}
                />
              ) : (
                <p>Loading image...</p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Type;
