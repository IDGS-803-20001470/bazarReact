import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [input, setInput] = useState("");

  //creamos del hook useNavigate para redireccionar a otra pagina
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //Evitamos el comportamiento normal del Submit
    e.preventDefault();
    //Obtenemos el valor del input.
    let text = e.target[0].value;
    console.log("text", text);
    setInput(text);
    if (text !== "") {
      //Redireccionamos a la ruta /itemsGet
      navigate(`/itemsGet/${text}`);
    } else {
      text = "All";
      console.log("No hay texto");
      navigate(`/itemsGet/${text}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col text-center">
          <img
            src="https://images.vexels.com/media/users/3/223412/isolated/lists/bd3704cf52ba23499660b8bae7221daf-dise-o-plano-de-icono-de-tienda.png"
            alt="Imagen"
            className="img-fluid rounded mx-auto d-block"
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col text-center">
          <h1>Bazar Online</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-8 mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              aria-label="Buscar"
              aria-describedby="basic-addon2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col text-center">
            <button className="btn btn-primary" type="submit">
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
