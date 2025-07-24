import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./contexts/CarritoContext";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter basename="/mi-ecommerce">
      <CarritoProvider>
        <Navbar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
			<Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </CarritoProvider>
    </BrowserRouter>
  );
}

export default App;
