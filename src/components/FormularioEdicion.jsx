import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function FormularioEdicion() {
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  //const API_URL = "https://64fa12a34096a6f0c9e783e5.mockapi.io/productos";
  const API_URL = "https://68100dc827f2fdac24102255.mockapi.io/productos";


  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then((res) => {
        setProducto(res.data);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudo cargar el producto.");
        setCargando(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!producto.nombre.trim() || producto.descripcion.length < 10 || parseFloat(producto.precio) <= 0) {
      return setError("Complete todos los campos correctamente.");
    }

    setCargando(true);
    axios.put(`${API_URL}/${id}`, producto)
      .then(() => navigate("/admin"))
      .catch(() => setError("Error al actualizar el producto."))
      .finally(() => setCargando(false));
  };

  if (cargando) return <p className="text-center mt-5">Cargando producto...</p>;

  return (
    <div className="container mt-5">
      <h2>Editar Producto</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {producto && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nombre</label>
            <input name="nombre" className="form-control" value={producto.nombre} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Precio</label>
            <input name="precio" type="number" className="form-control" value={producto.precio} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Descripción</label>
            <textarea name="descripcion" className="form-control" value={producto.descripcion} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>URL Imagen</label>
            <input name="imagen" className="form-control" value={producto.imagen} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success" disabled={cargando}>
            {cargando ? "Guardando..." : "Guardar Cambios"}
          </button>
        </form>
      )}
    </div>
  );
}
