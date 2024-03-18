import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"; 


export default function Nav() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/signin");
  };

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
              <a className="nav-link active" aria-current="page" href="/">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/product"
              >
                Products
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/product/add"
              >
                Add Product
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/product/offer"
              >
                Offers
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/product/wishlist"
              >
                Wishlist
              </a>
            </li>
          </ul>
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
