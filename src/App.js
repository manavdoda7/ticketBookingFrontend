import LoginForm from "./components/loginForm/loginForm";
import ClientRegisterForm from "./components/clientRegisterForm/clientRegisterForm";
import ProviderRegisterForm from "./components/providerRegisterForm/providerRegisterForm"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import ProviderShowDetails from "./components/providerShowDetails/providerShowDetails";
import CreateShow from "./components/createShow/createShow";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/user/login" element={<LoginForm type='Client'/>} />
        <Route exact path="/user/register" element={<ClientRegisterForm/>} />
        <Route exact path="/provider/login" element={<LoginForm type='Provider'/>} />
        <Route exact path="/provider/register" element={<ProviderRegisterForm/>} />
        <Route exact path="/provider/dashboard" element={<Dashboard/>} />
        <Route exact path="/provider/shows/:id" element={<ProviderShowDetails/>} />
        <Route exact path="/provider/createShow" element={<CreateShow />} />
      </Routes>
    </Router>
  );
}

export default App;
