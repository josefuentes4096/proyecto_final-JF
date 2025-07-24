import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCarrito } from '../contexts/CarritoContext';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ producto, onEdit, onDelete, modoCRUD }) {
  const { user } = useAuth();
  const { agregarProducto } = useCarrito(); // ✅ nombre correcto
  const navigate = useNavigate();

  const handleAgregar = () => {
    if (user) {
      agregarProducto(producto); // ✅ llamado correcto
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="card h-100">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top"
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{producto.name}</h5>
          <p className="card-text">{producto.description}</p>
          <p className="fw-bold">${producto.price}</p>
        </div>

        {modoCRUD ? (
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-warning" onClick={() => onEdit(producto)}>Editar</button>
            <button className="btn btn-danger" onClick={() => onDelete(producto.id)}>Eliminar</button>
          </div>
        ) : (
          <button className="btn btn-primary mt-3" onClick={handleAgregar}>
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
}
