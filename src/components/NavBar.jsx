import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ cartCount, isLoggedIn }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCategory = location.pathname.startsWith("/category/")
    ? location.pathname.split("/")[2]
    : "";

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const simplifiedCategories = data.map(cat => ({
            slug: cat.slug, 
            name: cat.name.replace(/-/g, " ")
          }));
          setCategories(simplifiedCategories);
        } else {
          console.error("Formato inesperado en categorías:", data);
          setCategories([]);
        }
      })
      .catch(err => {
        console.error("Error al cargar categorías", err);
        setCategories([]);
      });
  }, []);

  return (
    <header className="bg-light border-bottom shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-3 flex-wrap">
        {/* Categorías (máximo 3) */}
        <div className="d-flex gap-3 flex-wrap">
          {categories.slice(0, 3).map((cat) => (
            <button
              key={cat.slug}
              className={`btn btn-link text-decoration-none text-capitalize ${
                selectedCategory === cat.slug ? "fw-bold text-primary" : ""
              }`}
              onClick={() => navigate(`/category/${cat.slug}`)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Login y Carrito */}
        <div className="d-flex gap-3">
          <Link to="/login" className="btn btn-outline-primary">
            {isLoggedIn ? "Mi cuenta" : "Iniciar sesión"}
          </Link>
          <Link to="/cart" className="btn btn-outline-primary">
            Carrito ({cartCount})
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
