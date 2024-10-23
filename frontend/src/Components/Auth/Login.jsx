import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Formik, useFormik } from "formik";
import * as Yop from "yup";
const formschema = Yop.object({
  email: Yop.string()
    .email("ایمیل معتر نیست.")
    .required("ایمیل شما الزامی است"),
  password: Yop.string().required("رمز عبور شما الزامی است "),
});

const Login = () => {
  const [errors, seterrors] = useState([]);
  const navigate = useNavigate();
  const handelsubmit = async (valuse) => {
    const data = {
      email: valuse.email,
      password: valuse.password,
    };
    try {
      const res = await axios.post("/login", data);
      if (res.data.error) {
        seterrors(res.data.error);
      } else {
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("userId", res.data.userId);
        Swal.fire({
          title: "تبریک میگم!",
          text: res.data.message,
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "تایید",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);

        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formic = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formschema,
    onSubmit: (values) => {
      handelsubmit(values);
    },
  });

  // const handelsubmit= async(e)=>{
  // e.preventDefault()
  // const data={
  //   email,
  //   password
  // }
  // await axios.get('/sanctum/csrf-cookie').then(response => {
  //  axios.post('/api/login',data).then(
  //       res=>{

  //         console.log(res);

  //         if(res.data.status===200){
  //           Cookies.set("token",res.data.token)
  //           localStorage.setItem("user_name",res.data.username)
  //           localStorage.setItem("user_id",res.data.user_id)
  //           Swal.fire({
  //             title:"تبریک میگم!",
  //             text:res.data.message,
  //             icon:"success",
  //             showConfirmButton:true,
  //             confirmButtonText:"تایید"
  //           }
  //         )
  //         setTimeout(() => {
  //           navigate("/")
  //         }, 2000);
  //         }else if(res.data.status===401){
  //         Swal.fire(
  //           {
  //             title:"خطا!",
  //             text:res.data.message,
  //             icon:"warning",
  //             showConfirmButton:true,
  //             confirmButtonText:"تایید" ,

  //           }
  //         )
  //         }else{
  //           seterror(res.data.validation_errors)
  //         }
  // }
  //     ).catch(err=>console.log(err)
  //     )
  //   })}

  return (
    <>
      <div className="auth login">
        <div className="container">
          <div className="row min-vh-100  auth-res  align-items-center">
            <div className="col-lg-4 col-md-6 bg-dark py-3 rounded">
              <div className="auth-title mb-3 text-center text-white">
                <h2 className="  register-title"> وارد شوید .</h2>
              </div>
              <div className="text-center text-danger">
                {errors && <h6>{errors}.</h6>}
              </div>
              <form onSubmit={formic.handleSubmit}>
                <div className="form-group mt-3">
                  <label className="text-white " htmlFor="email">
                    ایمیل
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={formic.values.email}
                    onChange={formic.handleChange("email")}
                    onBlur={formic.handleBlur("name")}
                  />
                  <p className="text-danger">
                    {formic.touched.email && formic.errors.email}
                  </p>
                </div>
                <div className="form-group mt-3">
                  <label className="text-white " htmlFor="password">
                    پسوورد
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="password"
                    value={formic.values.password}
                    onChange={formic.handleChange("password")}
                    onBlur={formic.handleBlur("password")}
                  />
                  <p className="text-danger">
                    {formic.touched.password && formic.errors.password}
                  </p>
                </div>
                <div className="form-group mt-4">
                  <button type="submit" className="btn w-100 btn-success">
                    ورود
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
