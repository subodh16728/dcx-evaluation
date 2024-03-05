
import { jwtDecode } from "jwt-decode";
import Nav from "./navbar";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  let emailreceived = "Guest";

  if (token) {
    const decodedToken = jwtDecode(token);
    emailreceived = decodedToken.email;
    
  }

  return (
    <>
      <Nav />
      <div
        className="row"
        style={{
          minHeight: "100vh",
          backgroundImage: 'url("images/home1.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 className="mt-50 ms-5">Welcome {emailreceived} !!</h1>
      </div>
      
      
    </>
  );
};

export default Dashboard;
