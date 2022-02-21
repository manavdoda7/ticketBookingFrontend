import LoginForm from "./components/loginForm/loginForm";
import ClientRegisterForm from "./components/clientRegisterForm/clientRegisterForm";
import ProviderRegisterForm from "./components/providerRegisterForm/providerRegisterForm"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/user/login" element={<LoginForm type='Client'/>} />
        <Route exact path="/user/register" element={<ClientRegisterForm/>} />
        <Route exact path="/provider/login" element={<LoginForm type='Provider'/>} />
        <Route exact path="/provider/register" element={<ProviderRegisterForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
