import { BrowserRouter,Route,Routes } from "react-router-dom";
import Feeddb from "./feeddb";
import "./App.css"
import Wait from "./wait";

function App() {
  return (
    <div>
      <br />
      <center>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wait />} />
          <Route path="/feedBackDataBaseHonkaiStarRailBunnySDataBasefromTheReactjsproject" element={<Feeddb />} />
        </Routes>
      </BrowserRouter>
      </center>
    </div>
  );
}

export default App;
