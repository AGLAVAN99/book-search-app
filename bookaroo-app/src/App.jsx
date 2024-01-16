import Home from "./pages/Home";
import SearchBook from "./pages/SearchBook";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookaroo" element={<SearchBook />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
