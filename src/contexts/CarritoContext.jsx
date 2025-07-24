import { createContext, useContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [productosCarrito, setProductosCarrito] = useState([]);

  const agregarProducto = (producto) => {
    setProductosCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const borrarProducto = (id) => {
    setProductosCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => {
    setProductosCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{ productosCarrito, agregarProducto, borrarProducto, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);
