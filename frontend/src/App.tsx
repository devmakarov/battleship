import { HashRouter, Routes, Route } from "react-router-dom";
import { useSocket } from "./hooks/useSocket/useSocket.ts";
import Game from "./components/Game/Game.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {
  useSocket();

  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="*" element={<Game />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
