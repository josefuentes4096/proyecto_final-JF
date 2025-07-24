import { useCarrito } from "../contexts/CarritoContext";
import { Container, Card, Button, Row, Col, Image } from "react-bootstrap";

export default function Cart() {
  const { productos, agregarProducto, eliminarProducto, vaciarCarrito } = useCarrito();

  if (!productos) return <p>El carrito está vacío.</p>;

  const total = productos.reduce(
    (acum, prod) => acum + prod.price * prod.cantidad,
    0
  );

  return (
    <Container>
      <h2 className="mb-4">Carrito de Compras</h2>

      {productos.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          {productos.map((prod) => (
            <Card key={prod.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image
                      src={prod.thumbnail || prod.imagen}
                      alt={prod.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <h5>{prod.name}</h5>
                    <p>Precio unitario: ${prod.price}</p>
                  </Col>
                  <Col md={3}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => eliminarProducto(prod.id, 1)}
                    >
                      -
                    </Button>{" "}
                    <span className="mx-2">{prod.cantidad}</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => agregarProducto(prod)}
                    >
                      +
                    </Button>
                  </Col>
                  <Col md={2}>
                    <p className="fw-bold mb-0">
                      Subtotal: ${ (prod.price * prod.cantidad).toFixed(2) }
                    </p>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarProducto(prod.id, prod.cantidad)}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          <h4 className="mt-4">Total: ${total.toFixed(2)}</h4>
          <Button variant="outline-danger" onClick={vaciarCarrito}>
            Vaciar Carrito
          </Button>
        </>
      )}
    </Container>
  );
}
