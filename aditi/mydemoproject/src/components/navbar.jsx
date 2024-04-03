import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Nav() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.clear();
    toast.success("You have been logged out.", { autoClose: 1000 });
    navigate("/");
  };

  const data = useSelector((state) => state.api.data);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <b className="navbar-brand ms-2">
          <i className="bi bi-shop-window"></i>
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
                to="/"
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
          <div className="navbar-text me-3">
            {token && data && data.username ? (
              <>
                <NavLink className="nav-link">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </NavLink>
                <b><span className="text-white">Welcome {data.username}!</span></b>
              </>
            ) : (
              <b><span className="text-white">Welcome Guest!</span></b>
            )}
          </div>
          <div>
            {token ? (
              <button
                className="btn btn primary btn-sm  btn-outline-light"
                onClick={handleLogOut}
              >
                Logout
              </button>
            ) : (
              <NavLink to="/signin">
                <button className="btn btn primary btn-sm  btn-outline-light">
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
