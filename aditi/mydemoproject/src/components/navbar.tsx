import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../css/navbar.css"
import { useAppSelector } from "../store/slice/hooks";

export default function Nav() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.clear();
    toast.success("You have been logged out.", { autoClose: 1000 });
    navigate("/product");
  };

  const data = useAppSelector((state) => state.api.data);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <b className="navbar-brand ms-2">
            <NavLink className="nav-link active" aria-current="page" to="/">
              <i className="bi bi-shop-window"></i>
            </NavLink>
          </b>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/product"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/product/add"
                >
                  Add Product
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/product/offer"
                >
                  Offers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/product/wishlist"
                >
                  Wishlist
                </NavLink>
              </li>
            </ul>
            {token && data && data.username ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <b>
                    <span className="text-white">Welcome {data.username}!</span>
                  </b>
                </button>

                <ul className="dropDownItemmenu dropdown-menu">
                  <li>
                    <a className="dropDownItem dropdown-item" href="#" onClick={handleLogOut}>
                    <i className="bi bi-box-arrow-in-left"></i> Logout
                    </a>
                  </li>
                  <li>
                    <a className="dropDownItem dropdown-item" href="/userprofile">
                    <i className="bi bi-person-fill"></i> User Profile
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink to="/signin">
                <button className="btn btn primary btn-sm  btn-outline-light">
                <i className="bi bi-box-arrow-in-right"></i>  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
