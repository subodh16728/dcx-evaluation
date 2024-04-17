"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
require("../css/navbar.css");
const hooks_1 = require("../store/slice/hooks");
function Nav() {
    const navigate = (0, react_router_dom_2.useNavigate)();
    let token = localStorage.getItem("token");
    const handleLogOut = () => {
        localStorage.clear();
        react_toastify_1.toast.success("You have been logged out.", { autoClose: 1000 });
        navigate("/product");
    };
    const data = (0, hooks_1.useAppSelector)((state) => state.api.data);
    return (<>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <b className="navbar-brand ms-2">
            <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/">
              <i className="bi bi-shop-window"></i>
            </react_router_dom_1.NavLink>
          </b>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/product">
                  Products
                </react_router_dom_1.NavLink>
              </li>
              <li className="nav-item">
                <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/product/add">
                  Add Product
                </react_router_dom_1.NavLink>
              </li>
              <li className="nav-item">
                <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/product/offer">
                  Offers
                </react_router_dom_1.NavLink>
              </li>
              <li className="nav-item">
                <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/product/wishlist">
                  Wishlist
                </react_router_dom_1.NavLink>
              </li>
            </ul>
            {token && data && data.username ? (<div className="dropdown">
                <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
              </div>) : (<react_router_dom_1.NavLink to="/signin">
                <button className="btn btn primary btn-sm  btn-outline-light">
                <i className="bi bi-box-arrow-in-right"></i>  Login
                </button>
              </react_router_dom_1.NavLink>)}
          </div>
        </div>
      </nav>
    </>);
}
exports.default = Nav;
