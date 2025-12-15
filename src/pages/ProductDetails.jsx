import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Spinner, Alert } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`https://fakestoreapi.com/products/${id}`).then(() => {
      alert("Product deleted (mock API).");
      navigate("/products");
    });
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card className="p-4">
      <Card.Img
        variant="top"
        src={product.image}
        style={{ height: "300px", objectFit: "contain" }}
      />

      <Card.Body>
        <Card.Title>{product.title}</Card.Title>

        <Card.Text>{product.description}</Card.Text>

        <Card.Text>
          <strong>Category:</strong> {product.category}
        </Card.Text>

        <Card.Text>
          <strong>Price:</strong> ${product.price}
        </Card.Text>

        <div className="mt-3">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => navigate(`/edit-product/${id}`)}
          >
            Edit Product
          </Button>

          <Button variant="danger" onClick={handleDelete}>
            Delete Product
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductDetails;
