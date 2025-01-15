import { Navigate } from "react-router";

// eslint-disable-next-line react/prop-types
export default function ProtectedAuthRoute({ children }) {
  if (!localStorage.getItem("accessToken")) {
    return <div>{children}</div>;
  } else {
    return <Navigate to={"/"} />;
  }
}
