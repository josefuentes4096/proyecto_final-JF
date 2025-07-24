import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../contexts/CarritoContext";

function NavBar() {
  const { productosCarrito } = useContext(CarritoContext);

  const cantidadTotal = productosCarrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Mi E-Commerce
        </Link>

        <div className="d-flex gap-3 ms-auto">
          <Link to="/login" className="btn btn-outline-primary">
            Login
          </Link>

          <Link to="/cart" className="btn btn-outline-success">
            Carrito ({cantidadTotal})
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
