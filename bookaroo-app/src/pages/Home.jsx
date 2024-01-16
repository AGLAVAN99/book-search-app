import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <div className="container-fluid text-primary h-auto d-flex flex-column justify-content-center align-items-center px-5">
      <h2 className="text-center mb-4">
        Welcome to Bookaroo. What would you like to read today?
      </h2>

      <div className="d-flex flex-column flex-md-row justify-content-center gap-2 w-100">
        <Link to="/search-book" className="linkstyle">
          <Button variant="primary" className="col-md-3 col-sm-12">
            Search for a book
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
