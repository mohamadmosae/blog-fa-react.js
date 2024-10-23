import React from "react";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../Home/Home";
import "./App.css"
import  axios from "axios";
import Create from "../Blog/Create/Create";
import Blog_diteails from "../Blog/Blog_diteail/Blog_diteails";
import Myblogs from "../Blog/Myblogs/Myblogs";
import Updateblog from "../Blog/Updateblog/Updateblog";
// import Search from "../Search/Search";
axios.defaults.headers.post['Content-Type']="application/json"
axios.defaults.headers.post['Accept']="application/json"
axios.defaults.withCredentials=true
axios.defaults.baseURL="http://localhost:5000"

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/blog_diteails/:id" element={<Blog_diteails/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/blog/Myblogs" element={<Myblogs/>}/>
        <Route path="/blog/updateblog/:id" element={<Updateblog/>}/>
        {/* <Route path="/search" element={<Search/>}/> */}
      </Routes>
    </BrowserRouter>
  );
} 

export default App;
