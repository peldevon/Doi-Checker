import axios from "axios";
import { useState } from "react";
import "./app.css";
import { Container, Nav, Navbar } from 'react-bootstrap';


function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);

  const handleSearch = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await axios.get(
        `https://api.crossref.org/works/${query}`
      );
      console.log(result.data.message)
      setData(result.data.message);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const calculateCitations = () => {
    const { author } = data;
    let grade = 0;
    if (data.type === "journal-article") {
      grade += 20
    };

    if (
      data.publisher === 'Institute of Electrical and Electronics Engineers (IEEE)' ||
      data.publisher === 'wiley' ||
      data.publisher === 'American Association for the Advancement of Science (AAAS)'
    ) {
      grade += 20
    }
    if (
      data.publisher === 'JSTOR' ||
      data.publisher === 'association for computing machinery (acm)' ||
      data.publisher === 'Elsevier BV' ||
      data.publisher === 'Informa UK Limited' ||
      data.publisher === 'The Open Journal'
    ) {
      grade += 10
    } else {
      grade += 5
    }
    setScore(grade)
    return grade;
  }

  return (
    <div className="">
      <Navbar bg="light" expand="lg"></Navbar>
      <Container>
      {/* Add svg from link */}
      <div>
        <img src="https://www.emu.edu.tr/static/images/logos/logo-name-tr.svg" alt="logo" height={80} width={100}></img>
      </div>
        <Navbar.Brand href="#home">DOI Checker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://www.emu.edu.tr/tr">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Nav>

        <div className="form-group d-flex">
          <input
            className="form-control mr-2"
            placeholder="Search..."
            style={{ width: "80%" }}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
          <span className="mr-3">

            <button className="btn btn-secondary" onClick={handleSearch}>Search</button>
          </span>
        </div>
        <div className="card-body">

          {error && <div>Something went wrong ...</div>}
          {loading ? (
            <div>Loading ...</div>
          ) :
            data && (
              <div className="p-2">
                <div className="row w-100">
                  <div className="col-12">
                    <div className="card">

                      <div className="card-body">

                        <h4 className="card-title">{data?.title}</h4>
                        <p className="card-text">DOI: {data?.DOI}</p>
                        <p className="card-text"><span className="font-weight-500">Publisher:</span> {data?.publisher}</p>
                        <h6>Authors</h6>
                        {data?.author?.map((author) => (
                          <p className="card-text">{author?.family}, {author?.given}</p>
                        ))}
                        <br></br>
                        <button className="btn btn-secondary" onClick={calculateCitations}>Calculate Citations</button>
                        <br></br>
                        <div>
                          <h3>Citation Score: {score}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </Container>
    </div>
  );
}
export default App;
