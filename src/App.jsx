import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CarritoProvider } from "./contexts/CarritoContext";


import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./components/Cart"; 
import ProductDetail from "./pages/ProductDetail";

import Admin from "./components/Admin";
import FormularioProducto from "./components/FormularioProducto";
import FormularioEdicion from "./components/FormularioEdicion";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter basename="/mi-ecommerce">
      <AuthProvider>
        <ProductosProvider>
          <CarritoProvider>
            <div className="d-flex flex-column min-vh-100">
              <NavBar />
              <main className="container my-4 flex-grow-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cart" element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  } />
                  <Route path="/product/:id" element={<ProductDetail />} />

                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/agregar" element={
                    <ProtectedRoute>
                      <FormularioProducto />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/editar/:id" element={
                    <ProtectedRoute>
                      <FormularioEdicion />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </CarritoProvider>
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
