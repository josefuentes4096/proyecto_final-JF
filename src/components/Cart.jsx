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
                      src={prod.thumbnail || prod.images?.[0]}
                      alt={prod.title}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={4}>
                    <h5>{prod.title}</h5>
                    <p>${prod.price}</p>
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
                  <Col md={3}>
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
