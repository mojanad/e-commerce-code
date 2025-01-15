import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout/Layout.jsx";
import { RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart.jsx";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import NotFound from "./pages/NotFound/NotFound.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup";
import UserContextProvider from "./context/UserContext.jsx";
import CounterContextProvider from "./context/CounterContext.jsx";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes.jsx";
import ProtectedAuthRoute from "./protectedRoutes/ProtectedAuthRoute.jsx";
const routing = createBrowserRouter([
  {
    path: "/",
    element: (
      <CounterContextProvider>
        <UserContextProvider>
          <Layout />
        </UserContextProvider>
      </CounterContextProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            {" "}
            <Home />{" "}
          </ProtectedRoutes>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoutes>
            <Brands />{" "}
          </ProtectedRoutes>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedAuthRoute>
            <Login />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <ProtectedAuthRoute>
            <Signup />{" "}
          </ProtectedAuthRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={routing}>
    <App />
  </RouterProvider>
);
