import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProductList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.rol !== "admin") {
      navigate("/");
      return;
    }

    const obtenerProductos = async () => {
      try {
        const respuesta = await axios.get(
          "https://64e4e0f4c5556380291441ac.mockapi.io/productos"
        );
        setProductos(respuesta.data);
      } catch (err) {
        setError("Error al obtener productos.");
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, [user, navigate]);

  const handleEditar = (id) => {
    navigate(`/admin/editar/${id}`);
  };

  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Estás seguro de eliminar este producto?");
    if (!confirmar) return;

    try {
      await axios.delete(`https://64e4e0f4c5556380291441ac.mockapi.io/productos/${id}`);
      setProductos(productos.filter((p) => p.id !== id));
    } catch (err) {
      alert("Error al eliminar el producto.");
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>{producto.descripcion}</td>
                <td>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditar(producto.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminar(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
