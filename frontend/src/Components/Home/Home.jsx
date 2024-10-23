import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
const Home = () => {
  const [data, setdata] = useState(null);
  const handelposts = async () => {
    await axios
      .get("/posts", {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
        },
      })
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handelposts();
  }, []);


  

  return (
    <div className="home">
      <div className="home-img"></div>
      <div className="container py-5">
        <h1 className="fw-bold home-title mx-auto">از همجا با ما باش</h1>
        <div className="row mt-5">
          {data?.map((elem) => {
            return (

              <div className="col-lg-4 col-md-6 mt-4 " key={elem.id}>
             
                <div className="blog-item shadow p-2">
                  <img src={elem.url} className="blog-img w-100" alt="" />
                  <div className="blog-item-text mt-3 pb-2">
                    <div className="author border-bottom pb-2">
                      <h6 className="fw-bold "> {elem.title} </h6>
                      <small className="fw-bold text-muted">
                        نویسنده :  {elem.user.name}
                      </small>
                    </div>
                  <Link className="btn btn-dark w-100" 
                  state={elem} to={`/blog_diteails/${elem.id}`}>
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
  );
};

export default Home;
