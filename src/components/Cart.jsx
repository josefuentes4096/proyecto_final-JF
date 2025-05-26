function Cart({ cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return <div className="alert alert-info">El carrito está vacío</div>;
    }

    return (
        <div>
            <h2 className="mb-4">Carrito de compras</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio unitario</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div className="d-flex align-items-center gap-3">
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            style={{ width: "60px", height: "60px", objectFit: "contain" }}
                                        />
                                        <span>{item.title}</span>
                                    </div>
                                </td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>
                                    <div className="d-flex align-items-center gap-2">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => decreaseQuantity(item.id)}
                                        >
                                            −
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => increaseQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <button className="btn btn-outline-danger" onClick={clearCart}>
                    Vaciar carrito
                </button>
                <h4>Total: ${total.toFixed(2)}</h4>
            </div>

        </div>
    );
}

export default Cart;
