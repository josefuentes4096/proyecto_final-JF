import ProductList from "../components/ProductList";

function Admin() {
  return (
    <div className="container">
      <h1 className="mb-4">Administración de Productos</h1>
      <ProductList modo="admin" />
    </div>
  );
}

export default Admin;
