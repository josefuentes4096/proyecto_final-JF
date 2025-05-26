import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
    return (
        <div className="card h-100">
            <img src={product.images[0]} className="card-img-top p-3" style={{ height: "200px", objectFit: "contain" }} alt={product.title} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-truncate">{product.description}</p>
                <p className="card-text fw-bold">${product.price}</p>
                <div className="mt-auto">
                    <button className="btn btn-primary w-100 mb-2" onClick={() => addToCart(product)}>Agregar</button>
                    <Link to={`/product/${product.id}`} className="btn btn-outline-secondary w-100">Ver detalles</Link>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
