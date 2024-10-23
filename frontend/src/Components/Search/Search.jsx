import axios from "axios";
import React from "react";
import Posts from "../../../../backend/models/Posts";

const Search = () => {
  const searchblog = async (e) => {
    
            

    
    await axios
      .post("/search" )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container py-5">
      <div className="row py-5 justify-content-center">
        <div className="col-lg-4 ">
          <h4 className="text-center  fw-bold border-bottom pb-3">
            جستجو کنید.
          </h4>
          <input
            onChange={(e) => searchblog(e.target.value)}
            type="text"
            placeholder="متن مورد نظر خود را وارد کنید!"
            className="form-control mt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
