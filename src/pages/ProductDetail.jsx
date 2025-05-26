import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.error("Error al cargar el producto:", err);
        setError("No se pudo cargar el producto.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <div className="mt-2 text-muted">Cargando producto...</div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center my-4">
        {error}
      </div>
    );

  if (!product)
    return (
      <div className="text-center my-5">
        <h4 className="text-muted">Producto no encontrado.</h4>
        <Link to="/" className="btn btn-outline-primary mt-3">
          Volver al catálogo
        </Link>
      </div>
    );

  return (
    <div className="row">
      <div className="col-md-5 text-center">
        <img
          src={product.images[0]}
          alt={product.title}
          className="img-fluid p-4"
          style={{ maxHeight: "400px", objectFit: "contain" }}
        />
      </div>
      <div className="col-md-7">
        <h1>{product.title}</h1>
        <p className="text-muted">{product.category}</p>
        <p className="lead">{product.description}</p>
        <h3 className="text-primary">${product.price}</h3>
        <button className="btn btn-success mt-3" onClick={() => addToCart(product)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
