import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Admin() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.rol !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const handleAgregar = () => {
    navigate("/admin/agregar");
  };

  const handleVerProductos = () => {
    navigate("/admin/productos");
  };

  return (
    <div className="text-center">
      <h2 className="mb-4">Panel de Administración</h2>
      <p>Elija una opción:</p>
      <div className="d-flex justify-content-center gap-3">
        <button onClick={handleAgregar} className="btn btn-success">
          ➕ Agregar Producto
        </button>
        <button onClick={handleVerProductos} className="btn btn-primary">
          📋 Ver / Editar / Eliminar Productos
        </button>
      </div>
    </div>
  );
}
