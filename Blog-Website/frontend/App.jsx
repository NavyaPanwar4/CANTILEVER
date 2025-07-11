import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import BlogDetail from "./Pages/BlogDetail.jsx";
import CreateEdit from "./Pages/CreateEdit.jsx";
import Header from "./components/Header.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Prob from "./Pages/Prob.jsx";
import EditBlog from "./Pages/EditBlog";
import EditPost from "./Pages/EditPost";
import CreateEditPost from "./Pages/CreateEditPost";
import Profile from "./Pages/Profile";
import SinglePost from "./Pages/SinglePost";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/blog/:id" element={<BlogDetail />} /> 
          <Route path="/create" element={<CreateEditPost />} />
          <Route path="/edit/:id" element={<CreateEditPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<EditBlog />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}

export default App;
