import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSocket } from "./hooks/useSocket/useSocket.ts";
import Game from "./components/Game/Game.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {
  useSocket();

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="*" element={<Game />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
