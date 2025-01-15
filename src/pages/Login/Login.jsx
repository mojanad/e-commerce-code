import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { baseUrl } from "../../constants/constants";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserLoginData } = useContext(UserContext);
  const UserSchema = Yup.object().shape({
    email: Yup.string().required().email("Please enter a valid email"),
    password: Yup.string()
      .required()
      .matches(/[a-zA-Z0-9]{8,}/, "Please enter a valid password"),
  });

  const handleLogin = async (values) => {
    const loadingToaster = toast.loading("wait..");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/auth/signin`,
        values
      );
      toast.success(data.message);
      toast.dismiss(loadingToaster);
      setLoading(false);
      console.log(data);
      setUserLoginData(data.token);
      localStorage.setItem("accessToken", data.token);
      navigate("/");
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
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    // validate: handleValidation,
    validationSchema: UserSchema,
  });

  return (
    <section className="container mx-auto  m-5">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl mb-4">Login now</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-end gap-2"
      >
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

        {!loading ? (
          <button
            type="submit"
            className="text-white mt-2 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Login
          </button>
        ) : (
          <button
            type="button"
            className="text-white mt-2 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Login <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        )}
      </form>
    </section>
  );
}
