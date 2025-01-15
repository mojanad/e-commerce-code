import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { baseUrl } from "../../constants/constants";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .max(5)
      .min(3)
      .matches(/^[A-Z][a-z]{2,5}/),
    email: Yup.string().required().email("Please enter a valid email"),
    password: Yup.string()
      .required()
      .matches(/[a-zA-Z0-9]{8,}/, "Please enter a valid password"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "you must enter the same password")
      .required(),
    phone: Yup.string()
      .required()
      .matches(/^(01)[1052][0-9]{8}/, "Enter an egyption number"),
  });

  // eslint-disable-next-line no-unused-vars
  const handleValidation = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "This input is require";
    } else if (!/^[A-Z][a-z]{2,5}/.test(values.name)) {
      errors.name = "min cahr is 3 ";
    }
    if (!values.email) {
      errors.email = "This input is require";
    } else if (
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        values.email
      )
    ) {
      errors.email = "Please enter a valid email";
    }
    if (!values.password) {
      errors.password = "This input is require";
    } else if (!/[a-zA-Z0-9]{8,}/.test(values.password)) {
      errors.password = "Please enter a valid password";
    }
    if (!values.rePassword) {
      errors.rePassword = "This input is require";
    } else if (values.password !== values.rePassword) {
      errors.rePassword = "Enter your password again";
    }
    if (!values.phone) {
      errors.phone = "This input is require";
    } else if (!/^(01)[1052][0-9]{8}/.test(values.phone)) {
      errors.phone = "Enter an egyption number";
    }

    return errors;
  };

  const handleRegister = async (values) => {
    const loadingToaster = toast.loading("wait..");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/auth/signup`,
        values
      );
      toast.success(data.message);
      toast.dismiss(loadingToaster);
      setLoading(false);

      navigate("/login");
    } catch (error) {
      toast.dismiss(loadingToaster);
      setLoading(false);
      if (error?.response.data.message) {
        toast.error(error?.response.data.message);
      } else {
        toast.error(error?.response.data.errors.msg);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleRegister,
    // validate: handleValidation,
    validationSchema: UserSchema,
  });

  return (
    <section className="container mx-auto  m-5">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl mb-4">Register now</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-end gap-2"
      >
        <div className=" w-full">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="name@flowbite.com"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500">{formik.errors.name}</p>
          )}
        </div>
        <div className=" w-full">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="name@flowbite.com"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div className=" w-full">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}
        </div>
        <div className=" w-full">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Repeat the password
          </label>
          <input
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="rePassword"
            name="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <p className="text-red-500">{formik.errors.rePassword}</p>
          )}
        </div>
        <div className=" w-full">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your phone
          </label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500">{formik.errors.phone}</p>
          )}
        </div>

        {!loading ? (
          <button
            type="submit"
            className="text-white mt-2 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Register
          </button>
        ) : (
          <button
            type="button"
            className="text-white mt-2 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Register <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        )}
      </form>
    </section>
  );
}
