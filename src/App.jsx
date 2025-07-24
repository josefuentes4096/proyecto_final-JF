import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CarritoProvider } from "./contexts/CarritoContext";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./components/Cart";
import ProductDetail from "./pages/ProductDetail";
import FormularioProducto from "./components/FormularioProducto";
import FormularioEdicion from "./components/FormularioEdicion";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <BrowserRouter basename="/mi-ecommerce">
          <div className="d-flex flex-column min-vh-100">
            <NavBar />
            <main className="container flex-grow-1 py-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/admin/agregarProducto" element={
                  <ProtectedRoute>
                    <FormularioProducto />
                  </ProtectedRoute>
                } />
                <Route path="/admin/editarProducto/:id" element={
                  <ProtectedRoute>
                    <FormularioEdicion />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
