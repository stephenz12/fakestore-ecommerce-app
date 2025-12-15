import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Home() {
  return (
    <div>
      <h1>FakeStore E-Commerce App</h1>
      <p>
        Welcome to my store built with React and FakeStoreAPI. Browse products,
        view details, and manage items using a mock API.
      </p>

      <Button as={Link} to="/products" variant="primary">
        View Products
      </Button>
    </div>
  );
}

export default Home;
