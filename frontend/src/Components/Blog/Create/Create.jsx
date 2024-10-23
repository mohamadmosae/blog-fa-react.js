import React, { useState } from "react";
import "./Create.css";
import axios from "axios";
import Swal from "sweetalert2";
import * as Yop from "yup";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
const formschema = Yop.object({
  title: Yop.string().required("عنوان شما الزامی است."),
  desc: Yop.string().required("متن شما الزامی است."),
});
const Create = () => {
  const userId = localStorage.getItem("userId");
  const [errors, seterrors] = useState([]);
  const [file, setfile] = useState([]);
  const [previwe, setpreviwe] = useState("");
  const navigate=useNavigate()

  const loadimage = (e) => {    
    const image = e.target.files[0];
   
    
    setfile(image);
    
    
    setpreviwe(URL.createObjectURL(image));
  };
 
  
  const handleSubmit = async (data) => {
   
    
    
    const formdata = new FormData()
    formdata.append("file", data.file);
    formdata.append("title", data.title);
    formdata.append("desc", data.desc);
    formdata.append("userId", data.userId); 
 
    try {
      const res = await axios.post("/posts", formdata,{
        headers:{
          "Content-Type":"multipart/form-data",
          "Accept":"multipart/form-data"
        }
      });
      if (res.data.error) {
        seterrors(res.data.error);
        console.log(res);
      } else {
        console.log(res);
        
        Swal.fire({
          icon: "success",
          title: "تبریک میگم!",
          text: res.data.message,
          showConfirmButton: true,
          confirmButtonText: "تایید!",
          timer: 5000, 
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formic = useFormik({
    initialValues: {
      title: "",
      desc: "",
      file: "",
      userId:userId,
    },
    validationSchema: formschema,
    onSubmit: (values) => {
      const data={
        title:values.title,
        desc:values.desc,
        file:file,
        userId:userId
      }
    
      
      handleSubmit(data)
    },
  });
  //  res=>{
  //     if (res.data.status===200) {
  //       Swal.fire(
  //         {
  //           title: 'Success',
  //           text: 'موفق!',
  //         text:res.data.message,
  //           icon: 'success',
  //           timer: 2000
  //         }
  //       )

  // console.log(res);

  //     }else if(res.data.status===422){
  // seterrors(res.data.errors)
  // console.log(res);

  //     }
  //   }
  return (
    <>
      <div className="blog-post">
        <div className="container py-2 min-vh-100 d-flex flex-column justify-content-center ">
          <div className="post-title text-center">
            <h2 className="my-3 fw-bold fs-1 text-white">حرف دلتو بزن.</h2>
          </div>
          <div className="row justify-content-center py-3">
            <div className="col-lg-4 bg-dark rounded py-3">
              <div className="post-content">
                <form onSubmit={formic.handleSubmit}>
                  <div className="form-group mt-3">
                  {
                    errors&&<h6 className="text-danger mt-3">{errors}</h6>
                  }
                    <label className="mb-2 text-white">انتخاب عکس</label>
                    <input
                      type="file"
                      className="form-control"
                      name="file"
                      onChange={loadimage}
                    />
                    {previwe ? (
                      <figure className="img-previwe mt-3 text-center">
                        <img src={previwe} alt="" width="250px" />
                      </figure>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mt-3">
                    <label className="mb-2 text-white">عنوان</label>
                    <input
                      type="text"
                      name="title"
                      value={formic.values.title}
                      onChange={formic.handleChange("title")}
                      onBlur={formic.handleBlur("title")}
                      className="form-control"
                    />
                  </div>
                  {
                    <p className="help text-danger">
                      {formic.touched.title && formic.errors.title}
                    </p>
                  }

                  <div className="form-group mt-3">
                    <label className="mb-2 text-white">متن</label>
                    <textarea
                      value={formic.values.desc}
                      name="desc"
                      className="form-control"
                      onChange={formic.handleChange("desc")}
                      onSubmit={formic.handleBlur("desc")}
                    ></textarea>
                    <p className="help text-danger">
                      {formic.touched.desc && formic.errors.desc}
                    </p>
                  </div>
                  <div className="form-gruop mt-3">
                    <button
                      className="w-100 mt-4 btn btn-success"
                      type="submit"
                    >
                      ارسال پست
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
