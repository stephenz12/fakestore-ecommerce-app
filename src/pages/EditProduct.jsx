import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, Spinner, Alert } from "react-bootstrap";

function EditProduct() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setTitle(res.data.title);
      setPrice(res.data.price);
      setDescription(res.data.description);
      setCategory(res.data.category);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      title,
      price,
      description,
      category,
      image: "https://i.pravatar.cc",
    };

    axios
      .put(`https://fakestoreapi.com/products/${id}`, updatedProduct)
      .then(() => {
        setSuccess(true);
      });
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div>
      <h2 className="mb-4">Edit Product</h2>

      {success && (
        <Alert variant="success">
          Product updated successfully (mock API).
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">Update Product</Button>
      </Form>
    </div>
  );
}

export default EditProduct;
