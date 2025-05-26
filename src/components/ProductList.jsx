import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList({ addToCart, category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const url = category
      ? `https://dummyjson.com/products/category/${category}`
      : `https://dummyjson.com/products`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar los productos");
        return res.json();
      })
      .then(data => {
        setProducts(data.products || []);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="row g-4">
      {products.map(product => (
        <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
          <ProductCard product={product} addToCart={addToCart} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
