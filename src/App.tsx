import { Container } from "react-bootstrap";
import { Movies } from "./screens/components/moviesComponent";

function App() {
  return (
    <Container className="background d-flex flex-column align-items-center justify-content-between py-5">
      <h1>Movie Stack 🎬</h1>
      <Movies />
    </Container>
  );
}

export default App;
