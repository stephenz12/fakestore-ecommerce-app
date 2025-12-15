import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2 className="mb-4">Products</h2>

      <Row>
        {products.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "200px", objectFit: "contain" }}
              />

              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>

                <Button as={Link} to={`/products/${product.id}`}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Products;
