import { Button, Container } from "react-bootstrap";
import { Movies } from "./screens/components/moviesComponent";
import { Extra } from "./screens/components/extraComponent";
import { useState } from "react";

function App() {
  const [showExtra, setShowExtra] = useState(false);

  function toggleExtra(): void {
    setShowExtra(!showExtra);
  }

  return (
    <>
      <Button className="mb-2" variant="outline-warning" onClick={toggleExtra}>
        {showExtra ? "Hide" : "Show"} Extra Content
      </Button>
      {showExtra ? (
        <Extra />
      ) : (
        <div className="background">
          <Container className="d-flex flex-column align-items-center justify-content-between py-2">
            <h1 className="movie-stack-title">Movie Stack 🎬</h1>
            <Movies />
          </Container>
        </div>
      )}
    </>
  );
}

export default App;
