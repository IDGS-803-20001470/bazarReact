import { useParams, Link } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DetalleProductos = () => {
  const [input, setInput] = useState("");
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [rate, setRate] = useState(0);

  const getProductoId = useCallback(async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/buscarProductoId/${id}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener el producto");
      }
      const data = await response.json();

      if (!Array.isArray(data) && data.id) {
        setRate(data.rating);
        console.log("data", data.rating);
        console.log(rate);
        setProduct(data);
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo obtener el producto",
      });
      navigate("/"); // Redirecciona a la página principal en caso de error
    }
  }, [rate, id]);

  useEffect(() => {
    getProductoId();
  }, [rate, id]);

  const handleInputChange = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      navigate(`/itemsGet/${input}`);
    } else {
      navigate("/itemsGet/All");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //Aliniamos el contenido al centro
  };

  const alerta = () => {
    Swal.fire({
      icon: "success",
      title: "Se ha agregado al carrito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="container-fluid mt-4">
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

      <div className="row mt-4">
        <div className="col-md-12">
          <Slider {...settings}>
            {product.images &&
              product.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="img-fluid mx-auto d-block"
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <h2 className="text-center">{product.title}</h2>
          <p>{product.description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <p>
            <strong>Price: ${product.price}</strong>{" "}
          </p>
          <p>
            <strong>Discount: {product.discountPercentage}%</strong>
          </p>
          <ReactStars
            count={5}
            value={rate > 0 ? rate : 4}
            size={24}
            isHalf={true}
            activeColor="#ffd700"
            edit={false}
          />
        </div>
        <div className="col-md-6">
          <p>
            <strong>Stock: {product.stock}</strong>
            <br />
            <strong>Brand: {product.brand}</strong>
            <br />
            <strong>Category: {product.category}</strong>
          </p>
        </div>
      </div>
      <div className="row text-center mb-3">
        <div className="col-md-12">
          <button className="btn btn-primary" type="button" onClick={alerta}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProductos;
