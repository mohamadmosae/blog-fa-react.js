import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const Navbar = () => {
const navigate=useNavigate()
  const logout=(e)=>{
    e.preventDefault()  
    localStorage.clear()
    navigate("/Login")
  }
  return (
    <>
    
<div className="bg-dark  text-light">
  
<div className="container d-flex  justify-content-between align-items-center">
  <div className="links col-md-6  col-sm-9 d-flex justify-content-around ">
  {
    localStorage.getItem("name")?(<>
        <NavLink to="/" className='btn active text-light  border-0'>خانه</NavLink>
    <NavLink to="/create" className='btn text-light  border-0'>ارسال بلاگ</NavLink>
    <NavLink to="/blog/Myblogs" className='btn text-light  border-0'> بلاگ های من</NavLink>
    <NavLink to="/search" className='btn text-light  border-0'>  جستجو </NavLink>
    <NavLink onClick={logout} className='btn text-light  border-0'>خروج</NavLink>
    </>):(<>
       <NavLink to="/" className='btn active text-light  border-0'>خانه</NavLink>
    <NavLink to="/register" className='btn text-light  border-0'>ثبت نام</NavLink>
    <NavLink to="/login" className='btn text-light  border-0'>ورود</NavLink> 
    </>)
  }


  </div>
  <Link to="/" className="logo text-decoration-none text-white fw-light"><h4>melo Chat</h4></Link>
</div> 
</div>
  

    </>
  )
}

export default Navbar
