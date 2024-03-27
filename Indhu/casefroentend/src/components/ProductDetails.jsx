import { useEffect, useState } from "react";
import { useParams, useNavigate ,NavLink} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


export default function ProductDetails() {
  const [data, setData] = useState({});
  const { id } = useParams();

  const populateProductById = async () => {
    try {
      let receivedProduct = await axios.get(`http://localhost:3000/api/table/${id}`);
      setData(receivedProduct.data);
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

  const getImageUrl = (productName) => {
    if (productName === "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin") {
      return "https://images-cdn.ubuy.co.in/633ab9d36deffd67735b38eb-acer-sb220q-bi-21-5-inches-full-hd-1920.jpg";
    } else if (productName === "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats") {
      return "https://www.rei.com/media/2f6beb3d-18af-4c12-b7be-0cc91205f1c1.jpg";
    } else if(productName==="Beat London by Pepe Jeans"){
        return "https://rukminim2.flixcart.com/image/832/832/xif0q/jean/u/g/o/32-bm200520q05-beat-london-by-pepe-jeans-original-imagtdzxjnmhrngb.jpeg?q=70&crop=false"
    }
    else {
      // Add a default fallback image URL here
      return ""; // Provide the URL of a default image if needed
    }
  };
  

  return (
    <div className="row">
      <div className="product-container w-50 mx-auto mt-5">
        <div className="border border-dark shadow p-3 mb-5 bg-body-tertiary rounded my-auto">
          <div className="p-3">
            {data && (
              <div className="product d-flex">
                <div>
                  <h2 style={{ textAlign: "center" }}>{data.name}</h2>
                  
                  <p className="descriptions">
                    <strong>Description:</strong> {data.description}
                  </p>
                  <p className="descriptions">
                    <strong>Category:</strong> {data.category}
                  </p>
                  {data.features && data.features.length > 0 && (
                    <div className="descriptions">
                      <strong>Features:</strong>
                      <ul>
                        {data.features.map((feature, index) => (
                          <li key={index}>
                            <strong>{feature.title}:</strong> {feature.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                   <div className="col text-start">
                            <button onClick={() => navigate("/home")}type="submit" className="btn btn-success rounded-0">Back</button>
                        </div>
                        <div className="col text-end">
                        <NavLink to={`/update/${data._id}`}><button type="submit" className="btn btn-success rounded-0">Update</button></NavLink>
                        </div>

                </div>
                
                <div>
                  <img
                    src={getImageUrl(data.name)}
                    alt="Product Image"
                    width={150}
                    height={200}
                    style={{
                      border: "1px solid #101010",
                      borderRadius: "5px",
                    }}
                  /><br/><br/>
                  <h5 style={{ textAlign: "center" }}>Price: ${data.price}</h5>
                  
                </div>
                
              </div>
              
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
