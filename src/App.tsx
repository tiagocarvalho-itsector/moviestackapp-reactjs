import { Container } from "react-bootstrap";
import { Movies } from "./screens/components/moviesComponent";

function App() {
  return (
    <div className="background">
      <Container className="d-flex flex-column align-items-center justify-content-between py-">
        <h1 className="movie-stack-title">Movie Stack 🎬</h1>
        <Movies />
      </Container>
    </div>
  );
}

export default App;
