"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = require("jwt-decode");
const navbar_1 = __importDefault(require("./navbar"));
const Dashboard = () => {
    const token = localStorage.getItem("token");
    let emailreceived = "Guest";
    if (token) {
        const decodedToken = (0, jwt_decode_1.jwtDecode)(token);
        emailreceived = decodedToken.email;
    }
    return (<>
      <navbar_1.default />
      <div className="row" style={{
            minHeight: "100vh",
            backgroundImage: 'url("images/home1.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            display: "flex",
            flexDirection: "column",
        }}>
        <h1 className="mt-50 ms-5">Welcome {emailreceived} !!</h1>
      </div>
      
      
    </>);
};
exports.default = Dashboard;
