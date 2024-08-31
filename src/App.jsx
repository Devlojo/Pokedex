import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

/* PAGES */
/*********************************** */
import Home from "./pages/Home";

/* PAGES POKEMON */
import Pokemon from "./pages/Pokemon";
import Pokemons from "./pages/Pokemons";

/* PAGES TYPE */
import Types from "./pages/Types";
import Type from "./pages/Type";

/************************************ */
/* COMPONENT */
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pokemon/" element={<Pokemons />}></Route>
          <Route path="/pokemon/:pokemonName" element={<Pokemon />}></Route>
          <Route path="/type/" element={<Types />}></Route>
          <Route path="/type/:type" element={<Type />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
