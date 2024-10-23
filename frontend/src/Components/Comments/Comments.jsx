import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Comments.css";

const Comments = ({ postId }) => {
  const [comment, setcomment] = useState("");
  const [allcoments, setallcoments] = useState([]);
  const [error, seterror] = useState(true);

  const userId = localStorage.getItem("userId");
  const handelsubmit = async (e) => {
    e.preventDefault();
    const data = {
      commentBody: comment,
      userId: userId,
      postId: postId,
    };
if (comment) {
                await axios
                .post("/comments", data)
                .then((res) => {
                  Swal.fire({
                    icon: "success",
                    text: res.data.message,
                    showConfirmButton: true,
                    confirmButtonText: "تایید",
                  });
                  seterror(false);
                  fetchcomments();
                  setcomment("");
                })
                .catch((err) => console.log(err));
                seterror(false)     
}else{
                seterror(true)
}

  };

  const fetchcomments = async () => {
    await axios
      .get(`/comments/${postId}`)
      .then((res) => {
        setallcoments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchcomments();
  }, []);
  console.log(error);
  return (
    <div className="comments">
 
   
   <form className="mt-5 " onSubmit={handelsubmit}>
   {
                error&&<small className="text-danger p-3 text-center">نوشتن کامنت الزامی است</small>
   }
        <textarea
          className="form-control text"
          onChange={(e) => {
            setcomment(e.target.value);
          }}
          value={comment}
          name="comments"
          placeholder="نظر شما..."
        ></textarea>

        <button
          className="btn text-white btn bg-success btn-sm mt-3"
          type="submit"
        >
          ارسال نظر
        </button>
      </form>
      {allcoments?.map((elem) => {
        return (
          <div key={elem.id} className=" rounded sub p-3 d-flex justify-content-between flex-column border m-3">
            <h6 className=" mb-3">{elem.commentBody}</h6>
            <p className="text-muted   ">نویسنده : {elem.user.name}</p>
          </div>
        );
      })}
   </div>
   
  );
};

export default Comments;
