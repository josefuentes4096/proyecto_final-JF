import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ addToCart, category, modo = "publico" }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let url = "https://68100d8b27f2fdac24101ef5.mockapi.io/productos";
    if (category) {
      url += `?categoria=${category}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [category]);

  const handleEliminar = (id) => {
    if (!window.confirm("¿Seguro que desea eliminar este producto?")) return;
    fetch(`https://6596e1c96bb4ec36ca02b81b.mockapi.io/productos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar");
        setProductos(productos.filter((prod) => prod.id !== id));
      })
      .catch((err) => setError(err.message));
  };

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!productos.length) return <p>No hay productos disponibles.</p>;

  return (
    <div className="row g-4">
      {productos.map((producto) => (
		<div className="col-sm-6 col-md-4 col-lg-3">
        <ProductCard
          key={producto.id}
          producto={producto}
          modo={modo}
          addToCart={addToCart}
          onDelete={handleEliminar}
        />
		</div>
      ))}
    </div>
  );
}

export default ProductList;
