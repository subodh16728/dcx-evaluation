import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../Service/productApiService";
import Nav from "./navbar";

export default function ProductDetails() {
  const [data, setData] = useState({});
  const { id } = useParams();

  const populateProductById = async () => {
    try {
      let receivedProduct = await getProductById(id);
      setData(receivedProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (token) {
      populateProductById();
    }
  }, []);

  return (
    <>
      <Nav />
      <div
       className="row"
       style={{
         minHeight: "100vh",
         backgroundImage: 'url("/images/product1.jpg")',
         backgroundSize: "cover",
         backgroundRepeat: "no-repeat",
         backgroundAttachment: "fixed",
         display: "flex",
         flexDirection: "column",
       }}
       >
        <div className="product-container w-50 mx-auto mt-5">
          <div className="shadow p-3 mb-5 bg-body-tertiary rounded my-auto">
            {data && (
              <div className="product d-flex">
                <div style={{ marginLeft: "20px" }}>
                  <div>
                    <h2 style={{ textAlign: "center" }}>{data.productName}</h2>
                  </div>
                  <img
                    src={`/images/${data.productImageUrl}`}
                    alt={data.productName}
                    width={150}
                    height={200}
                  />
                  <h5 style={{ textAlign: "center" }}>
                    Price: ${data.productPrice}
                  </h5>
                </div>
                <div style={{ marginLeft: "20px", marginTop: "50px" }}>
                  <p className="descriptions">
                    <small>{data.productDiscription}</small>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
