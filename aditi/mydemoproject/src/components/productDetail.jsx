import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../Service/productApiService";
import { toast } from "react-toastify";
import "../css/productdetail.css";

export default function ProductDetails() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    features: [],
  });
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
      toast.success("Please login first.", { autoClose: 1000 });
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
        <div className="productdetailmain">
          <div className="productdetailformContainer">
            <div className=" p-2">
              <p className="h4 text-white bg-secondary p-2 text-center">
                Product Description
              </p>
              {data && (
                <div>
                  <div className="border border-secondary p-3">
                    <h3>{data.name}</h3>
                    <hr />
                    <div
                      className="mb-2"
                      style={{
                        textAlign: "right",
                        justifyContent: "space-between",
                        display: "flex",
                        textDecorationColor: "grey",
                      }}
                    >
                      <small className="ms-3">
                        <b>Category : </b> {data.category}
                      </small>
                      <small className="me-5">
                        <b>Price : </b> <i class="bi bi-currency-rupee"></i>
                        {data.price}
                      </small>
                    </div>
                    <hr />
                    <p className="descriptions">
                      <b> Product description:</b>
                      <br />
                      <small>{data.description}</small>
                    </p>
                    <p className="descriptions mb-2">
                      <b> Product Features:</b>
                    </p>
                    <div className="container text-container mb-2">
                      <div class="container text-center">
                        <div class="row row-cols-3">
                          {data.features.map((dataItem, index) => (
                            <p key={index} className="title ms-5 mb-1">
                              <strong>{dataItem.title}</strong>:{" "}
                              {dataItem.value}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </>
  );
}
