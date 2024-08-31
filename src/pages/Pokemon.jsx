import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const Pokemon = () => {
  const { pokemonName } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pokemonName]);
  return isLoading ? (
    <h1>Loading ....</h1>
  ) : (
    <>
      <main className="container">
        <h1>Pokemon</h1>

        <div className="pokemon-container">
          <div className="pokemon-card">
            <h2>{pokemonName}</h2>
            <img
              src={data.sprites.front_default}
              alt={`photo de ${pokemonName}`}
            />
          </div>
          <div className="type-container">
            {data.types.map((type, index) => {
              return (
                <div
                  key={index}
                  className="type-items"
                  onClick={() => {
                    navigate(`/type/${type.type.name}`);
                  }}
                >
                  <p>{type.type.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Pokemon;
