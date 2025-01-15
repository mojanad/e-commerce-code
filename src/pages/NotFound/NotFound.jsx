import { Link } from "react-router";
import notFoundImg from "../../assets/404.jpg";

export default function NotFound() {
  return (
    <div className="p-8 flex flex-col gap-4 items-center justify-center mx-auto my-48 h-96 container">
      <img src={notFoundImg} alt="this page not found" />
      <p className="text-xl">
        Back to{" "}
        <Link className="text-blue-500 capitalize underline" to="/">
          home
        </Link>
      </p>
    </div>
  );
}
