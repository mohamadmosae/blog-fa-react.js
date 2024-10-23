import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { BsFillEmojiNeutralFill } from "react-icons/bs";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import "./Myblogs.css";
const Myblogs = () => {
  const navigate=useNavigate()
  const [data, setdata] = useState(null);
  const fetchdata = async () => {
    let id = localStorage.getItem("userId");
    try {
      const res = await axios.get(`/posts/mypost/${id}`);
      setdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata()
  }, []);
const deleteitem=async(e)=>{
  await axios.delete(`/posts/${e}`).then(res=>{ 
if (res.data.status===200) {
  Swal.fire({
    icon:"success",
    text:res.data.message,
    showConfirmButton:true,
    confirmButtonText:'تایید' })
    fetchdata()
}
   
  }).catch(err=>console.log(err)
  )
}
 

  return (
<>

      <div>
      <div className="home">
        <div className="container py-5">
          <div className="row mt-5">
            {data?.map((elem) => {
              return (
                <div className="col-lg-4 col-md-6 mt-4 " key={elem.id}>
                  <div className="blog-item shadow p-2">
                    <div className="blog-item-img">
                      <img src={elem.url} className="blog-img w-100" alt="" />

                      <div className="blog-tools">
                        <span onClick={()=>deleteitem(elem.id)} className="btn  btn-sm btn-danger rounded-circle d-flex justify-content-center align-items-center p-2">
                          <BsFillEmojiNeutralFill />
                        </span>
                        <Link to={`/blog/updateblog/${elem.id}`} state={elem} className="btn btn-sm btn-success rounded-circle d-flex justify-content-center align-items-center p-2">
                          <BsFillEmojiLaughingFill />
                        </Link>
                      </div>
                    </div>

                    <div className="blog-item-text mt-3 pb-2">
                      <div className="author border-bottom pb-2">
                        <h6 className="fw-bold "> {elem.title} </h6>
                        <small className="fw-bold text-muted">
                          نویسنده : {elem.user.name}
                        </small>
                      </div>
                      <Link
                        className="btn btn-dark w-100"
                        state={elem}
                        to={`/blog_diteails/${elem.id}`}
                      >
                        مشاهده
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>


</>
  );
};

export default Myblogs;
