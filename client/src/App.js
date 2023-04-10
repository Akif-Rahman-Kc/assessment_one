import { BrowserRouter , Routes , Route} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import LogIn from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
