import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price,
      description,
      category,
      image: "https://i.pravatar.cc", // placeholder image
    };

    axios.post("https://fakestoreapi.com/products", newProduct).then(() => {
      setSuccess(true);
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
    });
  };

  return (
    <div>
      <h2 className="mb-4">Add Product</h2>

      {success && (
        <Alert variant="success">
          Product created successfully (mock API).
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
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
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">Add Product</Button>
      </Form>
    </div>
  );
}

export default AddProduct;
