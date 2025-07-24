import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../contexts/CarritoContext";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const { productos } = useCarrito();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-light border-bottom shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="text-decoration-none h5 text-dark">Mi eCommerce</Link>
        <div className="d-flex gap-3">
          {user ? (
            <>
              <span className="text-muted">Hola, {user}</span>
              <button onClick={handleLogout} className="btn btn-outline-secondary">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
          )}
          <Link to="/cart" className="btn btn-outline-primary">
			Carrito ({productos?.length || 0})
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
