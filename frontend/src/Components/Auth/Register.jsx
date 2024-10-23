import React, { useEffect, useState } from "react";
import "./Auth.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yop from "yup";
const formschema = Yop.object({
  name: Yop.string().required("نام شما الزامی است."),
  email: Yop.string()
    .email("ایمیل معتر نیست.")
    .required("ایمیل شما الزامی است"),
  password: Yop.string().required("رمز عبور شما الزامی است "),
  confPassword: Yop.string().required("تکرار رمز عبور شما الزامی است"),
});
const Register = () => {
  const [error, seterror] = useState([]);
  const navigate = useNavigate();
  const handelsubmit = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      confPassword: values.confPassword,
    };
    console.log(data);
    
    try {
      const res = await axios.post("/register", data);
      if (res.data.error) {
        seterror(res.data.error);
      } else {
        console.log(res);
        Swal.fire({
          title: "تبریک میگم!",
          text: res.data.message,
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "تایید",
        });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطایی رخ داد",
        text: "لطفا دوباره تلاش کنید",
      });
    }
  };

  const formic = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confPassword: "",
    },
    validationSchema: formschema,
    onSubmit: (valuse) => {
      handelsubmit(valuse);
    },
  });

  return (
    <div className="auth register">
      <div className="container">
        <div className="row min-vh-100  auth-res align-items-center">
          <div className="col-lg-4 col-md-6  bg-dark py-4 rounded">
            <div className="auth-title  text-center text-white">
              <h2 className="   register-title">ثبت نام کنید.</h2>
            </div>
            <div className="">
              {error && <h6 className=" text-danger  mt-3">{error}</h6>}
            </div>
            <form onSubmit={formic.handleSubmit}>
              <div className="form-group mt-3">
                <label className="text-white mb-2 " htmlFor="name">
                  نام شما
                </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="name"
                  value={formic.values.name}
                  onChange={formic.handleChange("name")}
                  onBlur={formic.handleBlur("name")}
                />

                <p className="help text-danger">
                  {formic.touched.name && formic.errors.name}
                </p>
              </div>
              <div className="form-group mt-3">
                <label className="text-white mb-2" htmlFor="email">
                  ایمیل
                </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="email"
                  value={formic.values.email}
                  onChange={formic.handleChange("email")}
                  onBlur={formic.handleBlur("email")}
                />

                <p className="help text-danger">
                  {formic.touched.name && formic.errors.email}
                </p>
              </div>
              <div className="form-group mt-3">
                <label className="text-white mb-2" htmlFor="password">
                  رمز عبور
                </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="password"
                  value={formic.values.password}
                  onChange={formic.handleChange("password")}
                  onBlur={formic.handleBlur("password")}
                />

                <p className="help text-danger">
                  {formic.touched.name && formic.errors.password}
                </p>
              </div>
              <div className="form-group mt-3">
                <label className="text-white mb-2" htmlFor="password">
                  تکرار رمز عبور
                </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="confPassword"
                  value={formic.values.confPassword}
                  onChange={formic.handleChange("confPassword")}
                  onBlur={formic.handleBlur("confPassword")}
                />

                <p className="help text-danger">
                  {formic.touched.name && formic.errors.confPassword}
                </p>
              </div>
              <div className="form-group mt-4">
                <button type="submit" className="btn w-100 btn-success">
                  ثبت نام
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
