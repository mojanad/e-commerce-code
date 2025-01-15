import { NavLink, useNavigate } from "react-router";
import mainLogo from "../../assets/freshcart-logo.svg";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
export default function Navbar() {
  const { userLoginData, setUserLoginData } = useContext(UserContext);

  const navigate = useNavigate();
  function handleSignOut() {
    setUserLoginData(null);
    navigate("/login");
    localStorage.clear();
  }
  return (
    <nav className=" bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row  justify-between items-center py-4 gap-3 ">
        {/* start left side */}
        <div className="flex-col md:flex-row flex items-center gap-2 ">
          <img src={mainLogo} alt="" />

          <ul className="flex items-center gap-2 flex-col md:flex-row">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
            <li>
              <NavLink to="/brands">Brands</NavLink>
            </li>
          </ul>
        </div>

        {/* right side */}
        <div className="flex items-center flex-col md:flex-row  gap-2">
          {/* icons */}
          <div className="flex items-center gap-2">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-tiktok"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>
          <div>
            <ul className="flex items-center gap-2">
              {!userLoginData ? (
                <>
                  <li>
                    <NavLink to="/login">login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup">signup</NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={handleSignOut}>sign out</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
