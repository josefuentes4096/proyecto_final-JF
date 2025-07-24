import { createContext, useContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [productos, setProductos] = useState([]);

  const agregarProducto = (producto) => {
    setProductos((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => {
    setProductos([]);
  };

  return (
    <CarritoContext.Provider
      value={{ productos, agregarProducto, eliminarProducto, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);
