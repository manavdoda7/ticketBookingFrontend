import LoginForm from "./components/loginForm/loginForm";
import ClientRegisterForm from "./components/clientRegisterForm/clientRegisterForm";
import ProviderRegisterForm from "./components/providerRegisterForm/providerRegisterForm"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import ShowDetails from "./components/showDetails/showDetails";
import CreateShow from "./components/createShow/createShow";
import CreateBooking from "./components/createBooking/createBooking";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/user/register" element={<ClientRegisterForm/>} />
        <Route exact path="/provider/register" element={<ProviderRegisterForm/>} />
        <Route exact path="/user/login" element={<LoginForm type='User'/>} />
        <Route exact path="/provider/login" element={<LoginForm type='Provider'/>} />
        <Route exact path="/user/dashboard" element={<Dashboard type='User'/>} />
        <Route exact path="/provider/dashboard" element={<Dashboard type='Provider'/>} />
        <Route exact path="/user/shows/:id" element={<ShowDetails type='User'/>} />
        <Route exact path="/provider/shows/:id" element={<ShowDetails type='Provider'/>} />
        <Route exact path="/provider/createShow" element={<CreateShow />} />
        <Route exact path="/user/createbooking/:id" element={<CreateBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
