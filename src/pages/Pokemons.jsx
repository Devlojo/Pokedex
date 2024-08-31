import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Pokemons = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
        const pokemonList = response.data.results;

        // Créer un objet pour stocker les images
        const imagesObject = {};
        //console.log("avant boucle for : ", imagesObject);
        // Récupérer les images pour chaque Pokémon
        for (let pokemon of pokemonList) {
          // récupere l'url du pokemon pour accéder à la suite des données
          const pokemonDetails = await axios.get(pokemon.url);

          // on ajoute a chaque tour de boucle une clé du nom du pokemon qui prendra en valeur le lien de de l'image
          imagesObject[pokemon.name] =
            pokemonDetails.data.sprites.front_default;
        }
        //console.log("après boucle for : ", imagesObject);
        // Mettre à jour l'état
        setData(pokemonList);
        // on stocke l'url de l'img dans le state Images
        setImages(imagesObject);
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
    <>
      <main>
        <h1>Pokemons</h1>
        <div className="pokemon-container">
          {data.map((pokemon, index) => {
            return (
              <div
                className="pokemon-items"
                key={index}
                onClick={() => {
                  navigate(`/pokemon/${pokemon.name}`);
                }}
              >
                <h2>{pokemon.name}</h2>
                {images[pokemon.name] ? (
                  <img src={images[pokemon.name]} alt={pokemon.name} />
                ) : (
                  <p>Loading image...</p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Pokemons;
