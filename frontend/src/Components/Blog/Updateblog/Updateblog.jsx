import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Await, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yop from "yup";
// const formschima = Yop.object({
//   title: Yop.string().required("عنوان الزامی است"),
//   desc: Yop.string().required("متن الزامی است"),
// });
const Updateblog = () => {
  const [data, setdata] = useState([]);
  const [file, setfile] = useState("");
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [pre,setpre]=useState("")
  const navigate = useNavigate();
  const { id } = useParams();



  const fetchdata = async () => {
    await axios
      .get(`/posts/edit/${id}`)
      .then((res) => {
        // console.log(res);
        setdata(res.data);
        setpre(res.data.url)
        setfile(res.data.image);
        settitle(res.data.title);
        setdesc(res.data.desc);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const loadfile=(e)=>{
    const x=e.target.files[0]
    setfile(x)
    setpre(URL.createObjectURL(x))
      }
  const submithandler=async(e)=>{
    e.preventDefault()
    const formdata=new FormData()
    formdata.append("title",title)
    formdata.append("desc",desc)
    formdata.append("file",file) 
    await axios.put(`/posts/${id}`,formdata,{
      headers:{
            "Content-Type":"multipart/form-data",
          "Accept":"multipart/form-data"
      }
    }).then(res=>{
          Swal.fire({
            icon:"success",
            text:res.data.message,
            showConfirmButton:true,
            confirmButtonText:"تایید"
          })
          setTimeout(() => {
            navigate("/blog/Myblogs")
          }, 1500);
    }
    
    ).catch(err=>console.log(err)
    )
  }
  return (
    <>
      <div className="blog-post">
        <div className="container py-2 min-vh-100 d-flex flex-column justify-content-center ">
          <div className="post-title text-center">
            <h2 className="my-3 fw-bold fs-1 text-white">ویرایش پست</h2>
          </div>
          <div className="row justify-content-center py-3">
            <div className="col-lg-4 bg-dark rounded py-3">
              <div className="post-content">
                <form onSubmit={(e)=>submithandler(e)}>
                  <div className="form-group mt-3">
                    {/* {
                              errors&&<h6 className="text-danger mt-3">{errors}</h6>
                            } */}
                    <label className="mb-2 text-white">انتخاب عکس</label>
                    <input type="file" defaultValue={file} onChange={loadfile} className="form-control" name="file" />

                    <figure className="img-previwe mt-3 text-center">
                      <img src={pre} alt="" width="250px" />
                    </figure>
                  </div>
                  <div className="form-group mt-3">
                    <label className="mb-2 text-white">عنوان</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={title}
                    onChange={e=>settitle(e.target.value)}
                      // value={formic.values.title}
                      // onChange={formic.handleChange("title")}
                      // onBlur={formic.handleBlur("title")}

                      className="form-control"
                    />
                  </div>
                  {/* {
                              <p className="help text-danger">
                                {formic.touched.title&&formic.errors.title}
                              </p>
                            } */}

                  <div className="form-group mt-3">
                    <label className="mb-2 text-white">متن</label>
                    <textarea
                      defaultValue={data.desc}
                      name="desc"
                      className="form-control"
                      onChange={e=>setdesc(e.target.value)}
                    
                      //  value={formic.values.desc}
                      //  onBlur={formic.handleBlur("desc")}
                      //  onChange={formic.handleChange("desc")}
                    ></textarea>
                    <p className="help text-danger">
                      {/* {
                        formic.touched.desc&&formic.errors.desc
                      } */}
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

export default Updateblog;
