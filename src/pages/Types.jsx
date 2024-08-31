import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Types = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        setData(response.data.results);
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
      <h1>Types</h1>
      <div className="pokemon-container">
        {data.map((type, index) => {
          return (
            <div
              className="type-items"
              key={index}
              onClick={() => {
                navigate(`/type/${type.name}`);
              }}
            >
              <h2>{type.name}</h2>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Types;
