import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import "./App.css";
import EmployeeCrud from "./components/EmployeeCrud";
function App() {
  return (
    <div>
      <Navbar />
      <EmployeeCrud />
      <Contact />
    </div>
  );
}

export default App;
