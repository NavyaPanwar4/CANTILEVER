import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import BlogDetail from "./Pages/BlogDetail.jsx";
import CreateEdit from "./Pages/CreateEdit.jsx";
import Header from "./components/Header.jsx";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Prob from "./Pages/Prob.jsx";


function App() {
  return (
    <>
      <Header />
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<BlogDetail />} />
          <Route path="/create" element={<CreateEdit />} />
          <Route path="/edit/:id" element={<CreateEdit />} />
          <Route path="*" element={<Prob />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}

export default App;


