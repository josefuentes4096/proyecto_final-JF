import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FormularioProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const validar = () => {
    if (!nombre.trim()) return "El nombre es obligatorio.";
    if (parseFloat(precio) <= 0) return "El precio debe ser mayor a 0.";
    if (descripcion.length < 10) return "La descripción debe tener al menos 10 caracteres.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorValidacion = validar();
    if (errorValidacion) return setError(errorValidacion);

    setCargando(true);
    setError("");

    try {
      await axios.post("https://64fa12a34096a6f0c9e783e5.mockapi.io/productos", {
        nombre,
        precio: parseFloat(precio),
        descripcion,
        imagen
      });
      navigate("/admin");
    } catch (e) {
      setError("Error al crear el producto. Intente nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Producto</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input type="number" className="form-control" value={precio} onChange={e => setPrecio(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>URL de imagen (opcional)</label>
          <input className="form-control" value={imagen} onChange={e => setImagen(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}
