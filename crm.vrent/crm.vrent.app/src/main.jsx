import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/home";
import CreateAgente from "./pages/createAgente";
import CreateCliente from "./pages/createCliente";
import ModifyCliente from "./pages/modifyCliente";
import Analitica from "./pages/analitica";
import Commenti from "./pages/commenti";
import CreateCommento from "./pages/createCommento";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavigationBar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Analitica" element={<Analitica />}/>
        <Route path="/createAgente" element={<CreateAgente />}/>
        <Route path="/createCliente" element={<CreateCliente />} />
        <Route path="/modifica-cliente/:partitaIva" element={<ModifyCliente />} />
        <Route path="/commenti/:partitaIva" element={<Commenti />} />
        <Route path="/createCommento/:partitaIva" element={<CreateCommento />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
