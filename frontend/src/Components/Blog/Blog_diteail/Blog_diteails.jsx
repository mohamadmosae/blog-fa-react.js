import React, { useEffect, useState } from "react";
import "./Blog_diteal.css";
import axios from "axios";

import { useLocation, useParams } from "react-router-dom";
import Comments from "../../Comments/Comments";
const Blog_diteails = () => {
 const location=useLocation()

 const [item,setitem]=useState(location.state)
 
 

 

  return (
    <div className="container py-5">
      <div className="row py-5 justify-content-center ">
        <div className="col-lg-8 mt-4">
          <div className="blog-item">
            <img src={item.url} alt="" className="w-100 blog-img" />
            <div className="blog-item-text p-3">
              <div className="auther d-flex pb-2 justify-content-between  ">
                <h6 className="fw-bold">{item.title}</h6>
                <h6 className="fw-bold">نویسنده : {item.user.name}</h6>
              </div>
              <div className="mt-3">متن : {item.desc}</div>
            </div>
          </div> <div className="comments">
          <Comments postId={item.id}/>
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default Blog_diteails;
