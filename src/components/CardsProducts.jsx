import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";

const SinProductos = () => {
  return (
    <div className="container mt-4">
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="alert alert-warning" role="alert">
            No hay productos para mostrar
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onCardClick }) => {
  const handleCardClick = () => {
    // Call the provided onCardClick function with the product ID
    onCardClick(product.id);
    console.log("product.id", product.id);
  };

  return (
    <div
      className="card mb-3"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            src={product.images[0]}
            className="card-img"
            alt={product.title}
          />
        </div>
        <div className="col-md-12">
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">
              <small className="text-muted">{product.category}</small>
            </p>
            <p className="card-text">{product.description}</p>
            <p className="card-text">
              <strong>Price: ${product.price}</strong>
              <br />

              <strong>Rating: {product.rating}</strong>
            </p>
            <ReactStars
              count={5}
              value={product.rating}
              size={24}
              isHalf={true}
              activeColor="#ffd700"
              edit={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CardsProducts = () => {
  const [products, setProducts] = useState([]);
  const [textoParam2, setTextoParam2] = useState("");
  let [input, setInput] = useState("");
  const navigate = useNavigate();

  let { texto: textoParam } = useParams();

  const getProductos = useCallback(async () => {
    let route = "";
    console.log("textoParam2", textoParam);
    if (textoParam !== "All") {
      route = `http://127.0.0.1:3000/buscarProducto/${textoParam}`;
    } else {
      route = `http://127.0.0.1:3000/getProductos`;
    }
    console.log("route", route);
    const res = await fetch(route);
    const data = await res.json();
    let productsData = [];
    console.log("data 1", data);
    if (data.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No hay productos para mostrar",
      });
      return;
    }
    if (!Array.isArray(data)) {
      //Convertimos el JSON object en array
      productsData.push(data);
      //Modicamso el state
      setProducts(productsData);
    } else {
      //console.log("data", data);
      setProducts(data);
    }

    console.log("Productos", products);
  }, [textoParam]);
  //Agregamos un useEffect para evitar el problema
  useEffect(() => {
    if (textoParam !== "") {
      console.log("Texto pasado como parámetro:", textoParam);
    }

    // Este console.log reflejará el valor actualizado de textoParam en la siguiente renderización
    console.log("Texto actualizado:", textoParam);

    getProductos();
  }, [textoParam]);

  const handleCardClick = (productId) => {
    console.log("Clicked on Product ID:", productId);
    // Navigate to the product detail page

    navigate(`/item/${productId}`);
  };

  const handleInputChange = (e) => {
    //creamos del hook useNavigate para redireccionar a otra pagina
    e.preventDefault();
    console.log("input", input);
    setTextoParam2(input);
    console.log("textoParam2", textoParam2);
    if (input !== "") {
      //Redireccionamos a la ruta /itemsGet
      navigate(`/itemsGet/${input}`);
    } else {
      input = "All";
      console.log("No hay texto");
      navigate(`/itemsGet/${input}`);
    }
  };

  return (
    <div className="container-fluid mt-12">
      <div className="row text-center">
        <div className="col-md-12">
          <img
            src="https://images.vexels.com/media/users/3/223412/isolated/lists/bd3704cf52ba23499660b8bae7221daf-dise-o-plano-de-icono-de-tienda.png"
            alt="Imagen"
            height={"100px"}
            width={"100px"}
          />
        </div>
      </div>

      <form onSubmit={handleInputChange}>
        <div className="row mt-4">
          <div className="col-md-6 offset-md-3">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                aria-label="Buscar"
                aria-describedby="basic-addon2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <h2 className="text-center mt-4">
        Resultados de la busqueda de:{" "}
        {textoParam === "All" ? "Todos" : textoParam}
      </h2>
      <div className="row mt-4">
        {products.length === 0 ? (
          <SinProductos />
        ) : (
          <>
            {products.map((product) => (
              <div className="col-md-12" key={product.id}>
                <ProductCard product={product} onCardClick={handleCardClick} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CardsProducts;
