import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

function SearchBook() {
  const API_URL = "http://localhost:8080/bookaroo/api";

  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearchBook = async (searchText, page = 1) => {
    try {
      const response = await fetch(
        `${API_URL}/books?searchText=${searchText}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setBooks(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }
  };

  useEffect(() => {
    handleSearchBook(searchText);
  }, [searchText, currentPage]);

  return (
    <div className="container-fluid text-primary h-auto d-flex flex-column justify-content-center align-items-center px-5 pt-5">
      <div className="mb-2">
        <h2 className="text-center mb-4">Search for a book</h2>
        <form onSubmit={(event) => { event.preventDefault(); handleSearchBook(searchText, 1); }}>
          <input
            type="text"
            name="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="primary" type="submit" className="ms-1">
            Search
          </Button>
        </form>
      </div>

      {books.length > 0 ? (
        <div className="container d-flex justify-content-center flex-wrap">
          {books.map(book => (
            <Card key={book.id} className="m-2" style={{ height: "465px", width: "325px" }}>
              <Card.Body>
                <Card.Title style={{ height: "50px" }}>
                  <strong>{book.title}</strong>
                  <span className="ps-1 text-muted small">{book.year}</span>
                  <span className="ps-1 text-muted small">{book.genre}</span>
                  <span className="ps-1 text-muted small">{book.description}</span>
                </Card.Title>
                <hr />
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        books !== undefined && (
          <p>No books found. Please try a different search.</p>
        )
      )}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="primary"
            className="me-2"
            onClick={() => handleSearchBook(searchText, currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSearchBook(searchText, currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next Page
          </Button>
        </div>
      )}
    </div>
  );
}

export default SearchBook;
