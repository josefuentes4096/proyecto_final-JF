import { useCarrito } from "../contexts/CarritoContext";

function Cart() {
  const { productosCarrito, borrarProducto, vaciarCarrito } = useCarrito();

  const total = productosCarrito.reduce(
    (sum, p) => sum + p.price * p.cantidad,
    0
  );

  if (productosCarrito.length === 0) {
    return <p>El carrito está vacío.</p>;
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul className="list-group mb-3">
        {productosCarrito.map((p) => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {p.title} (x{p.cantidad})
            </div>
            <div>
              <strong>${p.price * p.cantidad}</strong>
              <button className="btn btn-sm btn-danger ms-3" onClick={() => borrarProducto(p.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h4>Total: ${total}</h4>
      <button className="btn btn-warning" onClick={vaciarCarrito}>Vaciar Carrito</button>
    </div>
  );
}

export default Cart;
